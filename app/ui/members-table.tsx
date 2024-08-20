"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { unstable_noStore } from "next/cache";
import { useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { UpdateMember, DeleteMember } from "./members/buttons";

export default function Page({
  members,
  count,
}: {
  members: any;
  count: number;
}) {
  unstable_noStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <div>
        <Table
          className="text-foreground"
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>MSSV</TableColumn>
            <TableColumn>Họ Tên</TableColumn>
            <TableColumn>Lớp</TableColumn>
            <TableColumn>Khoa</TableColumn>
            <TableColumn className=""> </TableColumn>
          </TableHeader>
          <TableBody>
            {members?.map((member: any) => {
              return (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.class_code}</TableCell>
                  <TableCell>{member.departments.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-3 justify-end">
                      <UpdateMember id={member.id}></UpdateMember>
                      <DeleteMember id={member.id}></DeleteMember>
                    </div>
                  </TableCell>
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
    </div>
  );
}
