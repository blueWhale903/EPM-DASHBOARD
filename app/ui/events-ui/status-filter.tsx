"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function StatusFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const selectedValue = React.useMemo(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedKeys.size == 0) {
      params.delete("status");
      replace(`${pathname}?${params.toString()}`);
      return new Set(["status"]);
    }
    params.set("status", `${Array.from(selectedKeys).join(" ")}`);
    replace(`${pathname}?${params.toString()}`);

    return Array.from(selectedKeys).join(", ").replaceAll("_", " ");
  }, [selectedKeys]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="solid" className="capitalize bg-[#006fee] text-white">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="faded"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="Confirmed">Duyệt</DropdownItem>
        <DropdownItem key="Unconfirmed">Chưa duyệt</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
