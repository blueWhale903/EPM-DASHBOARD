import { Input } from "@nextui-org/react";
import { formatDate } from "@/app/lib/utils";
import ParticipantsTable from "@/app/ui/participant-table";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ClockIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page?: number };
}) {
  const tokenCookie = cookies().get("x-auth-token");
  let token = "";
  if (tokenCookie) {
    token = tokenCookie.value;
  }

  const event = await fetch(`${process.env.API}/events/${params.id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "x-auth-token": token,
    },
  }).then((res) => {
    if (res.status == 403) {
      redirect("/login");
    } else {
      return res.json();
    }
  });

  const res = await fetch(
    `${process.env.API}/events/${params.id}/participants?page=${searchParams.page}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "x-auth-token": token,
      },
    }
  ).then((res) => res.json());

  return (
    <div className="flex flex-col gap-2">
      <div className=" bg-white px-3 py-5 rounded-xl shadow-md flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="text-bold text-xl pb-2 border-b-1">
            {event.data.event.name}
          </div>
          <div className="flex gap-2">
            {" "}
            <ClockIcon className="text-[#006fee] w-4" />
            {formatDate(event.data.event.start_date)} -{" "}
            {formatDate(event.data.event.end_date)}
          </div>
          <div className="flex gap-2">
            <DocumentTextIcon className="text-[#006fee] w-4" />
            {event.data.event.category}
          </div>
          <div className="flex gap-2">
            <CalendarDaysIcon className="text-[#006fee] w-4" />
            {event.data.event.school_year}
          </div>
          <div className="flex gap-2">
            {" "}
            <AcademicCapIcon className="text-[#006fee] w-4" />
            {event.data.event.semester}
          </div>
        </div>
      </div>
      <ParticipantsTable
        participants={res.data.participants}
        count={res.data.count}
      />
    </div>
  );
}
