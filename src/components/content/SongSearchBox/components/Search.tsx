import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Setter } from "@/types/setter"
import { Song } from "@/types/song"
import { Selection } from "@/types/userChoice"
import { Search } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"

const PLACEHOLDER: string = "ex. País do Futebol by MC Guimê"
const SEARCH_DEBOUNCE_DELAY: number = 400 // milliseconds

export default function SearchBox({
  setSongInfo,
  setLoading,
  setUserSelection,
  userInput,
  setUserInput,
}: {
  setSongInfo: Setter<Song[]>
  setLoading: Setter<boolean>
  setUserSelection: Setter<Selection>
  userInput: string
  setUserInput: Setter<string>
}) {
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
    <div className="space-y-4 self-center">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setUserSelection(resetSelection)
          handleSubmit()
        }}
        className="flex gap-1"
      >
        <Input
          name="search"
          placeholder={PLACEHOLDER}
          className="bg-card"
          onChange={(event) => {
            setUserInput(event.target.value)
            setUserSelection(resetSelection)
            setLoading(true)
          }}
        />
        <Button type="submit" size="icon" color="primary">
          <Search />
        </Button>
      </form>
    </div>
  )
}

function useSearchDelay(
  userInput: string,
  handleSubmit: Function,
  setSongInfo: Setter<Song[]>,
) {
  useEffect(() => {
    if (!userInput.trim()) {
      setSongInfo([])
      return
    }

    const timer = setTimeout(() => {
      handleSubmit()
    }, SEARCH_DEBOUNCE_DELAY)
    return () => clearTimeout(timer)
  }, [userInput])
}
