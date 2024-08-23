import { ListSkeleton } from "@/app/skeleton/list";
import Participations from "@/app/ui/events-ui/participations";
import { Suspense } from "react";

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
        <Participations id={params.id} page={searchParams.page} />
      </Suspense>
    </div>
  );
}
