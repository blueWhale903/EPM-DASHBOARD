"use client";

import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    sx: { borderRadius: "12px" },
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "fit",
    },
  },
};

const names = ["1.1", "1.2"];

function getStyles(name: string, selectedKey: string[], theme: Theme) {
  return {
    fontWeight:
      selectedKey.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DropdownFilter({
  filterName,
  values,
  isMultiple,
}: {
  filterName: string;
  values: string[];
  isMultiple: boolean;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const theme = useTheme();
  const [selectedKey, setSelectedKey] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedKey>) => {
    const {
      target: { value },
    } = event;
    const params = new URLSearchParams(searchParams);

    setSelectedKey(typeof value === "string" ? value.split(", ") : value);
    if (isMultiple) {
      params.set(filterName, `${Array.from(value).join(" ")}`);
    } else {
      params.set(filterName, `${value}`);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200, borderRadius: 12 }}>
        <InputLabel id="demo-multiple-name-label">{filterName}</InputLabel>
        <Select
          sx={{ borderRadius: 12 }}
          labelId={filterName}
          id={filterName}
          multiple={isMultiple}
          value={selectedKey}
          onChange={handleChange}
          input={<OutlinedInput label={filterName} />}
          MenuProps={MenuProps}
        >
          {values.map((value) => (
            <MenuItem
              key={value}
              value={value}
              style={getStyles(value, selectedKey, theme)}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
