export type Word = {
  word: string
  meanings: Meaning[]
  language: Language
}

export type Meaning = {
  translation: string
  pos: POS
  gender: "male" | "female" | "both" | null
  infinitive: string | null
  slang: boolean
}

type POS =
  | "noun"
  | "verb"
  | "article"
  | "adjective"
  | "pronoun"
  | "adverb"
  | "conjuction"
  | "preposition"
  | "interjection"
  | "contraction"
  | "numeral"
  | "proper noun"

export type Language = "portuguese" | "english" | "other"
