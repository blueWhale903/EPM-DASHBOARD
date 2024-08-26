"use client";

import Search from "../filters/Search";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DropdownFilter from "../filters/DropdownFilter";
import { useEffect, useState } from "react";
import { getClassCodes } from "@/app/lib/actions";

export default function MemberFilter() {
  const searchParams = useSearchParams();

  const [classcodes, setClassCodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getClassCodes();
      setClassCodes(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex gap-2 justify-between mb-4 items-center">
      <div className="flex flex-col md:flex-row gap-2 w-auto items-center">
        <div>
          <Search query="name" />
        </div>
        <div>
          <Search query="id" />
        </div>
        <div>
          <DropdownFilter
            values={classcodes?.map((classcode: any) => classcode.name)}
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
