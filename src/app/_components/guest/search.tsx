"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Input from "../form-components/input";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      defaultValue={searchParams.get("search")?.toString()}
      label="Keresés"
      placeholder="Keresés..."
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  );
};

export default Search;
