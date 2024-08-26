"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

    params.set("startdate", start.toString());
    params.set("enddate", end.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        onChange={(value, c) =>
          handleDateFilter(value[0]?.valueOf(), value[1]?.valueOf())
        }
        sx={{ borderRadius: "12px" }}
      />
    </LocalizationProvider>
  );
}
