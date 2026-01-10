import { Button } from "@/components/ui/button";

export default function Export({
  clickedWords,
}: {
  clickedWords: Set<string>;
}) {
  function exportWords() {
    console.log(clickedWords);
  }
  return (
    <div className="border p-4 rounded-sm flex flex-col gap-2">
      <Button onClick={exportWords}>Export list to Quizlet</Button>
    </div>
  );
}
