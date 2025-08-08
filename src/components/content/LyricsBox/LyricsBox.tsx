import { Selection } from "@/types/userChoice"

export default function LyricsBox({
  userSelection,
}: {
  userSelection: Selection
}) {
  return (
    <div>
      <p>{userSelection.song?.title}</p>
    </div>
  )
}
