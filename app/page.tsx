import Link from "next/link";
import { CoupangBanner } from "@/components/CoupangBanner";
import { GermanicBridge } from "@/components/GermanicBridge";
import { JsonLd } from "@/components/JsonLd";
import { SisterSites } from "@/components/SisterSites";
import { chapters } from "@/data/chapters";
import { films } from "@/data/films";
import { people } from "@/data/people";
import { jsonLd, pageMetadata, websiteLd } from "@/lib/seo";
import { BRAND_LINE, GERMANIC_URL, HOME_SECTIONS, SITE_SUB, SITE_TAGLINE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "홈",
  description: `${SITE_TAGLINE}. ${SITE_SUB}`,
  path: "/",
});

const PATH = [
  { href: "/who", label: "노르드인과 ‘바이킹’이라는 말" },
  { href: "/who#germanic", label: "스칸디나비아 게르만족, 앞의 이야기" },
  { href: "/chronicle/lindisfarne", label: "793년 린디스판" },
  { href: "/chronicle/great-heathen-army", label: "대이교도 대군과 라그나르의 아들들" },
  { href: "/chronicle/alfred-edington", label: "에딩턴과 데인로" },
  { href: "/chronicle/normandy", label: "911년 롤로와 노르망디" },
  { href: "/chronicle/vinland", label: "레이프와 빈란드" },
  { href: "/chronicle/stamford-bridge", label: "1066년, 바이킹 시대의 끝" },
  { href: "/films", label: "영화와 드라마에서 역사와 다른 점" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-8">
      <JsonLd data={jsonLd([websiteLd(`${SITE_TAGLINE}. ${SITE_SUB}`)])} />
      <section className="py-12 text-center sm:py-16">
        <p className="text-xs tracking-[0.3em] text-terra">VIKING STORIES</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">바이킹이야기</h1>
        <p className="mt-4 text-lg text-muted">{SITE_TAGLINE}</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">{SITE_SUB}</p>
        <p className="mt-3 text-xs text-terra">{BRAND_LINE}</p>
        <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-muted">
          연대기 {chapters.length}장, 인물 {people.length}명, 영화·드라마 {films.length}편. 사가의 가문은 전설이라고 적고, 연대기의 해와 섞지 않습니다.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link href="/chronicle/lindisfarne" className="rounded-full bg-terra px-4 py-2 text-white hover:bg-terra-deep">
            린디스판부터 보기
          </Link>
          <a
            href={`${GERMANIC_URL}/people/charlemagne`}
            className="rounded-full border border-line bg-card px-4 py-2 hover:border-terra"
            target="_blank"
            rel="noopener noreferrer"
          >
            게르만이야기에서 카롤루스 대제
          </a>
        </div>
      </section>

      <div className="dentil opacity-50" aria-hidden />

      <section className="mt-10" aria-labelledby="door-heading">
        <h2 id="door-heading" className="font-serif text-2xl text-ink">
          세 개의 문
        </h2>
        <p className="mt-1 text-sm text-muted">약탈만 외우면 시대가 좁아집니다. 먼저 이 세 칸만 나누세요.</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Link href="/who" className="rounded-lg border border-line bg-card p-5 hover:border-terra">
            <p className="text-[11px] tracking-[0.16em] text-terra">WHO</p>
            <h3 className="mt-1 font-serif text-2xl text-ink">노르드인</h3>
            <p className="mt-1 text-xs text-muted">바이킹이라는 말</p>
            <p className="mt-3 text-sm leading-6 text-muted">한 민족의 국호가 아니라, 배를 타고 나간 일을 가리키는 말에 가깝습니다.</p>
          </Link>
          <Link href="/chronicle/lindisfarne" className="rounded-lg border border-line bg-card p-5 hover:border-terra">
            <p className="text-[11px] tracking-[0.16em] text-terra">793</p>
            <h3 className="mt-1 font-serif text-2xl text-ink">린디스판</h3>
            <p className="mt-1 text-xs text-muted">시대를 여는 이정표</p>
            <p className="mt-3 text-sm leading-6 text-muted">수도원의 습격이 연대기에 깊게 남았습니다. 첫 배였는지는 그 글이 단정하지 않습니다.</p>
          </Link>
          <Link href="/chronicle/stamford-bridge" className="rounded-lg border border-line bg-card p-5 hover:border-terra">
            <p className="text-[11px] tracking-[0.16em] text-terra">1066</p>
            <h3 className="mt-1 font-serif text-2xl text-ink">시대의 끝</h3>
            <p className="mt-1 text-xs text-muted">스탐퍼드 브리지 · 헤이스팅스</p>
            <p className="mt-3 text-sm leading-6 text-muted">하랄드 하드라다가 쓰러지고, 롤로의 후손 윌리엄이 잉글랜드의 왕이 됩니다.</p>
          </Link>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="menu-heading">
        <h2 id="menu-heading" className="font-serif text-2xl text-ink">
          모든 길
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {HOME_SECTIONS.map((section, index) => (
            <Link key={section.href} href={section.href} className="group rounded-lg border border-line bg-card p-5 transition hover:border-terra hover:shadow-sm">
              <p className="font-serif text-xs text-terra">
                {String(index + 1).padStart(2, "0")} · {section.en}
              </p>
              <h3 className="mt-1 font-serif text-xl text-ink group-hover:text-terra">{section.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{section.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl text-ink">처음 읽는 순서</h2>
          <ol className="mt-4 space-y-2 text-sm">
            {PATH.map((item, index) => (
              <li key={item.href}>
                <Link href={item.href} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
                  {index + 1}. {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <SisterSites variant="home" />
      </section>

      <div className="mt-12">
        <GermanicBridge />
      </div>
      <CoupangBanner />
    </div>
  );
}
