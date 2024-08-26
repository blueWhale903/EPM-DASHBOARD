import { ListSkeleton } from "@/app/ui/skeleton/List";
import { Suspense } from "react";
import ParticipantTable from "@/app/ui/events/ParticipantsTable";
import EventInfo from "@/app/ui/events/EventInfo";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: number };
}) {
  return (
    <div className="flex flex-col gap-2">
      <Suspense fallback={<ListSkeleton />}>
        <EventInfo id={params.id} />
        <ParticipantTable id={params.id} page={searchParams.page} />
      </Suspense>
    </div>
  );
}
