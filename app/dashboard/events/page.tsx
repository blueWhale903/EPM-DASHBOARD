export const dynamic = "force-dynamic";
import EventsTable from "@/app/ui/events-ui/events-table";
import EventsFilter from "@/app/ui/events-ui/events-filter";
import { redirect, useSearchParams } from "next/navigation";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import fetcher from "@/app/lib/fetcher";
import EventsData from "@/app/ui/events-ui/events-data";

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  unstable_noStore();
  const params = new URLSearchParams(searchParams).toString();

  const markCategory = await fetcher(`${process.env.API}/mark/categories`).then(
    (res) => res.json()
  );

  return (
    <div className="">
      <h1 className="text-4xl mb-4 font-bold">Events</h1>
      <EventsFilter markCategory={markCategory.data} />
      <Suspense key={params} fallback={"loading..."}>
        <EventsData query={params} />
      </Suspense>
    </div>
  );
}
