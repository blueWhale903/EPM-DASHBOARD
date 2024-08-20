import { Button } from "@nextui-org/react";
import Link from "next/link";
import MemberTable from "@/app/ui/members-table";
import MemberFilter from "@/app/ui/members-filter";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams: any }) {
  unstable_noStore();
  const params = new URLSearchParams(searchParams);

  const tokenCookie = cookies().get("x-auth-token");
  let token = "";
  if (tokenCookie) {
    token = tokenCookie.value;
  }

  const members = await fetch(
    `${process.env.API}/members?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "x-auth-token": token,
      },
    }
  ).then((res) => {
    if (res.status == 403) {
      redirect("/login");
    } else {
      return res.json();
    }
  });

  const classcodes = await fetch(`${process.env.API}/classcodes`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "x-auth-token": token,
    },
  }).then((res) => res.json());

  const departments = await fetch(`${process.env.API}/departments`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "x-auth-token": token,
    },
  }).then((res) => res.json());
  return (
    <main>
      <h1 className="text-4xl mb-4 font-bold">Members</h1>
      <Suspense>
        <MemberFilter classcodes={classcodes.data} />
        <MemberTable
          members={members.data.members}
          count={members.data.count}
        />
      </Suspense>
    </main>
  );
}
