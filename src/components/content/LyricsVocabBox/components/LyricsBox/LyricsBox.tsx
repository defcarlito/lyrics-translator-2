import { Lyrics } from "@/types/lyrics"
import { Setter } from "@/types/setter"
import { Selection } from "@/types/userChoice"
import { useEffect, useState } from "react"
import Line from "./components/Line"
import { Word } from "@/types/word"

export default function LyricsBox({
  userSelection,
  clickedWords,
  setClickedWords,
}: {
  userSelection: Selection
  clickedWords: Map<string, Word>
  setClickedWords: Setter<Map<string, Word>>
}) {
  const lyrics: Lyrics = useGetSongLyrics(userSelection)
  const lyricsByLine = lyrics.byLine

  return (
    <div className="bg-card border rounded-md p-4 w-sm md:w-md space-y-4 overflow-scroll h-[50vh] lg:h-[75vh]">
      <div className="bg-card border p-4 rounded-sm flex gap-4">
        <img
          src={userSelection.song?.albumCover}
          className="size-16 rounded-sm"
          alt="album cover"
        />
        <div className="flex flex-col items-start justify-center">
          <h1 className="font-bold">{userSelection.song?.title}</h1>
          <p>by {userSelection.song?.artist}</p>
        </div>
      </div>
      <div>
        {!userSelection.hasSelected ? (
          <p>Pick a song</p>
        ) : (
          <div className="space-y-0">
            {lyricsByLine.map((line, index) => (
              <div key={index}>
                <Line
                  line={line}
                  clickedWords={clickedWords}
                  setClickedWords={setClickedWords}
                />{" "}
                <br />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function useGetSongLyrics(userSelection: Selection) {
  const [lyricsData, setLyricsData] = useState<Lyrics>({
    byLine: [],
    byWord: [],
  })
  useEffect(() => {
    async function fetchLyrics() {
      if (!userSelection.hasSelected) return

      const res = await fetch("/api/get-lyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ song: userSelection.song }),
      })

      const data = await res.json()
      setLyricsData(data)
    }
    fetchLyrics()
  }, [userSelection])
  return lyricsData
}
