"use client";

import MultiFilterDropdown from "../multifilterdropdown";
import Search from "../search";
import StatusSelector from "./status-filter";
import DateFilter from "../date-filter";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function EventsFilter({
  markCategory,
}: {
  markCategory: any[];
}) {
  const searchParams = useSearchParams();

  return (
    <div className="flex gap-3 w-auto mb-3 items-center flex-wrap bg-white px-4 py-5 rounded-xl shadow-sm">
      <div>
        <Search query="name" />
      </div>
      <div>
        <MultiFilterDropdown
          options={markCategory.map((item) => item.category)}
          filterName="category"
          multiple={true}
        />
      </div>
      <div>
        <MultiFilterDropdown
          options={["23-24", "22-23", "21-22"]}
          filterName="schoolyear"
          multiple={false}
        />
      </div>
      <div>
        <MultiFilterDropdown
          options={[1, 2]}
          filterName="semester"
          multiple={false}
        />
      </div>
      <div>
        <StatusSelector />
      </div>
      <div>
        <DateFilter />
      </div>
      <div className="flex gap-5">
        <Button className="bg-[#ff6565] text-white">Clear</Button>
      </div>
    </div>
  );
}
