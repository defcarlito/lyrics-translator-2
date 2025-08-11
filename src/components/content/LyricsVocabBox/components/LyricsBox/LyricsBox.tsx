import { Lyrics } from "@/types/lyrics"
import { Selection } from "@/types/userChoice"
import { useEffect, useState } from "react"

export default function LyricsBox({
  userSelection,
}: {
  userSelection: Selection
}) {
  const lyrics: Lyrics = useGetSongLyrics(userSelection)
  const lyricsByLine = lyrics.byLine

  return (
    <div className="bg-card border rounded-md p-4 gap-2 w-md">
      <h1 className="text-4xl">Lyrics</h1>
      <div>
        {!userSelection.hasSelected ? (
          <p>Pick a song</p>
        ) : (
          <>
            {lyricsByLine.map((line, index) => (
              <span key={index}>
                {line} <br />
              </span>
            ))}
          </>
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
