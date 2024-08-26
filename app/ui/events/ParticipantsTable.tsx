"use client";

import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";

import { formatDate } from "@/app/lib/utils";

import { Participant } from "@/model/models";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getParticipants } from "@/app/lib/actions";

export default function ParticipantTable({
  id,
  page,
}: {
  id: string;
  page: number;
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

  const [participants, setParticipants] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getParticipants(id, page);
      setParticipants(data.participants);
      setCount(data.count);
    };
    fetchData();
  }, []);

  page = page ? page : 1;

  const start = (Number(page) - 1) * 10;
  const end = start + 10;
  const entries = participants.slice(start, end);

  return (
    <div className="flex flex-col gap-2 items-center">
      <TableContainer component={Paper}>
        <Table aria-label="Event Table">
          <TableHead>
            <TableRow sx={{ fontWeight: "bold" }}>
              <TableCell>student id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>achievement</TableCell>
              <TableCell>reward</TableCell>
              <TableCell>note</TableCell>
              <TableCell>mark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries?.map((row: Participant) => (
              <TableRow
                key={row.student_id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>{row.student_id}</TableCell>
                <TableCell>{row.name}</TableCell>
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
