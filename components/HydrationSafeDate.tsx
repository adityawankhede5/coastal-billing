'use client'
import { useEffect, useState } from "react";

export default function HydrationSafeDate({ milliseconds, includeSeconds = false, detailed = false }: { milliseconds: number, includeSeconds?: boolean, detailed?: boolean }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    const _date = new Date(milliseconds);
    let localDate = _date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, second: includeSeconds ? '2-digit' : undefined });
    if (detailed) {
      localDate = _date.toLocaleString('en-IN');
    }
    setDate(localDate);
  }, [milliseconds]);
  return (
    <>{date}</>
  )
}