"use client"

import { debounce } from "lodash";
import { useCallback, useState } from "react";

export default function SearchInput({ onSearch }: { onSearch: (value: string) => void }) {
  const [query, setQuery] = useState("");
  const debouncedSearch = useCallback(debounce((value: string) => {
    onSearch(value);
  }, 300), [onSearch]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }
  return <input value={query} type="text" placeholder="Search" onChange={handleChange} />;
}
