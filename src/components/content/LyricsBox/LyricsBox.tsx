import { Song } from "@/types/song";

export default function LyricsBox({ selectedSong }: { selectedSong: Song | undefined }) {

  return (
    <div>
      <p>{selectedSong?.title}</p>
    </div>
  )
}