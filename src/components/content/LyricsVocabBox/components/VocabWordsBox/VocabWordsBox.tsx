import WordCard from "./components/WordCard"

export default function VocabWordsBox() {
  return (
    <div className="bg-card border p-4 rounded-md w-md grid grid-cols-3 gap-4 content-start">
      <WordCard />
      <WordCard />
      <WordCard />
      <WordCard />
      <WordCard />
      <WordCard />
      <WordCard />
      <WordCard />
    </div>
  )
}
