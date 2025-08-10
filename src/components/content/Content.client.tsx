"use client"

import { Selection } from "@/types/userChoice"
import { useState } from "react"
import LyricsBox from "./LyricsBox/LyricsBox"
import SongSearchBox from "./SongSearchBox/SongSearchBox"

export default function Content() {
  const [userSelection, setUserSelection] = useState<Selection>({
    song: undefined,
    hasSelected: false,
  })

  return (
    <>
      <div className="absolute top-8">
        <SongSearchBox
          userSelection={userSelection}
          setUserSelection={setUserSelection}
        />
      </div>
      {userSelection.hasSelected && (
        <div className="space-y-2">
          <div className="bg-card border p-4 rounded-md flex items-center gap-2">
            <div>
              <img src={userSelection.song?.albumCover} className="size-16 rounded-md" />
            </div>
            <div>
              <p className="font-bold">{userSelection.song?.title}</p>
              <p>by {userSelection.song?.artist}</p>
            </div>
          </div>
          <LyricsBox userSelection={userSelection} />
        </div>
      )}
    </>
  )
}
