import { Input } from "@nextui-org/react";
import Search from "@/app/ui/search";
import Participations from "@/app/ui/participations-table";
import { unstable_noStore } from "next/cache";
import MultiFilterDropdown from "@/app/ui/multifilterdropdown";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: any }) {
  unstable_noStore();
  const tokenCookie = cookies().get("x-auth-token");
  let token = "";
  if (tokenCookie) {
    token = tokenCookie.value;
  }
  const events = await fetch(
    `${process.env.API}/participants/${searchParams.id}/events?page=${searchParams.page}&schoolyear=${searchParams.schoolyear}&semester=${searchParams.semester}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "x-auth-token": token,
      },
    }
  ).then((res) => {
    if (res.status == 403 || res.status == 400) {
      redirect("/login");
    } else {
      return res.json();
    }
  });

  const participationInfo = await fetch(
    `${process.env.API}/participants/${searchParams.id}/mark?schoolyear=${searchParams.schoolyear}&semester=${searchParams.semester}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "x-auth-token": token,
      },
    }
  ).then((res) => res.json());

  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="text-4xl mb-4 font-bold">Participants</h1>
      <div className="bg-white px-3 py-5 rounded-xl shadow-md">
        <div className="flex gap-3 flex-wrap">
          <Search query="id" />
          <MultiFilterDropdown
            options={["23-24", "22-23", "21-22"]}
            filterName="schoolyear"
            multiple={false}
          />
          <MultiFilterDropdown
            options={[1, 2]}
            filterName="semester"
            multiple={false}
          />
        </div>
        <div className="mt-4">
          <div className="flex flex-col gap-1 py-3 border-t-1">
            <p className="font-black">Thông tin sinh viên</p>
            <p>Họ tên: {events.data.participations[0]?.name}</p>
            <p>MSSV: {events.data.participations[0]?.student_id}</p>
            <p>Tổng hoạt động: {participationInfo.data.length}</p>
            <p>Tổng điểm: {participationInfo.data.totalMark}</p>
          </div>
        </div>
      </div>
      {events && (
        <Participations
          data={events.data.participations}
          count={participationInfo.data.length}
        />
      )}
    </div>
  );
}
