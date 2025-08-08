"use client"

import { Song } from "@/types/song"
import { useState } from "react"
import Results from "./components/Results"
import Search from "./components/Search.client"
import { Setter } from "@/types/setter"

export default function SongSearchBox({ setSelectedSong }: { setSelectedSong: Setter<Song | undefined> }) {
  const [songInfo, setSongInfo] = useState<Song[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div className="space-y-2">
      <div>
        <Search setSongInfo={setSongInfo} setLoading={setLoading} />
      </div>
      <div>
        <Results songInfo={songInfo} loading={loading} setSelectedSong={setSelectedSong} />
      </div>
    </div>
  )
}
