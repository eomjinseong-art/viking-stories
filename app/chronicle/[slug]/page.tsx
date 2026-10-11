import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CauseGrid } from "@/components/CauseGrid";
import { JsonLd } from "@/components/JsonLd";
import { KeyPoints } from "@/components/KeyPoints";
import { KindBadge } from "@/components/KindBadge";
import { More } from "@/components/More";
import { Pager } from "@/components/Pager";
import { RelatedFilms } from "@/components/FilmCard";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Rich } from "@/components/Rich";
import { SourceList } from "@/components/SourceList";
import { chapterBySlug, chapters } from "@/data/chapters";
import { articleLd, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = chapterBySlug(slug);
  if (!chapter) return {};
  return pageMetadata({
    title: `${chapter.title} (${chapter.en})`,
    description: `${chapter.title}(${chapter.years}). ${chapter.summary} ${chapter.result}`,
    path: `/chronicle/${chapter.slug}`,
    type: "article",
  });
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = chapterBySlug(slug);
  if (!chapter) notFound();
  const index = chapters.findIndex((item) => item.slug === chapter.slug);
  const prev = chapters[index - 1];
  const next = chapters[index + 1];
  const path = `/chronicle/${chapter.slug}`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "연대기", path: "/chronicle" },
            { name: chapter.title, path },
          ]),
          articleLd({ headline: chapter.title, description: chapter.summary, path, about: [chapter.en] }),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { href: "/chronicle", label: "연대기" }, { label: chapter.title }]} />
      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs tracking-[0.2em] text-terra">{chapter.en}</p>
          <KindBadge kind={chapter.kind} />
        </div>
        <h1 className="mt-1 font-serif text-3xl text-ink sm:text-4xl">{chapter.title}</h1>
        <p className="mt-2 text-sm text-muted">{chapter.years}</p>
        <p className="mt-3 text-base leading-8">
          <Rich text={chapter.summary} />
        </p>
      </header>
      <CauseGrid cause={chapter.cause} who={chapter.who} result={chapter.result} />
      <KeyPoints items={chapter.points} />
      {chapter.more?.length ? (
        <More>
          {chapter.more.map((paragraph) => (
            <p key={paragraph}>
              <Rich text={paragraph} />
            </p>
          ))}
        </More>
      ) : null}
      <RelatedLinks links={chapter.related} />
      {chapter.filmSlugs.length ? (
        <RelatedFilms slugs={chapter.filmSlugs} />
      ) : (
        <p className="mt-8 text-sm leading-7 text-muted">
          이 장을 사건 그대로 다룬 유명한 극은 목록에 넣지 않았습니다. 실제로 있는 작품만{" "}
          <Link href="/films" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
            영화·드라마
          </Link>
          에 모아 두었습니다.
        </p>
      )}
      <SourceList sources={chapter.sources} />
      <Pager
        prev={prev ? { href: `/chronicle/${prev.slug}`, label: prev.title } : undefined}
        next={next ? { href: `/chronicle/${next.slug}`, label: next.title } : undefined}
      />
    </article>
  );
}
