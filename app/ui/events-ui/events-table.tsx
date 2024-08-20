"use client";

import { formatDate } from "@/app/lib/utils";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

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

export default function EventsTable({
  events,
  count,
}: {
  events: any;
  count: number;
}) {
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
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
        onRowAction={(key) => push(`/dashboard/events/${key}`)}
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn>Mục</TableColumn>
          <TableColumn>Tên</TableColumn>
          <TableColumn>Ngày</TableColumn>
          <TableColumn>Cấp</TableColumn>
          <TableColumn>Trạng thái</TableColumn>
        </TableHeader>
        <TableBody>
          {events?.map((event: any) => {
            return (
              <TableRow key={event.id} className="cursor-pointer">
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>{formatDate(event.start_date)}</TableCell>
                <TableCell>{event.organization}</TableCell>
                <TableCell>{event.status ? "Duyệt" : "Chưa duyệt"}</TableCell>
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
