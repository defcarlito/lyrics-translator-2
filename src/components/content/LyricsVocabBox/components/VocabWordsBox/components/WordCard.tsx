import { useQuery } from "@tanstack/react-query"

async function fetchWordTranslation(word: string) {
  const result = await fetch("/api/translate-word", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word: word }),
  })

  if (!result.ok) throw new Error("Failed to translate.")

  return result.json()
}

export default function WordCard({ word }: { word: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wordTranslation", word],
    queryFn: () => fetchWordTranslation(word),
    staleTime: 1000 * 60 * 5,
  })

  return (
    <div className="bg-card p-4 border rounded-sm">
      <h1>{word}</h1>
      <p>description</p>
    </div>
  )
}
