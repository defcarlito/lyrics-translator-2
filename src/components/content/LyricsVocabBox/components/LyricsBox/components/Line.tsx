import { Setter } from "@/types/setter";

export default function Line({
  line,
  clickedWords,
  setClickedWords,
}: {
  line: string
  clickedWords: Map<string, Word>
  setClickedWords: Setter<Map<string, Word>>
}) {
  const words = line.split(" ")

  return (
    <span className="flex gap-x-0 flex-wrap">
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
  clickedWords: Map<string, Word>
  setClickedWords: Setter<Map<string, Word>>
}) => {
  const cleanedWord = toLowerAndStripPunctuation(word)
  const w: Word = {
    word: cleanedWord,
    meanings: [],
    language: "other",
    selectedMeaningIndex: 0,
  }

  return (
    <span
      role="button"
      onClick={() =>
        setClickedWords((prev) => {
          const next = new Map(prev)
          next.set(w.word, w)
          return next
        })
      }
      className={cn(
        "hover:bg-black hover:text-white p-[3] rounded-sm cursor-pointer",
        clickedWords.has(cleanedWord) && "bg-green-300/50",
      )}
    >
      {word}
    </span>
  )
}

function toLowerAndStripPunctuation(str: string) {
  return str.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "").toLowerCase()
}
