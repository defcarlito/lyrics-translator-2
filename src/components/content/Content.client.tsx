"use client"

import { Selection } from "@/types/userChoice"
import { useState } from "react"
import SongSearchBox from "./SongSearchBox/SongSearchBox"
import LyricsVocabBox from "./LyricsVocabBox/LyricsVocabBox"

export default function Content() {
  const [userSelection, setUserSelection] = useState<Selection>({
    song: undefined,
    hasSelected: false,
  })

  return (
    <>
      <div className="sticky top-8 z-50">
        <SongSearchBox
          userSelection={userSelection}
          setUserSelection={setUserSelection}
        />
      </div>
      <div>
        {userSelection.hasSelected && (
          <LyricsVocabBox userSelection={userSelection} />
        )}
      </div>
    </>
  )
}
