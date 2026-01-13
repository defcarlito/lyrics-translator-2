export const runtime = "nodejs"

import { Song } from "@/types/song"
import { Client } from "genius-lyrics"
import { NextRequest, NextResponse } from "next/server"

const REMOVE_CHORUS = true

export async function POST(request: NextRequest) {
  const client = new Client(process.env.GENIUS_ACCESS_TOKEN)

  const body = await request.json()
  const song: Song = body.song

  const searches = await client.songs.search(`${song.title} by ${song.artist}`)
  const topSearchLyrics: string = await searches[0].lyrics(REMOVE_CHORUS)

  const lyricsByLine = topSearchLyrics.split("\n")
  lyricsByLine.shift() // Remove contributors line
  while (lyricsByLine[0] == "") {
    // Remove empty lines in the start
    lyricsByLine.shift()
  }

  const lyricsByWord = lyricsByLine.flatMap((sentence) =>
    sentence.split(" ").filter((word) => word !== ""),
  )

  return NextResponse.json({
    byLine: lyricsByLine,
    byWord: lyricsByWord,
  })
}
