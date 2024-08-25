"use client";

import EventTable from "../Tables/EventsTable";
import { useEffect, useState } from "react";
import { getFilteredEvents } from "@/app/lib/actions";
import { Event } from "@/model/models";

export default async function EventsData({ query }: { query: string }) {
  const [events, setEvents] = useState<{
    success: boolean;
    data: { count: number; events: Event[] };
    message: string;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFilteredEvents(query);
      console.log(data);
      setEvents(data);
    };
    fetchData();
  }, [query]);

  return (
    <div>
      {/* <EventTable data={events?.data.events} count={events?.data.count} /> */}
    </div>
  );
}
