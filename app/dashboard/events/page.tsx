export const dynamic = "force-dynamic";
import EventsTable from "@/app/ui/Tables/EventsTable";
import EventsFilter from "@/app/ui/events-ui/EventFilter";

import { ListSkeleton } from "@/app/skeleton/list";
import { Card } from "@/app/skeleton/card";
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
