import { Selection } from "@/types/userChoice";
import { useState } from "react";
import LyricsBox from "./components/LyricsBox/LyricsBox";
import VocabWordsBox from "./components/VocabWordsBox/VocabWordsBox";
import Export from "./components/Export";
import { Word } from "@/types/word";

export default function LyricsVocabBox({
  userSelection,
}: {
  userSelection: Selection
}) {
  const [clickedWords, setClickedWords] = useState<Set<string>>(new Set([]));
  const [wordsMetadata, setWordsMetadata] = useState<Set<Word>>(new Set([]));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 h-fit lg:flex-row">
        <LyricsBox
          userSelection={userSelection}
          clickedWords={clickedWords}
          setClickedWords={setClickedWords}
        />
        <VocabWordsBox
          clickedWords={clickedWords}
          setClickedWords={setClickedWords}
        />
      </div>
      <div>
        <Export clickedWords={clickedWords} />
      </div>
    </div>
  )
}
