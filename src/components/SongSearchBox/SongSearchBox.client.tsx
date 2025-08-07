"use client"

import { Song } from "@/types/song"
import { useState } from "react"
import Results from "./components/Results"
import Search from "./components/Search.client"

export default function SongSearchBox() {
  const [songInfo, setSongInfo] = useState<Song[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div className="space-y-2">
      <div>
        <Search setSongInfo={setSongInfo} setLoading={setLoading} />
      </div>
      <div>
        <Results songInfo={songInfo} loading={loading} />
      </div>
    </div>
  )
}
