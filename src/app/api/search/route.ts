import { Song } from "@/types/song"
import { NextRequest, NextResponse } from "next/server"

const RESULT_LIMIT = 3

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
  const getTopHits = () => {
    const totalHits: number = data.response.hits.length

    // limit # search results to <= RESULT_LIMIT
    const totalSearchResult: number = Math.min(RESULT_LIMIT, totalHits)
    const topSearchResults: JSON[] = data.response.hits.slice(
      0,
      totalSearchResult
    )

    return topSearchResults
  }

  const searchHits = getTopHits()

  const formattedSongInfo: Song[] = searchHits.map((hit: any) => {
    const songInfo = hit.result

    const getFeaturedArtistNames = () => {
      const allFeaturedArtists: JSON[] = songInfo.featured_artists
      const allFeaturedArtistsNames: string[] = allFeaturedArtists.map(
        (artist: any) => {
          return artist.name
        }
      )
      return allFeaturedArtistsNames
    }

    const featuredArtistsNames = getFeaturedArtistNames()

    return {
      title: songInfo.title,
      artist: songInfo.primary_artist.name,
      featuredArtists: featuredArtistsNames,
      albumCover: songInfo.header_img_url,
    }
  })

  return NextResponse.json({
    songs: formattedSongInfo,
  })
}
