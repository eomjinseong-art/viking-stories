import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideBlock } from "@/components/GuideBlock";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { RelatedLinks } from "@/components/RelatedLinks";
import { identitySections } from "@/data/identity";
import { breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";
import { GERMANIC_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "바이킹은 누구인가",
  description: "노르드인, 바이킹이라는 말, 스칸디나비아 게르만족, 왕과 야를과 팅, 롱쉽, 룬, 생활과 여성, 교역과 정착.",
  path: "/who",
});

export default function WhoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "바이킹", path: "/who" },
          ]),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "바이킹" }]} />
      <PageHead
        kicker="WHO"
        title="바이킹은 누구인가"
        lead="스칸디나비아와 그 정착지에서 노르드어를 쓰던 사람들입니다. 바이킹은 그 모두가 매일 쓰던 나라 이름이라기보다, 바다로 나가 약탈하거나 교역하던 일에 가까운 말입니다. 앞 세기의 게르만족과는 말의 사촌이고, 같은 날의 한 왕국은 아닙니다."
      />
      <div className="mt-8 space-y-6">
        {identitySections.map((section) => (
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
          { href: "/myth", label: "북유럽 신화 입문" },
          { href: "/map", label: "원정·정착 지도" },
          { href: "/chronicle", label: "연대기" },
          { href: `${GERMANIC_URL}/who`, label: "게르만이야기: 게르만족은 누구인가" },
          { href: `${GERMANIC_URL}/tribes#saxons`, label: "게르만이야기: 색슨" },
          { href: "https://nadoo-world.vercel.app/countries/no", label: "나두세계: 오늘의 노르웨이" },
          { href: "https://nadoo-world.vercel.app/countries/dk", label: "나두세계: 오늘의 덴마크" },
          { href: "https://nadoo-world.vercel.app/countries/se", label: "나두세계: 오늘의 스웨덴" },
          { href: "https://nadoo-world.vercel.app/countries/is", label: "나두세계: 오늘의 아이슬란드" },
        ]}
      />
    </div>
  );
}
