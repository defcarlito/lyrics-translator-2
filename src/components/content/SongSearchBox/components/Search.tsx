import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Setter } from "@/types/setter"
import { Song } from "@/types/song"
import { Selection } from "@/types/userChoice"
import { useCallback, useEffect, useState } from "react"

const PLACEHOLDER: string = "ex. País do Futebol by MC Guimê"

export default function Search({
  setSongInfo,
  setLoading,
  setUserSelection,
}: {
  setSongInfo: Setter<Song[]>
  setLoading: Setter<boolean>
  setUserSelection: Setter<Selection>
}) {
  const [userInput, setUserInput] = useState<string>("")

  const handleSubmit = useCallback(async () => {
    setLoading(true)

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search: userInput }),
    })

    const data = await res.json()
    setSongInfo(data.songs)
    setLoading(false)
  }, [userInput, setLoading, setSongInfo])

  useSearchDelay(userInput, handleSubmit, setSongInfo)

  const resetSelection: Selection = { song: undefined, hasSelected: false }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl">Search for a song...</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit()
        }}
        className="flex gap-1"
      >
        <Input
          name="search"
          placeholder={PLACEHOLDER}
          className="min-w-70"
          onChange={(event) => {
            setUserInput(event.target.value)
            setUserSelection(resetSelection)
          }}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  )
}

function useSearchDelay(
  userInput: string,
  handleSubmit: Function,
  setSongInfo: Setter<Song[]>
) {
  useEffect(() => {
    if (!userInput.trim()) {
      setSongInfo([])
      return
    }

    const timer = setTimeout(() => {
      handleSubmit()
    }, 400)
    return () => clearTimeout(timer)
  }, [userInput])
}
