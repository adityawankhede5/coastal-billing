'use client'
import { useEffect, useState } from "react";

export default function HydrationSafeDate({ milliseconds, includeSeconds = false }: { milliseconds: number, includeSeconds?: boolean }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    const _date = new Date(milliseconds);
    const localDate = _date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, second: includeSeconds ? '2-digit' : undefined });
    setDate(localDate);
  }, [milliseconds]);
  return (
    <>{date}</>
  )
}