import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideBlock } from "@/components/GuideBlock";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { RelatedLinks } from "@/components/RelatedLinks";
import { mythSections } from "@/data/myth";
import { breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";
import { MYTH_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "북유럽 신화",
  description: "오딘, 토르, 로키, 프레이야, 발할라, 라그나로크, 이그드라실. 13세기 에다의 이야기이고, 9세기의 경전으로 읽지 않습니다.",
  path: "/myth",
});

export default function MythPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "신화", path: "/myth" },
          ]),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "신화" }]} />
      <PageHead
        kicker="MYTH"
        title="북유럽 신화 입문"
        lead="오딘과 토르의 줄거리는 바이킹이 배에 싣고 다니던 경전이 아닙니다. 지금 읽는 이야기는 대개 13세기 아이슬란드에서 정리되었습니다. 나두신화에는 그리스·로마 신만 있어, 북유럽 신은 이 페이지에 둡니다."
      />
      <div className="mt-8 space-y-6">
        {mythSections.map((section) => (
          <GuideBlock
            key={section.id}
            id={section.id}
            en={section.en}
            title={section.title}
            summary={section.summary}
            points={section.points}
            more={section.more}
            kind={section.kind}
          />
        ))}
      </div>
      <RelatedLinks
        links={[
          { href: "/who#life", label: "생활과 신앙의 조각" },
          { href: "/films#thor-2011", label: "영화 토르" },
          { href: "/films#ragnarok-2020", label: "현대극 라그나로크" },
          { href: MYTH_URL, label: "나두신화에서 그리스·로마 신" },
        ]}
      />
    </div>
  );
}
