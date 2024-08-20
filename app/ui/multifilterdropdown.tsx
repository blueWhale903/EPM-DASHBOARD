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

export default function MultiFilterDropdown({
  options,
  filterName,
  multiple,
}: {
  options: any[];
  filterName: string;
  multiple: boolean;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const selectedValue = React.useMemo(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedKeys.size == 0) {
      params.delete(filterName);
      replace(`${pathname}?${params.toString()}`);
      return new Set([`${filterName}`]);
    }

    params.set(filterName, `${Array.from(selectedKeys).join(" ")}`);

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
        className="h-40 overflow-y-scroll"
        aria-label="Multiple selection example"
        variant="faded"
        closeOnSelect={false}
        selectionMode={multiple ? "multiple" : "single"}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {options.map((option: any) => {
          return <DropdownItem key={option}>{option}</DropdownItem>;
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
