import fetcher from "@/app/lib/fetcher";
import EventsBar from "./events-chart";
import CategoryChart from "./category-chart";

export async function Charts() {
  const events = await fetcher(`${process.env.API}/statistics/events`).then(
    (res) => res.json()
  );
  console.log(events);
  return (
    <div className="flex gap-2 w-full h-fit">
      <EventsBar eventsCount={events.data.byMonths} />
      <CategoryChart categories={events.data.byCategories} />
    </div>
  );
}
