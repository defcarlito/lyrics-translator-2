import { Button } from "@/components/ui/button";

export default function Export({
  clickedWords,
}: {
  clickedWords: Map<string, Word>
}) {
  function exportWords() {
    console.log("clicked words:", clickedWords)
  }
  return (
    <div className="border p-4 rounded-sm flex flex-col gap-2">
      <Button onClick={exportWords}>Export list to Quizlet</Button>
    </div>
  )
}
