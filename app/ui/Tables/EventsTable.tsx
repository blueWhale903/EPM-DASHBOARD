"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { formatDate } from "@/app/lib/utils";

import { Event } from "@/model/models";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function EventsTable({
  data,
  count,
}: {
  data: Event[];
  count: number;
}) {
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const pathname = usePathname();

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex flex-col gap-2 items-center">
      <TableContainer component={Paper}>
        <Table aria-label="Event Table">
          <TableHead>
            <TableRow sx={{ fontWeight: "bold" }}>
              <TableCell>Category</TableCell>
              <TableCell>name</TableCell>
              <TableCell>date</TableCell>
              <TableCell>organization</TableCell>
              {/* <TableCell>description</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: Event) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  push(`/dashboard/events/${row.id}`);
                }}
              >
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{formatDate(row.start_date)}</TableCell>
                <TableCell>{row.organization}</TableCell>
                {/* <TableCell>{row.description}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(count / 10)}
        onChange={handlePagination}
        sx={{ width: "full" }}
      />
    </div>
  );
}
