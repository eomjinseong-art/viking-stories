import Link from "next/link";
import { GERMANIC_URL, TIMELINE_URL } from "@/lib/site";

export function GermanicBridge({ id = "from-germanic" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-40 rounded-lg border border-line bg-card p-5 sm:p-6">
      <p className="text-[11px] tracking-[0.16em] text-terra">PREVIOUS · 앞의 이야기</p>
      <h2 id={`${id}-heading`} className="mt-1 font-serif text-2xl text-ink">
        앞의 이야기: 게르만
      </h2>
      <p className="mt-2 text-sm leading-7 text-ink">
        바이킹은 빈 하늘에서 나타나지 않습니다. 스칸디나비아의 노르드어는 게르만어의 북쪽 갈래이고, 잉글랜드의 앵글로색슨 왕국과 프랑크 왕국은 그 앞 세기에 이미 서 있었습니다. 카롤루스 대제의 작센 전쟁은 793년 린디스판의 원인이 아닙니다. 시간표가 이어질 뿐입니다.
      </p>
      <ul className="mt-4 flex flex-wrap gap-3 text-sm">
        <li>
          <a href={GERMANIC_URL} className="rounded-full bg-terra px-4 py-2 text-white hover:bg-terra-deep" target="_blank" rel="noopener noreferrer">
            게르만이야기 열기
          </a>
        </li>
        <li>
          <a
            href={`${GERMANIC_URL}/people/charlemagne`}
            className="inline-block rounded-full border border-line bg-bg px-4 py-2 hover:border-terra"
            target="_blank"
            rel="noopener noreferrer"
          >
            카롤루스 대제
          </a>
        </li>
        <li>
          <a
            href={`${GERMANIC_URL}/kingdoms`}
            className="inline-block rounded-full border border-line bg-bg px-4 py-2 hover:border-terra"
            target="_blank"
            rel="noopener noreferrer"
          >
            로마 이후의 게르만 왕국
          </a>
        </li>
        <li>
          <a
            href={`${GERMANIC_URL}/kingdoms/anglo-saxons`}
            className="inline-block rounded-full border border-line bg-bg px-4 py-2 hover:border-terra"
            target="_blank"
            rel="noopener noreferrer"
          >
            앵글로색슨 왕국
          </a>
        </li>
        <li>
          <a
            href={`${TIMELINE_URL}/events/lindisfarne`}
            className="inline-block rounded-full border border-line bg-bg px-4 py-2 hover:border-terra"
            target="_blank"
            rel="noopener noreferrer"
          >
            나두연표의 린디스판
          </a>
        </li>
        <li>
          <Link href="/chronicle/lindisfarne" className="inline-block rounded-full border border-line bg-bg px-4 py-2 hover:border-terra">
            이 사이트의 793년
          </Link>
        </li>
      </ul>
    </section>
  );
}
