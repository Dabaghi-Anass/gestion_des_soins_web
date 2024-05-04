export function DayList({ startOfWeek, currentDate }: { startOfWeek: Date, currentDate: Date }) {
  return <div className="days w-full h-full flex ">
    {Array.from({ length: 6 }).map((_, i) => {
      let day = new Date(startOfWeek);
      day.setDate(day.getDate() + i + 1);
      return (
        <div className="day flex flex-col gap-2 items-center p-4 w-full" key={i}>
          <span className="text-sm">
            {day.toLocaleDateString("fr-FR", {
              weekday: 'long',
            })}
          </span>
          <span className={`text-xl font-semibold ${day.getDate() === currentDate.getDate() ? "bg-primary text-white px-2 rounded-lg" : ""}`}>
            {day.toLocaleDateString("fr-FR", {
              day: 'numeric',
            })}
          </span>
        </div>
      );
    })}
  </div>
}