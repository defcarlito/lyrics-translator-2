import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="space-y-4">
        <h1 className="text-4xl">Search for a song...</h1>
        <Input placeholder="ex. Toda Toda"></Input>
      </div>
    </div>
  )
}
