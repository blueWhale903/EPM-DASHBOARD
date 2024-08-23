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

import { Participation } from "@/model/models";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function ParticipationTable({
  data,
  count,
}: {
  data: Participation[];
  count: number;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
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
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "400px", overflow: "scroll" }}
      >
        <Table aria-label="Participation Table">
          <TableHead>
            <TableRow sx={{ fontWeight: "bold" }}>
              <TableCell>Category</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Achievement</TableCell>
              <TableCell>Reward</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Mark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: Participation) => (
              <TableRow
                key={row.student_id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>{row.events.category}</TableCell>
                <TableCell>{row.events.name}</TableCell>
                <TableCell>{row.achievement}</TableCell>
                <TableCell>{row.reward_org}</TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell>{row.mark}</TableCell>
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
