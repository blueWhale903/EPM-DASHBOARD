import fetcher from "../lib/fetcher";
import MemberFilterUI from "./members/member-filter-ui";

export default async function MemberFilter() {
  const classcodes = await fetcher(`${process.env.API}/classcodes`).then(
    (res) => res.json()
  );

  return <MemberFilterUI classcodes={classcodes.data} />;
}
