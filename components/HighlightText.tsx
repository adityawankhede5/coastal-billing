export default function HighlightText({ text, query }: { text: string, query: string }) {
  if (!query) return <>{text}</>;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-blue-500 text-white">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}