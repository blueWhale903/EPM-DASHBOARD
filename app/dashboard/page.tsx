import { Prociono } from "next/font/google";
import fetcher from "../lib/fetcher";
import { CardStat } from "../ui/charts/cards";
import EventsBar from "../ui/charts/events-chart";
import CategoryChart from "../ui/charts/category-chart";
import { Suspense } from "react";

export default async function Page() {
  const events = await fetcher(`${process.env.API}/statistics/events`).then(
    (res) => res.json()
  );
  const eventCount = await fetcher(
    `${process.env.API}/statistics/events/count?month=1`
  ).then((res) => res.json());
  const participationCount = await fetcher(
    `${process.env.API}/statistics/participations/count?month=1`
  ).then((res) => res.json());

  return (
    <main>
      <h1 className="text-4xl mb-4 font-bold">Overview</h1>
      <div className="flex w-full gap-4">
        <Suspense fallback={"loading"}>
          <CardStat data={eventCount.data} title="Total events" />
          <CardStat
            data={participationCount.data}
            title="Total participation"
          />
        </Suspense>
      </div>
      <div className="flex gap-2">
        <Suspense>
          <EventsBar eventsCount={events.data.byMonths} />
          <CategoryChart categories={events.data.byCategories} />
        </Suspense>
      </div>
    </main>
  );
}
