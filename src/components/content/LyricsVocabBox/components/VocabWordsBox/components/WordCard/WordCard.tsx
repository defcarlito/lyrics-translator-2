import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Word } from "@/types/word"
import { useQuery } from "@tanstack/react-query"
import { Mars, Venus, X } from "lucide-react"
import { useEffect, useState } from "react"
import MetadataSkeleton from "./components/MetadataSkeleton"
import { Setter } from "@/types/setter"

export default function WordCard({
  word,
  clickedWords,
  setClickedWords,
}: {
  word: string
  clickedWords: Set<string>
  setClickedWords: Setter<Set<string>>
}) {
  const [metadata, setMetadata] = useState<Word | undefined>(undefined)

  const { data, isLoading, error } = useQuery({
    queryKey: ["wordTranslation", word],
    queryFn: () => fetchWordTranslation(word),
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (data?.data) {
      setMetadata(data.data)
    }
  }, [data])

  function removeWord() {
    setClickedWords(prev => {
      const newClickedWords = new Set(prev)
      newClickedWords.delete(word)
      return newClickedWords
    })
  }

  const cleanedWord = toLowerAndStripPunctuation(word)
  const firstMeaning = metadata?.meanings.at(0)

  const gender = firstMeaning?.gender

  let genderBadge = null
  if (gender === "male") {
    genderBadge = (
      <Badge className="bg-blue-400">
        <Mars />
      </Badge>
    )
  } else if (gender === "female") {
    genderBadge = (
      <Badge className="bg-pink-400">
        <Venus />
      </Badge>
    )
  } else if (gender) {
    genderBadge = (
      <Badge className="bg-purple-400">
        <Mars /> & <Venus />
      </Badge>
    )
  }

  let slangBadge = null
  if (firstMeaning?.slang) {
    slangBadge = <Badge className="bg-orange-300">Slang</Badge>
  }

  return isLoading ? (
    <MetadataSkeleton word={cleanedWord} />
  ) : (
    <div className="flex flex-col bg-card p-4 border rounded-sm shadow-sm gap-1 items-center relative">
      <Button
        className="absolute top-[-8] right-[-8] rounded-full w-6 h-6 bg-red-500/80 hover:bg-red-500"
        size="icon"
        onClick={removeWord}
      >
        <X />
      </Button>
      <h1>{toLowerAndStripPunctuation(word)}</h1>
      <p className="text-center">{metadata?.meanings.at(0)?.translation}</p>
      <div className="flex gap-1">
        {genderBadge}
        {slangBadge}
      </div>
    </div>
  )
}

async function fetchWordTranslation(word: string) {
  const result = await fetch("/api/translate-word", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word: word }),
  })

  if (!result.ok) throw new Error("Failed to translate.")

  return result.json()
}

function toLowerAndStripPunctuation(str: string) {
  return str.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "").toLowerCase()
}
