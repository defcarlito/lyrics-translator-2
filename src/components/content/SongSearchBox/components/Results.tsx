import { Setter } from "@/types/setter";
import { Song } from "@/types/song";
import SongCard from "./SongCard/SongCard";
import SongSkeleton from "./SongSkeleton/SongSkeleton";
import { Selection } from "@/types/userChoice";

export default function Results({
  songInfo,
  loading,
  setUserSelection,
}: {
  songInfo: Song[];
  loading: boolean;
  setUserSelection: Setter<Selection>;
}) {
  return (
    <div className="flex flex-col justify-between border p-4 w-xs lg:w-md h-128 rounded-lg bg-card/50 backdrop-blur-xs shadow-sm">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <SongSkeleton key={index} />
          ))
        : songInfo.map((song, index) => (
            <SongCard
              song={song}
              key={index}
              setUserSelection={setUserSelection}
            />
          ))}
    </div>
  );
}
