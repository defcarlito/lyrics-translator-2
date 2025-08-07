"use client"

import { useState } from "react"
import Results from "./search/Results"
import Search from "./search/Search"
import { Song } from "@/types/song"

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
