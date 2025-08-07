import { Song } from "@/types/song"

export default function SongCard({ song }: { song: Song }) {
  return (
    <div className="flex gap-4 hover:bg-accent rounded-md transition">
      <div className="shrink-0">
        <img src={song.albumCover} alt="cover" className="size-32 rounded-md shadow-sm" />
      </div>
      <div className="flex flex-col justify-center items-start">
        <h1 className="font-bold">{song.title}</h1>
        <p className="text-sm text-wrap">by {song.artist}</p>
      </div>
    </div>
  )
}
