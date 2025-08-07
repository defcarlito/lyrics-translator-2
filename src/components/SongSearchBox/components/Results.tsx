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
    <div className="space-y-4 border p-4 w-md rounded-lg bg-card shadow-sm">
      {loading
        ? songInfo.map((_, index) => <LoadingCard key={index} />)
        : songInfo.map((song, index) => <SongCard song={song} key={index} />)}
    </div>
  )
}
