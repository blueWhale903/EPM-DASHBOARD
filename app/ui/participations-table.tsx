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
export default function Participations({
  data,
  count,
}: {
  data: any;
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
      <Table className="text-foreground w-full">
        <TableHeader>
          <TableColumn>Mục</TableColumn>
          <TableColumn>Hoạt động</TableColumn>
          <TableColumn>Thành tích</TableColumn>
          <TableColumn>Khen thưởng</TableColumn>
          <TableColumn>Ghi chú</TableColumn>
          <TableColumn>Điểm</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.map((data: any) => {
            return (
              <TableRow key={data.events.event_id}>
                <TableCell>{data.events.category}</TableCell>
                <TableCell>{data.events.name}</TableCell>
                <TableCell>{data.achievement}</TableCell>
                <TableCell>{data.reward_org}</TableCell>
                <TableCell>{data.note}</TableCell>
                <TableCell>{data.mark}</TableCell>
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
