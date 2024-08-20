"use client";

import MultiFilterDropdown from "./multifilterdropdown";
import Search from "./search";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
export default function MemberFilter({ classcodes }: { classcodes: any }) {
  const searchParams = useSearchParams();
  return (
    <div className="flex gap-2 justify-between mb-4">
      <div className="flex gap-2 w-auto items-center">
        <div>
          <Search query="name" />
        </div>
        <div>
          <Search query="id" />
        </div>
        <div>
          <MultiFilterDropdown
            options={classcodes.map((classcode: any) => classcode.name)}
            filterName="classcode"
            multiple={false}
          />
        </div>
      </div>
      <Link href="/dashboard/members/create" className="w-fit">
        <Button className="bg-[#006fee] text-white">+ Member</Button>
      </Link>
    </div>
  );
}
