import { cn } from "@/lib/utils"
import { Setter } from "@/types/setter"
import { Song } from "@/types/song"
import { useState } from "react"
import Results from "./components/Results"
import Search from "./components/Search"

export default function SongSearchBox({
  setSelectedSong,
}: {
  setSelectedSong: Setter<Song | undefined>
}) {
  const [songInfo, setSongInfo] = useState<Song[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div className="space-y-2">
      <div>
        <Search
          setSongInfo={setSongInfo}
          setLoading={setLoading}
          setSelectedSong={setSelectedSong}
        />
      </div>
      <div className={cn("", songInfo.length === 0 && !loading && "invisible")}>
        <Results
          songInfo={songInfo}
          loading={loading}
          setSelectedSong={setSelectedSong}
        />
      </div>
    </div>
  )
}
