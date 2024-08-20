import EventsTable from "./events-table";
import fetcher from "@/app/lib/fetcher";
import { redirect } from "next/navigation";

export default async function EventsData({ query }: { query: string }) {
  console.log(query);
  let eventsData = await fetcher(
    `${process.env.API}/events?limit=10&${query}`
  ).then((res) => {
    if (res.status == 403 || res.status == 400) {
      redirect("/login");
    } else {
      return res.json();
    }
  });
  return (
    <EventsTable
      events={eventsData.data.events}
      count={eventsData.data.count}
    />
  );
}
