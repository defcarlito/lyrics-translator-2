export default function MetadataSkeleton({ word }: { word: string }) {
  return (
    <div className="flex flex-col bg-card p-4 border rounded-sm shadow-sm gap-1 items-center">
      <h1>{word}</h1>
      <p className="bg-accent text-transparent w-full rounded-md">
        definition
      </p>
      <div className="flex justify-between w-full">
        <p className="bg-accent text-transparent w-fit rounded-md">badge</p>
        <p className="bg-accent text-transparent w-fit rounded-md">badge</p>
      </div>
    </div>
  )
}
