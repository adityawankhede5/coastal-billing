export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="border-box h-full w-full">{children}</div>;
}
