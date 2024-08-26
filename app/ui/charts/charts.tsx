import fetcher from "@/app/lib/fetcher";
import EventsBar from "./EventsChart";
import CategoryChart from "./CategoryChart";

export async function Charts() {
  const events = await fetcher(`${process.env.API}/statistics/events`).then(
    (res) => res.json()
  );
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full ">
      <EventsBar eventsCount={events.data.byMonths} />
      <CategoryChart categories={events.data.byCategories} />
    </div>
  );
}
