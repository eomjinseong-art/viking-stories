import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Elsewhere } from "@/components/Elsewhere";
import { FamilyTreeView } from "@/components/FamilyTreeView";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { SisterStrip } from "@/components/SisterSites";
import { SourceList } from "@/components/SourceList";
import { TREES, focusHref, relationsOf } from "@/data/family-tree";
import type { RelationPerson } from "@/data/family-tree";
import { breadcrumbLd, itemListLd, jsonLd, pageMetadata } from "@/lib/seo";
import { GERMANIC_URL, OTHER_FAMILY_TREES } from "@/lib/site";

const description =
  "라그나르 전승, 덴마크 왕가, 노르망디(롤로에서 윌리엄), 웨섹스, 류리크 왕조, 북대서양. 칸을 누르면 혈연이 밝아집니다. 전승의 부모는 보라색 점선입니다.";

export const metadata = pageMetadata({
  title: "관계도",
  description,
  path: "/family-tree",
});

const linked = TREES.flatMap((tree) => tree.nodes.filter((node) => node.href && node.href.startsWith("/")));

export default function FamilyTreePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "관계도", path: "/family-tree" },
          ]),
          itemListLd(
            "관계도에 글이 있는 사람",
            "/family-tree",
            linked.map((node) => ({ name: `${node.ko} (${node.en})`, path: node.href! })),
          ),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "관계도" }]} />
      <PageHead
        kicker="RELATIONS"
        title="관계도"
        lead="누가 누구의 자녀인지, 누가 전승으로만 이어지는지를 그림으로 나눕니다. 금색 실선은 혈연, 금색 점선은 입양, 장미색은 배우자, 보라색 점선은 전승이 갈리거나 근거가 약한 부모입니다. 칸을 누르면 부모·배우자·자녀·형제가 밝아집니다."
      />
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
        라그나르의 아들들은 실선으로 잇지 않았습니다. 엠마는 덴마크 가계에만 있고, 에텔플레드는 에텔스탄의 어머니가 아닙니다. 프랑크 왕가의 앞 줄기는{" "}
        <a href={`${GERMANIC_URL}/family-tree?tree=franks&focus=charlemagne`} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" target="_blank" rel="noopener noreferrer">
          게르만이야기 관계도
        </a>
        에 있습니다.
      </p>
      <SisterStrip title="다른 가족관계도" en="Other family trees" links={OTHER_FAMILY_TREES} />
      <FamilyTreeView />

      {TREES.map((tree) => (
        <section key={tree.id} className="mt-12" aria-labelledby={`prose-${tree.id}`}>
          <h2 id={`prose-${tree.id}`} className="font-serif text-2xl text-ink">
            {tree.ko} <span className="text-sm font-sans tracking-wide text-muted">{tree.en}</span>
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{tree.lead}</p>
          {tree.bands.map((band) => (
            <section key={band.id} className="mt-8">
              <h3 className="font-serif text-xl" style={{ color: band.color }}>
                {band.ko} <span className="text-sm font-sans tracking-wide text-muted">{band.en}</span>
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted">{band.hint}</p>
              <ul className="mt-3 space-y-4">
                {band.nodeIds.map((id) => {
                  const node = tree.byId.get(id)!;
                  const rel = relationsOf(tree, id);
                  return (
                    <li key={id} className="border-b border-line/80 pb-3 text-sm leading-7">
                      <a href={focusHref(node.id)} className="font-serif text-base text-ink hover:text-terra">
                        {node.ko}
                      </a>
                      <span className="text-muted"> / {node.en}</span>
                      {node.years ? <span className="ml-2 text-terra">{node.years}</span> : null}
                      {node.href ? (
                        node.href.startsWith("http") ? (
                          <a href={node.href} className="ml-2 text-laurel" target="_blank" rel="noopener noreferrer">
                            {node.hrefLabel ?? "링크"}
                          </a>
                        ) : (
                          <Link href={node.href} className="ml-2 text-laurel">
                            {node.hrefLabel ?? "이 사이트의 글"}
                          </Link>
                        )
                      ) : null}
                      <span className="mt-0.5 block text-ink">{node.summary}</span>
                      {node.note ? <span className="mt-0.5 block text-xs leading-5 text-dusk">다른 이야기: {node.note}</span> : null}
                      {node.parentNote ? <span className="mt-0.5 block text-xs leading-5 text-muted">{node.parentNote}</span> : null}
                      <Elsewhere links={node.also} />
                      <span className="mt-1 block text-xs leading-5 text-muted">
                        <Kin label="부모" people={rel.parents} />
                        <Kin label="입양한 부모" people={rel.adoptiveParents} />
                        <Kin label="다른 전승의 부모" people={rel.variantParents} />
                        <Kin label="배우자" people={rel.spouses} />
                        <Kin label="자녀" people={rel.children} />
                        <Kin label="입양한 자녀" people={rel.adopted} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
          {tree.disputes.length ? (
            <div className="mt-8">
              <h3 className="font-serif text-xl text-ink">갈리는 이야기</h3>
              <ul className="mt-3 space-y-3">
                {tree.disputes.map((item) => (
                  <li key={item.id} className="rounded-md border border-line bg-card p-4 text-sm leading-7">
                    <h4 className="font-serif text-lg text-ink">{item.title}</h4>
                    <p className="mt-1">
                      <span className="text-terra">대표로 이은 선. </span>
                      {item.main}
                    </p>
                    <p className="mt-1">
                      <span className="text-dusk">같이 적어 둔 이야기. </span>
                      {item.other}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {tree.notes.length ? (
            <ul className="mt-6 space-y-2 text-sm leading-7 text-muted">
              {tree.notes.map((note) => (
                <li key={note.title}>
                  <span className="text-ink">{note.title}. </span>
                  {note.body}
                </li>
              ))}
            </ul>
          ) : null}
          <SourceList sources={tree.sources} />
        </section>
      ))}
    </div>
  );
}

function Kin({ label, people }: { label: string; people: RelationPerson[] }) {
  if (!people.length) return null;
  return (
    <span className="mr-3 inline">
      {label}{" "}
      {people.map((person, index) => (
        <span key={person.id}>
          {index > 0 ? ", " : null}
          <a href={focusHref(person.id)} className="text-laurel underline decoration-line underline-offset-2 hover:text-terra">
            {person.ko}
          </a>
        </span>
      ))}
    </span>
  );
}
