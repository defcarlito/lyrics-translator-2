"use client"

import { Song } from "@/types/song"
import { useState } from "react"
import LyricsBox from "./LyricsBox/LyricsBox"
import SongSearchBox from "./SongSearchBox/SongSearchBox"

export default function Content() {
  const [selectedSong, setSelectedSong] = useState<Song | undefined>()

  return (
    <>
      <div className="absolute top-8">
        <SongSearchBox setSelectedSong={setSelectedSong} />
      </div>
      <div>
        <LyricsBox selectedSong={selectedSong} />
      </div>
    </>
  )
}
