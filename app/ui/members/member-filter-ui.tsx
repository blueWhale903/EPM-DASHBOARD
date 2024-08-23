"use client";

import Search from "../search";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DropdownFilter from "../Buttons/dropdown-filter";

export default function MemberFilterUI({ classcodes }: { classcodes: any }) {
  const searchParams = useSearchParams();
  return (
    <div className="flex gap-2 justify-between mb-4 items-center">
      <div className="flex gap-2 w-auto items-center">
        <div>
          <Search query="name" />
        </div>
        <div>
          <Search query="id" />
        </div>
        <div>
          <DropdownFilter
            values={classcodes.map((classcode: any) => classcode.name)}
            filterName="classcode"
            isMultiple={false}
          />
        </div>
      </div>
      <Link href="/dashboard/members/create" className="w-fit">
        <Button
          variant="contained"
          sx={{ background: "#006fee", color: "#fff" }}
        >
          + Member
        </Button>
      </Link>
    </div>
  );
}
