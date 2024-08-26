"use client";

import DropdownFilter from "../filters/DropdownFilter";
import Search from "../filters/Search";
import DateFilter from "../filters/DateFilter";
import { useEffect, useState } from "react";
import { getCategories } from "@/app/lib/actions";

export default function EventsFilter() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const markCategory = await getCategories();
      const categories = markCategory.data.map(
        (e: { category: string }) => e.category
      );
      setCategories(categories);
    };
    fetchData();
  }, []);

  return (
    <div className="flex gap-2 flex-wrap items-center bg-white p-4 rounded-md shadow-md">
      <Search query="name" />
      <DropdownFilter
        filterName="category"
        values={categories}
        isMultiple={true}
      />
      <DropdownFilter
        filterName="schoolYear"
        values={["23-24", "22-23"]}
        isMultiple={false}
      />
      <DropdownFilter
        filterName="semester"
        values={["1", "2", "3"]}
        isMultiple={false}
      />
      <DropdownFilter
        filterName="status"
        values={["Confirmed", "Unconfirmed"]}
        isMultiple={false}
      />
      <DateFilter />
    </div>
  );
}
