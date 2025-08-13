import { Setter } from "@/types/setter"
import WordCard from "./components/WordCard"

export default function VocabWordsBox({
  clickedWords,
  setClickedWords,
}: {
  clickedWords: Set<string>
  setClickedWords: Setter<Set<string>>
}) {
  return (
    <div className="bg-card border p-4 rounded-md w-md grid grid-cols-3 gap-4 content-start">
      {[...clickedWords].map((word, index) => (
        <WordCard word={word} key={index} />
      ))}
    </div>
  )
}
