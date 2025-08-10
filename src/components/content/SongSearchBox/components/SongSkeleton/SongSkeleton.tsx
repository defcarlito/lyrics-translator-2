export default function SongSkeleton() {
  return (
    <div className="flex gap-4 rounded-md transition">
      <div className="shrink-0">
        <div className="box size-36 bg-accent rounded-md opacity-50"></div>
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <h1 className="bg-accent text-transparent rounded-md opacity-50">super long loading title</h1>
        <p className="text-sm bg-accent text-transparent rounded-md opacity-50">by loading artist</p>
      </div>
    </div>
  )
}
