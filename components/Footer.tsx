import Link from "next/link";
import { CoupangBanner } from "@/components/CoupangBanner";
import { SisterSites } from "@/components/SisterSites";
import { BRAND_LINE, NAV, SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-stone/80">
      <CoupangBanner />
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm leading-6 text-muted">
        <p className="font-serif text-base text-ink">{SITE_NAME}</p>
        <p className="mt-1 text-xs tracking-wide text-terra">{BRAND_LINE}</p>
        <div className="mt-4 max-w-3xl space-y-2">
          <p>
            바이킹이야기의 글은 앵글로색슨 연대기, 생베르탱 연대기, 아일랜드 연대기, 두도, 원초 연대기, 스놀리와 삭소, 고고학 정리 같은 공개된 기록을 참고해 우리말로 다시 쓴 것입니다. 중세 문장이나 현대 책의 문장을 그대로 옮기지 않았고, 없는 말을 만들어 넣지 않았습니다.
          </p>
          <p>전설은 전설이라고 적습니다. 영화 제목과 상표는 각 권리자의 것입니다. 영화를 볼 수 있는 불법 사이트는 안내하지 않습니다.</p>
        </div>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <Link href="/" className="underline decoration-line underline-offset-4 hover:text-terra">
            홈
          </Link>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="underline decoration-line underline-offset-4 hover:text-terra">
              {item.label}
            </Link>
          ))}
        </nav>
        <SisterSites variant="footer" />
      </div>
    </footer>
  );
}
