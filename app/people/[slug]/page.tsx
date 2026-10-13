import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { KeyPoints } from "@/components/KeyPoints";
import { KindBadge } from "@/components/KindBadge";
import { More } from "@/components/More";
import { Pager } from "@/components/Pager";
import { RelatedFilms } from "@/components/FilmCard";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Rich } from "@/components/Rich";
import { SourceList } from "@/components/SourceList";
import { personTreeHref } from "@/data/family-tree";
import { people, personBySlug } from "@/data/people";
import type { PersonSide } from "@/data/types";
import { articleLd, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";
import { NadooHubPersonLink } from "@/components/NadooHubLink";

export function generateStaticParams() {
  return people.map((person) => ({ slug: person.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = personBySlug(slug);
  if (!person) return {};
  return pageMetadata({
    title: `${person.nameKo} (${person.nameEn})`,
    description: `${person.nameKo}, ${person.role}. ${person.years}. ${person.summary}`,
    path: `/people/${person.slug}`,
    type: "article",
  });
}

const SIDE: Record<PersonSide, string> = {
  saga: "전승",
  north: "북유럽",
  west: "잉글랜드·노르망디",
  east: "루스",
};

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = personBySlug(slug);
  if (!person) notFound();
  const index = people.findIndex((item) => item.slug === person.slug);
  const prev = people[index - 1];
  const next = people[index + 1];
  const path = `/people/${person.slug}`;
  const tree = personTreeHref(person.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "인물", path: "/people" },
            { name: person.nameKo, path },
          ]),
          articleLd({ headline: person.nameKo, description: person.summary, path, about: [person.nameEn, person.role] }),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { href: "/people", label: "인물" }, { label: person.nameKo }]} />
      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs tracking-[0.2em] text-terra">{person.nameEn}</p>
          <KindBadge kind={person.kind} />
        </div>
        <h1 className="mt-1 font-serif text-3xl text-ink sm:text-4xl">{person.nameKo}</h1>
        <p className="mt-2 text-sm text-muted">
          {SIDE[person.side]}
          {person.latin ? ` · ${person.latin}` : ""} · {person.role}
        </p>
        <p className="mt-1 text-sm text-terra">{person.years}</p>
        <p className="mt-3 text-base leading-8">
          <Rich text={person.summary} />
        </p>
      </header>
      <KeyPoints items={person.points} />
      {person.more?.length ? (
        <More>
          {person.more.map((paragraph) => (
            <p key={paragraph}>
              <Rich text={paragraph} />
            </p>
          ))}
        </More>
      ) : null}
      {tree ? (
        <p className="mt-4 text-sm">
          <Link href={tree} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
            관계도에서 이 사람 보기
          </Link>
        </p>
      ) : null}
      <RelatedLinks links={person.related} />
      {person.filmSlugs.length ? (
        <RelatedFilms slugs={person.filmSlugs} />
      ) : (
        <p className="mt-8 text-sm leading-7 text-muted">
          이 사람을 전기처럼 다룬 극은 목록에 없습니다.{" "}
          <Link href="/films" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
            영화·드라마
          </Link>
          는 확인된 작품만 적습니다.
        </p>
      )}
      <SourceList sources={person.sources} />
      <Pager
        prev={prev ? { href: `/people/${prev.slug}`, label: prev.nameKo } : undefined}
        next={next ? { href: `/people/${next.slug}`, label: next.nameKo } : undefined}
      />
      <NadooHubPersonLink base="https://viking-stories.vercel.app/people/" slug={person.slug!} />
    </article>
  );
}
