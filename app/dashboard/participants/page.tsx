import Search from "@/app/ui/search";
import DropdownFilter from "@/app/ui/Buttons/dropdown-filter";
import { redirect } from "next/navigation";
import fetcher from "@/app/lib/fetcher";
import ParticipationTable from "@/app/ui/Tables/ParticipationTable";

export default async function Page({ searchParams }: { searchParams: any }) {
  const events = await fetcher(
    `${process.env.API}/participants/${searchParams.id}/events?page=${searchParams.page}&schoolyear=${searchParams.schoolyear}&semester=${searchParams.semester}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  ).then((res) => {
    if (res.status == 403 || res.status == 400) {
      redirect("/login");
    } else {
      return res.json();
    }
  });

  const participationInfo = await fetcher(
    `${process.env.API}/participants/${searchParams.id}/mark?schoolyear=${searchParams.schoolyear}&semester=${searchParams.semester}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  ).then((res) => res.json());

  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="text-4xl mb-4 font-bold">Participants</h1>
      <div className="bg-white px-4 py-2 rounded-xl shadow-md">
        <div className="flex gap-3 flex-wrap items-center justify-start">
          <Search query="id" />
          <DropdownFilter
            values={["23-24", "22-23", "21-22"]}
            filterName="schoolyear"
            isMultiple={false}
          />
          <DropdownFilter
            values={["1", "2"]}
            filterName="semester"
            isMultiple={false}
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

      <ParticipationTable
        data={events.data.participations}
        count={participationInfo.data.length}
      />
    </div>
  );
}
