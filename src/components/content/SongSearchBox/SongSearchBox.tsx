import { cn } from "@/lib/utils"
import { Setter } from "@/types/setter"
import { Song } from "@/types/song"
import { Selection } from "@/types/userChoice"
import { useEffect, useState } from "react"
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
  const [userInput, setUserInput] = useState<string>("")

  const isSearchEmpty = () => userInput.length === 0

  return (
    <div className="space-y-2">
      <div>
        <Search
          setSongInfo={setSongInfo}
          setLoading={setLoading}
          setUserSelection={setUserSelection}
          userInput={userInput}
          setUserInput={setUserInput}
        />
      </div>
      <div
        className={cn(
          isSearchEmpty() || userSelection.hasSelected ? "fade-out" : "fade-in"
        )}
      >
        <Results
          songInfo={songInfo}
          loading={loading}
          setUserSelection={setUserSelection}
        />
      </div>
    </div>
  )
}
