"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Search() {
  const [userSearch, setUserSearch] = useState<string>("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search: userSearch }),
    })

    const data = await res.json()
    console.log(data)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-4xl">Search for a song...</h1>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          placeholder="ex. País do Futebol by MC Guimê"
          className="min-w-70"
          onChange={(event) => setUserSearch(event.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  )
}
