'use client';
import BackspaceIcon from "@/assets/icons/Backspace.icon";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

export default function SearchInput({ onSearch }: { onSearch: (search: string) => void }) {
  const [query, setQuery] = useState("");
  const handleClearSearch = () => {
    setQuery("");
    debouncedSearch("");
  }
  const debouncedSearch = useCallback(debounce((value: string) => {
    onSearch(value);
  }, 500), [onSearch])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }
  return (
    <div className="flex-1 flex justify-center items-center relative">
      <input onChange={handleChange} value={query} type="text" className="flex-1 box-border shadow-none border border-solid border-gray-300 bg-white px-2 py-1.5 rounded-md" placeholder="Search item" />
      <div className="absolute right-2 top-1/2 -translate-y-1/2" onClick={handleClearSearch}>
        <BackspaceIcon className="text-gray-500" />
      </div>
    </div>
  )
} 