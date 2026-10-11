import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { RelatedLinks } from "@/components/RelatedLinks";
import { RouteMap } from "@/components/RouteMap";
import { breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "원정·정착 지도",
  description: "서쪽 바다의 영국·아일랜드·아이슬란드·그린란드·빈란드, 동쪽 강의 키예프와 비잔티움, 남쪽의 프랑크·노르망디. 시칠리아는 그 뒤의 노르만입니다.",
  path: "/map",
});

export default function MapPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "지도", path: "/map" },
          ]),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "지도" }]} />
      <PageHead
        kicker="ROUTES"
        title="원정·정착 지도"
        lead="손으로 그린 도식입니다. 해안선과 거리는 실제 지도가 아니고, 한 해의 국경도 아닙니다. 붉은 선은 바이킹 시대에 배가 오가던 방향이고, 보라 점선은 그 시대가 끝난 뒤 노르망디 후손이 남쪽으로 내려간 길입니다."
      />
      <RouteMap />
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-card p-5">
          <h2 className="font-serif text-xl text-ink">서쪽 바다</h2>
          <p className="mt-2 text-sm leading-7 text-muted">영국과 아일랜드, 그다음 아이슬란드와 그린란드, 그리고 빈란드. 약탈로 시작해 겨울을 나고 정착하는 길이 겹칩니다.</p>
        </div>
        <div className="rounded-lg border border-line bg-card p-5">
          <h2 className="font-serif text-xl text-ink">동쪽 강</h2>
          <p className="mt-2 text-sm leading-7 text-muted">발트 해에서 강을 타고 키예프를 지나 콘스탄티노폴리스까지. 교역과 용병, 그리고 루스의 군주가 같은 물길에 있습니다.</p>
        </div>
        <div className="rounded-lg border border-line bg-card p-5">
          <h2 className="font-serif text-xl text-ink">남쪽 해안</h2>
          <p className="mt-2 text-sm leading-7 text-muted">프랑크의 강과 파리, 911년 노르망디. 시칠리아는 11세기 노르만의 남하이지, 793년의 롱쉽 습격이 아닙니다.</p>
        </div>
      </section>
      <RelatedLinks
        links={[
          { href: "/chronicle/lindisfarne", label: "서쪽: 린디스판" },
          { href: "/chronicle/dublin", label: "서쪽: 더블린" },
          { href: "/chronicle/iceland-greenland", label: "서쪽: 아이슬란드·그린란드" },
          { href: "/chronicle/vinland", label: "서쪽: 빈란드" },
          { href: "/chronicle/rus-kyiv", label: "동쪽: 루스와 키예프" },
          { href: "/chronicle/varangian-guard", label: "동쪽: 바랑기안 근위대" },
          { href: "/chronicle/frankish-raids", label: "남쪽: 프랑크와 파리" },
          { href: "/chronicle/normandy", label: "남쪽: 노르망디와 시칠리아" },
        ]}
      />
    </div>
  );
}
