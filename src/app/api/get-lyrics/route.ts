import { Lyrics } from "@/types/lyrics"
import { Song } from "@/types/song"
import Genius from "genius-lyrics"
import { NextRequest, NextResponse } from "next/server"

const Client = new Genius.Client(process.env.GENIUS_ACCESS_TOKEN)

const REMOVE_CHORUS = true

export async function POST(request: NextRequest) {
  const body = await request.json()
  const song: Song = body.song

  const searches = await Client.songs.search(`${song.title} by ${song.artist}`)
  const topSearchLyrics: string = await searches[0].lyrics(REMOVE_CHORUS)

  const lyricsByLine = topSearchLyrics.split("\n")
  const formatLines = () => {
    lyricsByLine.shift() // Remove contributors line
    while (lyricsByLine[0] == "") {
      // Remove empty lines in the start
      lyricsByLine.shift()
    }
  }
  formatLines()

  const lyricsByWord = lyricsByLine.flatMap((sentence) =>
    sentence.split(" ").filter((word) => word !== "")
  )

  console.log(topSearchLyrics)
  console.log("---")
  console.log(lyricsByLine)
  console.log("---")
  console.log(lyricsByWord)

  return NextResponse.json({
    byLine: lyricsByLine,
    byWord: lyricsByWord,
  })
}
