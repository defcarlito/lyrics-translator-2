import { Word } from "@/types/word"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"


export default function WordCard({ word }: { word: string }) {
  const [metadata, setMetadata] = useState<Word | undefined>(undefined)
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["wordTranslation", word],
    queryFn: () => fetchWordTranslation(word),
    staleTime: 1000 * 60 * 5,
  })
  
  useEffect(() => {
    if (data?.data) setMetadata(data.data)
    }, [data])
  
  return (
    <div className="bg-card p-4 border rounded-sm">
      <h1>{toLowerAndStripPunctuation(word)}</h1>
      <p>{isLoading ? "Loading..." : metadata?.meanings.at(0)?.translation}</p>
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