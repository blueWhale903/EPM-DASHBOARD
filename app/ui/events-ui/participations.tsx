import fetcher from "@/app/lib/fetcher";
import { redirect } from "next/navigation";
import EventInfo from "./EventInfo";
import ParticipantsTable from "../Tables/ParticipantsTable";

export default async function Participations({
  id,
  page,
}: {
  id: string;
  page: number;
}) {
  const event = await fetcher(`${process.env.API}/events/${id}`, {
    method: "GET",
  }).then((res) => {
    if (res.status == 403) {
      redirect("/login");
    } else {
      return res.json();
    }
  });

  const participations = await fetcher(
    `${process.env.API}/events/${id}/participants?page=${page}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  ).then((res) => res.json());

  return (
    <div>
      <EventInfo event={event.data.event} />;
      <ParticipantsTable
        data={participations.data.participants}
        count={participations.data.count}
      />
    </div>
  );
}
