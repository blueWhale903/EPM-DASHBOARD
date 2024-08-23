import fetcher from "@/app/lib/fetcher";
import { redirect } from "next/navigation";
import MemberTableUI from "../Tables/MemberTable";

export default async function MemberTable({ params }: { params: any }) {
  const members = await fetcher(
    `${process.env.API}/members?${params.toString()}`
  ).then((res) => {
    if (res.status == 403) {
      redirect("/login");
    } else {
      return res.json();
    }
  });

  return (
    <MemberTableUI data={members.data.members} count={members.data.count} />
  );
}
