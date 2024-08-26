import { Member } from "@/app/lib/definitions";
import { getMemberById } from "@/app/lib/actions";
import { unstable_noStore } from "next/cache";
import Form from "@/app/ui/members/EditForm";
import fetcher from "@/app/lib/fetcher";

export default async function Page({ params }: { params: { id: string } }) {
  unstable_noStore();

  const member = await getMemberById(params.id);
  const classcodes = await fetcher(`${process.env.API}/classcodes`).then(
    (res) => res.json()
  );

  return <Form classCodes={classcodes.data} member={member.members[0]} />;
}
