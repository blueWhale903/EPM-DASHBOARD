"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ query }: { query: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(query, term);
    } else {
      params.delete(query);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <Input
      classNames={{
        base: "max-w-full sm:max-w-[20rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      placeholder={`search by ${query}`}
      size="sm"
      defaultValue={searchParams.get(query)?.toString()}
      type="search"
    />
  );
}
