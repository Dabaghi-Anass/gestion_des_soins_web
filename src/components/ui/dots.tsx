export default function Dots({ count }: { count: number }) {
  return <div className="flex gap-1 items-center">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="w-1 h-1 bg-gray-300 rounded-full"></div>
    ))}
  </div>
}