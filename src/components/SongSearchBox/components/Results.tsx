import { Song } from "@/types/song"

export default function Results({ songInfo }: { songInfo: Song[] }) {
  return (
    <div>
      {songInfo.map((song, index) => {
        return <p key={index}>{song.title}</p>
      })}
    </div>
  )
}
