"use client";

import { DateRangePicker, dataFocusVisibleClasses } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DateFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleDateFilter = (start: any, end: any) => {
    const params = new URLSearchParams(searchParams);

    if (!start || !end) {
      params.delete("startdate");
      params.delete("enddate");
      replace(`${pathname}?${params.toString()}`);
      return;
    }

    const start_date = Date.parse(`${start.month}/${start.day}/${start.year}`);
    const end_date = Date.parse(`${end.month}/${end.day}/${end.year}`);

    params.set("startdate", start_date.toString());
    params.set("enddate", end_date.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DateRangePicker
      variant="bordered"
      className="max-w-xs"
      onChange={(daterange) => {
        if (!daterange) {
          handleDateFilter(null, null);
          return;
        }
        handleDateFilter(daterange.start, daterange.end);
      }}
    />
  );
}
