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
import Stack from "@mui/material/Stack";
import { UpdateMember, DeleteMember } from "./Button";

import { formatDate } from "@/app/lib/utils";

import { Member } from "@/model/models";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getMembers } from "@/app/lib/actions";

export default function MemberTable({ params }: { params: string }) {
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

  const [members, setMembers] = useState([]);
  const [count, setCount] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMembers(params);
      setMembers(data.members);
      setCount(data.count);
    };
    fetchData();
  }, [params]);

  return (
    <div className="flex flex-col gap-2 items-center">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "400px", overflow: "scroll" }}
      >
        <Table aria-label="Participation Table" sx={{ borderRadius: "12px" }}>
          <TableHead>
            <TableRow sx={{ fontWeight: "bold" }}>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Faculty</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members?.map((row: Member) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.class_code}</TableCell>
                <TableCell>{row.departments.name}</TableCell>
                <TableCell align="right">
                  <div className="flex gap-3 justify-end">
                    <UpdateMember id={row.id}></UpdateMember>
                    <DeleteMember id={row.id}></DeleteMember>
                  </div>
                </TableCell>
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
