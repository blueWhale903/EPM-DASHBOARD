import { Event } from "@/model/models";

import { formatDate } from "@/app/lib/utils";

import {
  ClockIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function EventInfo({ event }: { event: Event }) {
  return (
    <div className=" bg-white px-3 py-5 rounded-xl shadow-md flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="text-bold text-xl pb-2 border-b-1">{event.name}</div>
        <div className="flex gap-2">
          {" "}
          <ClockIcon className="text-[#006fee] w-4" />
          {formatDate(event.start_date)} - {formatDate(event.end_date)}
        </div>
        <div className="flex gap-2">
          <DocumentTextIcon className="text-[#006fee] w-4" />
          {event.category}
        </div>
        <div className="flex gap-2">
          <CalendarDaysIcon className="text-[#006fee] w-4" />
          {event.school_year}
        </div>
        <div className="flex gap-2">
          {" "}
          <AcademicCapIcon className="text-[#006fee] w-4" />
          {event.semester}
        </div>
      </div>
    </div>
  );
}
