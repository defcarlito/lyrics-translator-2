"use client"

import { useState } from "react"
import LyricsBox from "./LyricsBox/LyricsBox"
import SongSearchBox from "./SongSearchBox/SongSearchBox"
import { Selection } from "@/types/userChoice"

export default function Content() {
  const [userSelection, setUserSelection] = useState<Selection>({
    song: undefined,
    hasSelected: false,
  })

  return (
    <>
      <div className="absolute top-8">
        <SongSearchBox userSelection={userSelection} setUserSelection={setUserSelection} />
      </div>
      <div>
        <LyricsBox userSelection={userSelection} />
      </div>
    </>
  )
}
