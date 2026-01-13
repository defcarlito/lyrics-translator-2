import { Button } from "@/components/ui/button"
import { Word } from "@/types/word"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Copy } from "lucide-react"

export default function Export({
  clickedWords,
}: {
  clickedWords: Map<string, Word>
}) {
  function exportWords() {
    console.log("clicked words:", clickedWords)
  }

  function buildCopyableText() {
    return Array.from(clickedWords.values())
      .map((value) => {
        const meaning = value.meanings[value.selectedMeaningIndex]

        if (!meaning) return null

        const infinitive = meaning.infinitive
          ? ` (inf: ${meaning.infinitive})`
          : ""

        const gender = meaning.gender ? ` (gender: ${meaning.gender})` : ""

        const slang = meaning.slang ? ` (slang)` : ""

        return `${value.word}, "${meaning.translation}" (pos: ${meaning.pos})${gender}${infinitive}${slang};`
      })
      .filter(Boolean)
      .join("\n")
  }

  async function copyToClipboard() {
    const text = buildCopyableText()

    try {
      await navigator.clipboard.writeText(text)
      return toast.success("Copied content to clipboard.")
    } catch {
      return toast.error("Error copying content.")
    }
  }

  return (
    <div className="border p-4 rounded-sm flex flex-col gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={exportWords}>Export list to Quizlet</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-lg font-semibold">
                Instructions for exporting your collection to Quizlet
              </h1>
              <ol className="list-decimal list-inside">
                <li>
                  Visit{" "}
                  <a
                    href="https://quizlet.com/create-set"
                    target="_blank"
                    className="underline text-blue-700"
                  >
                    this
                  </a>{" "}
                  page to create a flashcard set on Quizlet.
                </li>
                <li>Select &quot;Import&quot;.</li>
                <li>Paste your content (from below) into the text box.</li>
                <li>
                  Select &quot;Comma&quot; for the &quot;Between term and
                  definition&quot; option and &quot;Semicolon&quot; for the
                  &quot;Between cards&quot; option.
                </li>
                <li>
                  Finish by selecting &quot;Import&quot; in the bottom right.
                </li>
              </ol>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">Your content</h1>
              <div className="bg-gray-100 p-2 rounded-sm max-h-46 overflow-scroll">
                {Array.from(clickedWords.values())
                  .filter((value) => value.language === "portuguese")
                  .map((value, index) => {
                    const meaning = value.meanings[value.selectedMeaningIndex]
                    return (
                      <p key={index}>
                        {value.word}, &quot;{meaning?.translation}&quot; (pos:{" "}
                        {meaning?.pos})
                        {meaning?.gender && ` (gender: ${meaning.gender})`}
                        {meaning?.infinitive && ` (inf: ${meaning.infinitive})`}
                        {meaning?.slang && ` (slang)`};
                      </p>
                    )
                  })}
              </div>
              <Button
                onClick={() => {
                  copyToClipboard()
                }}
              >
                <Copy /> Copy
              </Button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Done</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
