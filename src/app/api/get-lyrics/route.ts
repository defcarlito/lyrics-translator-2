export const runtime = "nodejs"

import { Song } from "@/types/song"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const song: Song = body.song

  const s = await fetch(
    `https://lrclib.net/api/search?track_name=${encodeURIComponent(song.title)}&artist_name=${encodeURIComponent(song.artist)}`,
  ).then((r) => r.json())

  const topSearchLyrics = s[0].plainLyrics
  const lyricsByLine = topSearchLyrics.split("\n")

  const lyricsByWord = lyricsByLine.flatMap((sentence: string) =>
    sentence.split(" ").filter((word: string) => word !== ""),
  )

  return NextResponse.json({
    byLine: lyricsByLine,
    byWord: lyricsByWord,
  })
}
