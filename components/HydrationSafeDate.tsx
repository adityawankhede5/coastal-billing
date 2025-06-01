'use client'
import { useEffect, useState } from "react";

export default function HydrationSafeDate({ milliseconds, includeSeconds = false, detailed = false, timeOnly = false }: { milliseconds: number, includeSeconds?: boolean, detailed?: boolean, timeOnly?: boolean }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    const _date = new Date(milliseconds);
    let localDate = _date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, second: includeSeconds ? '2-digit' : undefined });
    if (detailed) {
      localDate = _date.toLocaleString('en-IN');
    } else if (timeOnly) {
      localDate = _date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    setDate(localDate);
  }, [milliseconds, detailed, includeSeconds, timeOnly]);
  return (
    <>{date}</>
  )
}