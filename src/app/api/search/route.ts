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
    const topSearchResults = data.response.hits.slice(0, totalSearchResult)

    return topSearchResults
  }

  const searchHits = getTopHits()

  type Hit = {
    result: HitData
  }

  type Artist = {
    name: string
  }

  type HitData = {
    title: string
    artist: string
    header_image_url: string
    featured_artists: Artist[]
    primary_artist: Artist
  }

  const formattedSongInfo: Song[] = searchHits.map((hit: Hit) => {
    const songInfo = hit.result

    const getFeaturedArtistNames = () => {
      const allFeaturedArtists: Artist[] = songInfo.featured_artists
      const allFeaturedArtistsNames: string[] = allFeaturedArtists.map(
        (artist: Artist) => {
          // console.log(artist)
          return artist.name
        },
      )
      return allFeaturedArtistsNames
    }

    const featuredArtistsNames = getFeaturedArtistNames()

    const song: Song = {
      title: songInfo.title,
      artist: songInfo.primary_artist.name,
      featuredArtists: featuredArtistsNames,
      albumCover: songInfo.header_image_url,
    }

    return song
  })

  return NextResponse.json({
    songs: formattedSongInfo,
  })
}
