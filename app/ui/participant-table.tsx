"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cookies } from "next/headers";
export default function ParticipantsTable({
  participants,
  count,
}: {
  participants: any;
  count: number;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = React.useState(1);

  React.useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", currentPage.toString());
    replace(`${pathname}?${params.toString()}`);
  }, [currentPage]);

  return (
    <div>
      <Table
        className="text-foreground"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>Tên</TableColumn>
          <TableColumn>MSSV</TableColumn>
          <TableColumn>Thành tích</TableColumn>
          <TableColumn>Tổ chức</TableColumn>
          <TableColumn>Vai trò</TableColumn>
        </TableHeader>
        <TableBody>
          {participants?.map((participant: any) => {
            return (
              <TableRow key={participant.student_id}>
                <TableCell>{participant.name}</TableCell>
                <TableCell>{participant.student_id}</TableCell>
                <TableCell>{participant.achievement}</TableCell>
                <TableCell>{participant.reward_org}</TableCell>
                <TableCell>{participant.note}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination
        className="flex justify-center m-auto"
        showControls
        total={Math.ceil(count / 10)}
        initialPage={1}
        page={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
}
