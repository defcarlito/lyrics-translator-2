import { Selection } from "@/types/userChoice"
import LyricsBox from "./components/LyricsBox/LyricsBox"
import VocabWordsBox from "./components/VocabWordsBox/VocabWordsBox"

export default function LyricsVocabBox({
  userSelection,
}: {
  userSelection: Selection
}) {
  return (
    <div className="flex gap-2 h-fit">
      <LyricsBox userSelection={userSelection} />
      <VocabWordsBox />
    </div>
  )
}
