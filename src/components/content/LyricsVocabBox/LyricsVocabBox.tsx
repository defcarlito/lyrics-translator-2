import { Selection } from "@/types/userChoice"
import { useEffect, useState } from "react"
import LyricsBox from "./components/LyricsBox/LyricsBox"
import VocabWordsBox from "./components/VocabWordsBox/VocabWordsBox"

export default function LyricsVocabBox({
  userSelection,
}: {
  userSelection: Selection
}) {
  const [clickedWords, setClickedWords] = useState<Set<string>>(new Set([]))

  useEffect(() => {
    console.log(clickedWords)
  }, [clickedWords])

  return (
    <div className="flex gap-2 h-fit">
      <LyricsBox
        userSelection={userSelection}
        clickedWords={clickedWords}
        setClickedWords={setClickedWords}
      />
      <VocabWordsBox />
    </div>
  )
}
