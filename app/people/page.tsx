import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { KindBadge } from "@/components/KindBadge";
import { PageHead } from "@/components/PageHead";
import { people } from "@/data/people";
import type { PersonSide } from "@/data/types";
import { breadcrumbLd, itemListLd, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "인물",
  description: "라그나르와 라거타, 이바르와 비요른, 롤로, 알프레드, 에이릭과 레이프, 류릭과 올가와 블라디미르, 하랄드 푸른이, 크누트, 하랄드 하드라다, 정복왕 윌리엄.",
  path: "/people",
});

const GROUPS: { side: PersonSide; title: string; note: string }[] = [
  { side: "saga", title: "전승", note: "사가와 삭소가 묶은 이름입니다. 연대기의 지도자와 자동으로 같지 않습니다." },
  { side: "north", title: "북유럽", note: "덴마크와 노르웨이, 아이슬란드와 그린란드의 왕과 항해자." },
  { side: "west", title: "잉글랜드·노르망디", note: "웨섹스와 데인로, 그리고 롤로에서 이어진 노르망디." },
  { side: "east", title: "루스", note: "원초 연대기의 키예프 군주. 건국 이야기의 해는 연대기의 해입니다." },
];

export default function PeoplePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "인물", path: "/people" },
          ]),
          itemListLd(
            "바이킹이야기의 인물",
            "/people",
            people.map((person) => ({ name: person.nameKo, path: `/people/${person.slug}` })),
          ),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "인물" }]} />
      <PageHead
        kicker="PEOPLE"
        title="인물"
        lead={`이 사이트의 글을 잇는 ${people.length}명입니다. 스칸디나비아 왕의 전체 명단이 아닙니다. 전설 배지가 붙은 사람은 사가의 인물로 읽습니다.`}
      />
      {GROUPS.map((group) => {
        const list = people.filter((person) => person.side === group.side);
        return (
          <section key={group.side} className="mt-10" aria-labelledby={`side-${group.side}`}>
            <h2 id={`side-${group.side}`} className="font-serif text-2xl text-ink">
              {group.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{group.note}</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {list.map((person) => (
                <li key={person.slug} className="rounded-lg border border-line bg-card p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[11px] tracking-[0.16em] text-terra">{person.nameEn}</p>
                    <KindBadge kind={person.kind} />
                  </div>
                  <h3 className="mt-1 font-serif text-2xl text-ink">
                    <Link href={`/people/${person.slug}`} className="hover:text-terra">
                      {person.nameKo}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {person.role} · {person.years}
                  </p>
                  <p className="mt-2 text-sm leading-6">{person.summary}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
