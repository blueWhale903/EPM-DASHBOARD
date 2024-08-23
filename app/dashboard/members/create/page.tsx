import Form from "@/app/ui/members/create-form";
import { cookies } from "next/headers";
import fetcher from "@/app/lib/fetcher";

export default async function Page() {
  const classCodes = await fetcher(`${process.env.API}/classcodes`, {}).then(
    (res) => res.json()
  );
  return (
    <div>
      <Form classCodes={classCodes.data} />
    </div>
  );
}
