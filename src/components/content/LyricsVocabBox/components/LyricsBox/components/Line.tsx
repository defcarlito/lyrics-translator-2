import { Setter } from "@/types/setter"

export default function Line({
  line,
  clickedWords,
  setClickedWords,
}: {
  line: string
  clickedWords: Set<string>
  setClickedWords: Setter<Set<string>>
}) {
  const words = line.split(" ")

  return (
    <span className="flex gap-x-1 flex-wrap">
      {words.map((word, index) => (
        <span key={index}>
          <Word
            word={word}
            clickedWords={clickedWords}
            setClickedWords={setClickedWords}
          />
        </span>
      ))}
    </span>
  )
}

const Word = ({
  word,
  clickedWords,
  setClickedWords,
}: {
  word: string
  clickedWords: Set<string>
  setClickedWords: Setter<Set<string>>
}) => {
  return (
    <span
      role="button"
      onClick={() => setClickedWords(prev => new Set(prev.add(word)))}
    >
      {word}
    </span>
  )
}
