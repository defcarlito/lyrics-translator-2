import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { zodTextFormat } from "openai/helpers/zod.mjs"
import { z } from "zod"

// import { db } from "@/app/firebase/config";
import { Language, Meaning, Word } from "@/types/word"
import { doc, getDoc, setDoc } from "firebase/firestore"

const PARTS_OF_SPEECH = [
  "noun",
  "verb",
  "article",
  "adjective",
  "pronoun",
  "adverb",
  "conjuction",
  "preposition",
  "interjection",
  "contraction",
  "numeral",
  "proper noun",
] as const

const LANGUAGES = ["portuguese", "english", "other"] as const

const WORD_GENDERS = ["male", "female", "both"] as const

export async function POST(request: NextRequest) {
  const body = await request.json()
  const untranslatedWord = toLowerAndStripPunctuation(body.word)

  console.log("Unstripped word: " + body.word)
  console.log("Stripped word: " + untranslatedWord)
  console.log("Checking cache...")

  let wordObj: Word | null = await getTranslationFromCache(untranslatedWord)

  if (!wordObj) {
    console.log("not in cache, making translation and writing...")
    wordObj = await createTranslation(untranslatedWord)
    await writeToTranslationCache(wordObj)
    console.log("wrote to cache")
  } else {
    console.log("found in cache")
  }

  return NextResponse.json({
    data: wordObj,
  })
}

async function createTranslation(untranslatedWord: string): Promise<Word> {
  const wordMetaData = z.object({
    word: z.literal(untranslatedWord),
    meanings: z
      .array(
        z
          .object({
            translation: z
              .string()
              .describe(
                "A succinct, short, natural English translation of the word with no unnecessary punctuation.",
              ),
            pos: z
              .enum(PARTS_OF_SPEECH)
              .describe("The meaning's part of speech."),
            gender: z.enum(WORD_GENDERS).optional().nullable(),
            infinitive: z
              .string()
              .optional()
              .nullable()
              .describe("The infinitive form if the word is a verb."),
            slang: z
              .boolean()
              .describe(
                "Indicates whether this meaning is considered slang in everyday usage.",
              ),
          })
          .nullable()
          .describe(
            "Set to null only if the word is not a valid Brazilian Portuguese word.",
          ),
      )
      .max(2, "A limit of 2 distinct words."),
    language: z.enum(LANGUAGES).describe("Which language the word belongs to."),
  })

  const client = new OpenAI()

  const response = await client.responses.parse({
    model: "gpt-5-mini",
    input: [
      {
        role: "system",
        content: "You are a Brazilian Portuguese linguist teaching Portuguese.",
      },
      {
        role: "user",
        content: `
        Extract only the most clearly distinct and commonly used meanings for the word ${untranslatedWord} and 
        metadata in the given structure. The word may or may not have multiple meanings across 
        different parts of speech - Do not confuse words with different spellings or accents as variants 
        of the same word. Avoid any explanatory text in parentheses (i.e. "(auxiliary)", "(colloquial)", etc). 
        `,
      },
    ],
    text: {
      format: zodTextFormat(wordMetaData, "word_metadata"),
    },
  })

  // the model's response
  const event = response.output_parsed

  // temp fix to make model output consistent
  const eventFormatted = {
    word: event?.word,
    meanings: event?.meanings.map((meaning) => ({
      ...meaning,
      infinitive: meaning?.infinitive ? meaning.infinitive : null,
    })),
    language: event?.language,
  }

  console.log(eventFormatted)
  console.log(response.usage)

  const meanings: Meaning[] = eventFormatted.meanings!.map((meaning) => ({
    translation: meaning.translation!,
    pos: meaning.pos!,
    gender: meaning.gender!,
    infinitive: meaning.infinitive!,
    slang: meaning.slang!,
  }))

  const lang: Language = eventFormatted["language"]!

  const metadata: Word = {
    word: untranslatedWord,
    meanings: meanings,
    language: lang,
  }

  return metadata
}

async function getTranslationFromCache(
  untranslatedWord: string,
): Promise<Word | null> {
  for (const lang of LANGUAGES) {
    const docRef = doc(db, lang, untranslatedWord)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      const wordData: Word = {
        word: untranslatedWord,
        meanings: data.meanings,
        language: lang,
      }
      return wordData
    }
  }

  return null
}

async function writeToTranslationCache(obj: any) {
  const word = obj.word
  const meanings = obj.meanings
  const language = obj.language

  await setDoc(doc(db, language, word), {
    meanings,
  })
}

function toLowerAndStripPunctuation(str: string) {
  return str.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "").toLowerCase()
}
