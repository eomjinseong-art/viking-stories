import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CauseGrid } from "@/components/CauseGrid";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { chapters } from "@/data/chapters";
import { breadcrumbLd, itemListLd, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "연대기",
  description: "793년 린디스판부터 1066년 스탐퍼드 브리지와 헤이스팅스까지. 대군, 알프레드, 더블린, 노르망디, 루스, 빈란드, 크누트. 전승은 전승이라고 적습니다.",
  path: "/chronicle",
});

export default function ChroniclePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "연대기", path: "/chronicle" },
          ]),
          itemListLd(
            "바이킹 시대 연대기",
            "/chronicle",
            chapters.map((chapter) => ({ name: chapter.title, path: `/chronicle/${chapter.slug}` })),
          ),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "연대기" }]} />
      <PageHead
        kicker="CHRONICLE"
        title="연대기"
        lead="793년 린디스판부터 1066년까지입니다. 각 카드는 왜, 누구, 결과만 먼저 보여 줍니다. 라그나르의 집안은 사가의 묶음이라 연대기의 해와 한 줄로 잇지 않습니다. 1066년은 교과서에서 시대를 닫는 해이지, 노르드어와 정착지가 하루아침에 사라진 날은 아닙니다."
      />
      <ol className="mt-8 grid gap-4 lg:grid-cols-2">
        {chapters.map((chapter, index) => (
          <li key={chapter.slug} className="rounded-lg border border-line bg-card p-5">
            <p className="text-[11px] tracking-[0.16em] text-terra">
              {String(index + 1).padStart(2, "0")} · {chapter.en}
            </p>
            <h2 className="mt-1 font-serif text-2xl text-ink">
              <Link href={`/chronicle/${chapter.slug}`} className="hover:text-terra">
                {chapter.title}
              </Link>
            </h2>
            <p className="mt-1 text-xs text-muted">{chapter.years}</p>
            <p className="mt-2 text-sm leading-6">{chapter.summary}</p>
            <CauseGrid cause={chapter.cause} who={chapter.who} result={chapter.result} />
            <Link href={`/chronicle/${chapter.slug}`} className="mt-3 inline-block text-sm text-terra">
              세 가지 포인트와 조금만 더 →
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
