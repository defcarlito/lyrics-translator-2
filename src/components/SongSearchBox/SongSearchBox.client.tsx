"use client"

import { Song } from "@/types/song"
import { useState } from "react"
import Results from "./components/Results"
import Search from "./components/Search.client"

export default function SongSearchBox() {
  const [songInfo, setSongInfo] = useState<Song[]>([])

  return (
    <div className="space-y-2">
      <div>
        <Search setSongInfo={setSongInfo} />
      </div>
      <div className="items-start border border-black">
        <Results songInfo={songInfo} />
      </div>
    </div>
  )
}
