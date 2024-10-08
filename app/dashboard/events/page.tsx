import EventsTable from "@/app/ui/events/EventsTable";
import EventsFilter from "@/app/ui/events/EventFilter";

import { ListSkeleton } from "@/app/ui/skeleton/List";
import { Card } from "@/app/ui/skeleton/Card";
import { Suspense } from "react";

export default function Page({ searchParams }: { searchParams: any }) {
  const params = new URLSearchParams(searchParams).toString();

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-4xl font-bold">Events</h1>
      <Suspense fallback={<Card />}>
        <EventsFilter />
      </Suspense>
      <Suspense fallback={<ListSkeleton />}>
        <EventsTable query={params.toString()} />
      </Suspense>
    </div>
  );
}
