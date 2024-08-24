"use server";

import fetcher from "@/app/lib/fetcher";
import { redirect } from "next/navigation";

import EventTable from "../Tables/EventsTable";
import { ListSkeleton } from "@/app/skeleton/list";

export default async function EventsData({ query }: { query: string }) {
  let res = await fetcher(
    `${process.env.API}/events?limit=10&${query.replaceAll("%2B", "+")}`
  ).then((res) => {
    if (res.status == 403 || res.status == 400) {
      redirect("/login");
    } else {
      return res.json();
    }
  });
  if (!res) {
    return <ListSkeleton />;
  }

  return (
    <div>
      <EventTable data={res?.data.events} count={res?.data.count} />
    </div>
  );
}
