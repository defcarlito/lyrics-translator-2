import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { zodTextFormat } from "openai/helpers/zod.mjs"
import { z } from "zod"

import { db } from "@/app/firebase/config"
import { Language, Meaning, Word } from "@/types/word"
import { doc, setDoc } from "firebase/firestore"

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
  const untranslatedWord = body.word

  // TODO: create a conditional that:
  //  1. checks the cache (firebase db) for the translation
  //
  //  2.
  //  if it's present in the cache:
  //    returns the cached translation
  //  if it's not in the cache:
  //    creates the translation and writes it to the cache

  const wordObj: Word = await createTranslation(untranslatedWord)
  await writeToTranslationCache(wordObj)

  return NextResponse.json({
    data: wordObj,
  })
}

async function createTranslation(untranslatedWord: string): Promise<Word> {
  const word = toLowerAndStripPunctuation(untranslatedWord)

  const wordMetaData = z.object({
    word: z.literal(word),
    meanings: z
      .array(
        z
          .object({
            translation: z
              .string()
              .describe(
                "A succinct, short, natural English translation of the word with no unnecessary punctuation."
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
                "Indicates whether this meaning is considered slang in everyday usage."
              ),
          })
          .nullable()
          .describe(
            "Set to null only if the word is not a valid Brazilian Portuguese word."
          )
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
        Extract only the most clearly distinct and commonly used meanings for the word ${word} and 
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

  // the model's unformatted response
  const event = response.output_parsed

  const eventFormatted = {
    word: event?.word,
    meanings: event?.meanings.map((meaning) => ({
      ...meaning,
      infinitive: meaning?.infinitive
        ? toLowerAndStripPunctuation(meaning.infinitive)
        : null,
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

  const lang: Language = eventFormatted["language"] ?? "other"

  const metadata: Word = {
    word: word,
    meanings: meanings,
    language: lang,
  }

  return metadata
}

function isInTranslationCache(untranslatedWord: string): boolean {
  return false
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
