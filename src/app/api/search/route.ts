import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const search = body.search

  const accessToken = process.env.GENIUS_ACCESS_TOKEN

  const url = `https://api.genius.com/search?q=${encodeURIComponent(search)}`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()
  const topHit = data.response.hits[0]

  return NextResponse.json({
    topHit,
  })
}
