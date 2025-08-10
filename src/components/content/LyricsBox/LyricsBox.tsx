import { Selection } from "@/types/userChoice"

export default function LyricsBox({
  userSelection,
}: {
  userSelection: Selection
}) {
  return (
    <div className="bg-card border rounded-md p-4 gap-2">
      <h1 className="text-4xl">Lyrics</h1>
      <p className="max-w-128">
        pretend these are lyrics pretend these are lyrics pretend these are
        lyrics pretend these are lyrics
      </p>
    </div>
  )
}
