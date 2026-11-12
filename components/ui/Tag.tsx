export function TagList({ tags, label }: { tags: string[]; label?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-full border border-line-strong px-[14px] py-[7px] text-tag whitespace-nowrap"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
