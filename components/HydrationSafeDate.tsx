'use client'
import { useEffect, useState } from "react";

export default function HydrationSafeDate({ milliseconds }: { milliseconds: number }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    const _date = new Date(milliseconds);
    const localDate = _date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    setDate(localDate);
  }, [milliseconds]);
  return (
    <>{date}</>
  )
}