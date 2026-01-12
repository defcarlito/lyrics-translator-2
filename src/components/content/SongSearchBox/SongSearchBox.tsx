import { cn } from "@/lib/utils"
import { Setter } from "@/types/setter"
import { Song } from "@/types/song"
import { Selection } from "@/types/userChoice"
import { useState } from "react"
import Results from "./components/Results"
import SearchBox from "./components/Search"

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
    <div className="space-y-2 relative">
      <div className="w-xs lg:w-md">
        <SearchBox
          setSongInfo={setSongInfo}
          setLoading={setLoading}
          setUserSelection={setUserSelection}
          userInput={userInput}
          setUserInput={setUserInput}
        />
      </div>
      <div
        className={cn(
          "transition-[opacity, max-height] duration-400 overflow-hidden ease-in-out absolute",
          isSearchEmpty() || userSelection.hasSelected
            ? "opacity-0 pointer-events-none max-h-0"
            : "opacity-100 max-h-128",
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
