import { Song } from "@/types/song"
import LoadingCard from "./LoadingCard/LoadingCard"
import SongCard from "./SongCard/SongCard"

export default function Results({
  songInfo,
  loading,
}: {
  songInfo: Song[]
  loading: boolean
}) {
  return (
    <div className="flex flex-col justify-between border p-4 w-md h-128 rounded-lg bg-card shadow-sm">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => <LoadingCard key={index} />)
        : songInfo.map((song, index) => <SongCard song={song} key={index} />)}
    </div>
  )
}
