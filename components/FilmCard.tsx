import Link from "next/link";
import { filmsBySlugs } from "@/data/films";
import type { Film } from "@/data/types";

export function FilmCard({ film }: { film: Film }) {
  return (
    <li id={film.slug} className="scroll-mt-40 rounded-lg border border-line bg-card p-4">
      <p className="font-serif text-lg text-ink">
        「{film.titleKo}」
        <span className="ml-2 font-sans text-sm font-normal text-muted">
          {film.titleOriginal} · {film.year} · {film.kind}
        </span>
      </p>
      {film.netflixKr ? (
        <p className="mt-2">
          <span className="inline-block rounded-sm border border-terra/40 bg-terra/10 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-terra">
            넷플릭스 한국 · {film.netflixKr.checkedAt} 확인
          </span>
        </p>
      ) : null}
      <p className="mt-2 text-sm leading-7">{film.plot}</p>
      <p className="mt-2 text-sm leading-7 text-muted">{film.history}</p>
      {film.links.length ? (
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {film.links.map((link) =>
            link.href.startsWith("/") ? (
              <Link key={`${link.href}-${link.label}`} href={link.href} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
                {link.label}
              </Link>
            ) : (
              <a
                key={`${link.href}-${link.label}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
              >
                {link.label}
              </a>
            ),
          )}
        </p>
      ) : null}
    </li>
  );
}

export function RelatedFilms({ slugs }: { slugs?: readonly string[] }) {
  const list = filmsBySlugs(slugs ?? []);
  if (!list.length) return null;

  return (
    <section className="mt-10" aria-labelledby="related-films-heading">
      <h2 id="related-films-heading" className="font-serif text-2xl text-ink">
        관련 영화
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        아래 작품은 이 시대를 무대로 한 극이거나 그 이야기를 빌린 작품입니다. 분위기를 잡는 데는 도움이 되고, 사실 관계의 교과서는 아닙니다. 불법 영상 링크는 없습니다.
      </p>
      <ul className="mt-4 space-y-3">
        {list.map((film) => (
          <FilmCard key={film.slug} film={film} />
        ))}
      </ul>
      <Link href="/films" className="mt-3 inline-block text-sm text-terra">
        영화·드라마 전체 보기 →
      </Link>
    </section>
  );
}
