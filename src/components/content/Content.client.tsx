"use client"

import { Song } from "@/types/song"
import { useState } from "react"
import SongSearchBox from "./SongSearchBox/SongSearchBox"
import LyricsBox from "./LyricsBox/LyricsBox"

export default function Content() {

  const [selectedSong, setSelectedSong] = useState<Song | undefined>()

  return (
    <>
      <SongSearchBox setSelectedSong={setSelectedSong}/>
      <LyricsBox selectedSong={selectedSong} />
    </>
  )
}