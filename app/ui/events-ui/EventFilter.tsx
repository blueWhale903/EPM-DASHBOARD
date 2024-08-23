import fetcher from "@/app/lib/fetcher";
import DropdownFilter from "../Buttons/dropdown-filter";
import Search from "../search";
import DateFilter from "../DateFilter";

export default async function EventsFilter() {
  const markCategory = await fetcher(`${process.env.API}/mark/categories`).then(
    (res) => res.json()
  );
  const categories = markCategory.data.map(
    (e: { category: string }) => e.category
  );
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
        values={["1.1", "1.2", "1.3"]}
        isMultiple={true}
      />
      <DropdownFilter
        filterName="semester"
        values={["1", "2", "3"]}
        isMultiple={true}
      />
      <DropdownFilter
        filterName="status"
        values={["Confirmed", "Unconfirmed"]}
        isMultiple={true}
      />
      <DateFilter />
    </div>
  );
}
