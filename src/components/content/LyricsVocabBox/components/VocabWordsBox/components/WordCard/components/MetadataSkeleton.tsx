export default function MetadataSkeleton({ word }: { word: string }) {
  return (
    <div className="flex flex-col bg-card p-2 border rounded-sm gap-1 items-start">
      <h1 className="border-b-1 w-full">
        <i>{word}</i>
      </h1>
      <p className="bg-accent text-transparent w-full rounded-md">definition</p>
      <div className="flex justify-between w-full gap-1">
        <p className="bg-accent text-transparent w-full rounded-md">badge</p>
        <p className="bg-accent text-transparent w-full rounded-md">badge</p>
      </div>
    </div>
  )
}
