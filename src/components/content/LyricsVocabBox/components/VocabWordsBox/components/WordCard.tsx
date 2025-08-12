export default function WordCard({ word }: { word: string }) {
  return (
    <div className="bg-card p-4 border rounded-sm">
      <h1>{word}</h1>
      <p>description</p>
    </div>
  )
}