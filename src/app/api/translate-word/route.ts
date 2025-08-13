import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { zodTextFormat } from "openai/helpers/zod.mjs"
import { z } from "zod"

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

const WORD_GENDERS = ["male", "female", "both"] as const

export async function POST(request: NextRequest) {
  const body = await request.json()
  const word = toLowerAndStripPunctuation(body.word)

  const wordMetaData = z.object({
    word: z.literal(word),
    translation: z
      .string()
      .describe("A succinct, short English translation of the word."),
    pos: z.enum(PARTS_OF_SPEECH).describe("The word's part of speech."),
    gender: z.enum(WORD_GENDERS).optional().nullable(),
    infitive: z
      .string()
      .optional()
      .nullable()
      .describe("The infinitive form if the word is a verb."),
  })

  const client = new OpenAI()
  const response = await client.responses.parse({
    model: "gpt-5-mini",
    input: [
      {
        role: "system",
        content: `You are a Brazilian Portuguese linguist teaching Portuguese. Extract metadata for the word ${word} in the given structure.`,
      },
    ],
    text: {
      format: zodTextFormat(wordMetaData, "word_metadata"),
    },
  })

  const event = response.output_parsed

  console.log(event)
  console.log(response.usage)

  return NextResponse.json({
    data: event,
  })
}

function toLowerAndStripPunctuation(str: string) {
  return str.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').toLowerCase()
}
