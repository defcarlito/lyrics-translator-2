"use client"

import { Song } from "@/types/song"
import { useState } from "react"
import Results from "./Results"
import Search from "./Search"

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
