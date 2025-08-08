import { Setter } from "@/types/setter"
import { Song } from "@/types/song"
import SongCard from "./SongCard/SongCard"
import SongSkeleton from "./SongSkeleton/SongSkeleton"

export default function Results({
  songInfo,
  loading,
  setSelectedSong,
}: {
  songInfo: Song[]
  loading: boolean
  setSelectedSong: Setter<Song | undefined>
}) {
  return (
    <div className="flex flex-col justify-between border p-4 w-md h-128 rounded-lg bg-card shadow-sm">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <SongSkeleton key={index} />
          ))
        : songInfo.map((song, index) => (
            <SongCard
              song={song}
              key={index}
              setSelectedSong={setSelectedSong}
            />
          ))}
    </div>
  )
}
