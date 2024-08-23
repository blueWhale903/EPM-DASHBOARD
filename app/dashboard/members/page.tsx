import Link from "next/link";
import MemberTable from "@/app/ui/members/member-table";
import MemberFilter from "@/app/ui/members-filter";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams: any }) {
  unstable_noStore();
  const params = new URLSearchParams(searchParams).toString();

  const tokenCookie = cookies().get("x-auth-token");
  let token = "";
  if (tokenCookie) {
    token = tokenCookie.value;
  }

  const classcodes = await fetch(`${process.env.API}/classcodes`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "x-auth-token": token,
    },
  }).then((res) => res.json());

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
