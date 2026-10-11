import type { LinkItem } from "@/data/types";

export function Elsewhere({ links }: { links?: readonly LinkItem[] }) {
  if (!links?.length) return null;
  return (
    <nav aria-label="다른 사이트에서 더 보기" className="mt-3 rounded-md border border-line bg-bg px-3 py-2">
      <p className="text-[11px] tracking-[0.12em] text-terra">다른 사이트에서 더 보기</p>
      <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
