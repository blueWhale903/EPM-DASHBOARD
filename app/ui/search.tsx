"use client";

import React, { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import TextField from "@mui/material/TextField";

export default function Search({ query }: { query: string }) {
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    const text = e.target.value;
    if (text) {
      params.set(query, text);
    } else {
      params.delete(query);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextField
      id={query}
      label={"search by " + query}
      variant="filled"
      onChange={handleSearch}
      InputProps={{
        style: {
          borderRadius: 12,
        },
        disableUnderline: true,
      }}
    />
  );
}
