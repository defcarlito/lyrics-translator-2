import { cn } from "@/lib/utils"
import { Setter } from "@/types/setter"
import { Song } from "@/types/song"
import { Selection } from "@/types/userChoice"
import { useState } from "react"
import Results from "./components/Results"
import Search from "./components/Search"

export default function SongSearchBox({
  userSelection,
  setUserSelection,
}: {
  userSelection: Selection
  setUserSelection: Setter<Selection>
}) {
  const [songInfo, setSongInfo] = useState<Song[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const isSearchEmpty = () => songInfo.length === 0

  return (
    <div className="space-y-2">
      <div>
        <Search
          setSongInfo={setSongInfo}
          setLoading={setLoading}
          setUserSelection={setUserSelection} // to reset to undefined
        />
      </div>
      <div
        className={
          (cn(isSearchEmpty() && !loading && "invisible",
          userSelection.hasSelected === true && "invisible"))
        }
      >
        <Results
          songInfo={songInfo}
          loading={loading}
          setUserSelection={setUserSelection} // to set to selected song
        />
      </div>
    </div>
  )
}
