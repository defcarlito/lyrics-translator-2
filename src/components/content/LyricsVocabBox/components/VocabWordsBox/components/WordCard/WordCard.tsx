import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Setter } from "@/types/setter"
import { Word } from "@/types/word"
import { useQuery } from "@tanstack/react-query"
import { Mars, Venus, X } from "lucide-react"
import { useEffect, useState } from "react"
import MetadataSkeleton from "./components/MetadataSkeleton"
import { SquareArrowOutUpRight } from "lucide-react"
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export default function WordCard({
  word,
  clickedWords,
  setClickedWords,
}: {
  word: string
  clickedWords: Map<string, Word>
  setClickedWords: Setter<Map<string, Word>>
}) {
  const [metadata, setMetadata] = useState<Word | undefined>(undefined)

  const cleanedWord = toLowerAndStripPunctuation(word)

  const { data, isLoading } = useQuery({
    queryKey: ["wordTranslation", word],
    queryFn: () => fetchWordTranslation(word),
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (data?.data) {
      setMetadata(data.data)
      console.log("Word:", data.data)
      setClickedWords((prev) => {
        const existing = prev.get(cleanedWord)
        const next = new Map(prev)
        next.set(cleanedWord, {
          ...data?.data,
          selectedMeaningIndex: existing?.selectedMeaningIndex ?? 0,
        })
        return next
      })
    }
  }, [data, setClickedWords, cleanedWord])

  function removeWord() {
    setClickedWords((prev) => {
      const next = new Map(prev)
      next.delete(cleanedWord)
      return next
    })
  }

  const gender = metadata?.meanings.at(metadata.selectedMeaningIndex)?.gender

  let genderBadge = null
  if (gender === "male") {
    genderBadge = (
      <Badge className="bg-blue-200 text-black">
        <Mars />
      </Badge>
    )
  } else if (gender === "female") {
    genderBadge = (
      <Badge className="bg-pink-200 text-black">
        <Venus />
      </Badge>
    )
  } else if (gender) {
    genderBadge = (
      <Badge className="bg-purple-200 text-black">
        <Mars /> & <Venus />
      </Badge>
    )
  }

  let slangBadge = null
  if (metadata?.meanings.at(metadata.selectedMeaningIndex)?.slang) {
    slangBadge = <Badge className="bg-orange-200 text-black">Slang</Badge>
  }

  function updateSelectedMeaning(index: number) {
    setClickedWords((prev) => {
      const next = new Map(prev)
      const existing = next.get(cleanedWord)

      if (!existing) return prev

      next.set(cleanedWord, {
        ...existing,
        selectedMeaningIndex: index,
      })

      return next
    })

    setMetadata((prev) =>
      prev ? { ...prev, selectedMeaningIndex: index } : prev,
    )
  }

  return isLoading ? (
    <MetadataSkeleton word={cleanedWord} />
  ) : (
    <div className="flex flex-col bg-card p-2 border rounded-sm gap-2 items-center relative justify-between">
      <div className="w-full space-y-2">
        <Button
          className="absolute top-[-8] right-[-8] rounded-lg w-6 h-6 bg-red-200 hover:bg-red-500"
          size="icon"
          onClick={removeWord}
        >
          <X />
        </Button>
        <div className="border-b-1 w-full flex">
          <h1
            className={cn(
              metadata?.language !== "portuguese" && "text-red-500",
            )}
          >
            <i>{cleanedWord} </i>
          </h1>
          {metadata?.meanings.at(metadata.selectedMeaningIndex)?.pos ===
            "verb" && (
            <p className="flex gap-2 items-center">
              <> &nbsp; - </>
              <a
                href={`https://conjugator.reverso.net/conjugation-portuguese-verb-${metadata.meanings?.at(metadata.selectedMeaningIndex)?.infinitive}.html`}
                target="_blank"
                className="underline text-blue-600"
              >
                {
                  metadata.meanings.at(metadata.selectedMeaningIndex)
                    ?.infinitive
                }
              </a>{" "}
              <SquareArrowOutUpRight className="w-3 h-3" />
            </p>
          )}
        </div>
        <p className="text-center">
          {metadata?.language === "portuguese" ? (
            <>
              &quot;
              {
                metadata?.meanings.at(metadata.selectedMeaningIndex)
                  ?.translation
              }
              &quot;
            </>
          ) : (
            <>Not Portuguese!</>
          )}
        </p>
      </div>
      {metadata?.language === "portuguese" && (
        <div className="flex flex-wrap gap-1 justify-center">
          <Select
            value={metadata?.selectedMeaningIndex.toString()}
            onValueChange={(value) => updateSelectedMeaning(parseInt(value))}
          >
            <SelectTrigger className="border-none shadow-none bg-black pr-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {metadata?.meanings.map((value, index) => (
                  <SelectItem value={index.toString()} key={index}>
                    <Badge>
                      ({index + 1}) {value.pos}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {genderBadge}
          {slangBadge}
        </div>
      )}
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
