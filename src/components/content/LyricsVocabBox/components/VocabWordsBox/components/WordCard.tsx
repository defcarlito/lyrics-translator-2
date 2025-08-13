import { useEffect } from "react"

export default function WordCard({ word }: { word: string }) {
  useEffect(() => {
    fetch("/api/translate-word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: word }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }, [])

  return (
    <div className="bg-card p-4 border rounded-sm">
      <h1>{word}</h1>
      <p>description</p>
    </div>
  )
}
