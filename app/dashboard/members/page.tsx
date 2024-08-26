import Link from "next/link";
import MemberTable from "@/app/ui/members/MemberTable";
import MemberFilter from "@/app/ui/members/MemberFilter";
import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams: any }) {
  const params = new URLSearchParams(searchParams).toString();

  return (
    <main>
      <h1 className="text-4xl mb-4 font-bold">Members</h1>
      <MemberFilter />
      <Suspense>
        <MemberTable params={params} />
      </Suspense>
    </main>
  );
}
