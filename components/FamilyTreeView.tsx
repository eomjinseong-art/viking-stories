"use client";

import Link from "next/link";
import { Elsewhere } from "@/components/Elsewhere";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  DEFAULT_TREE_ID,
  TREES,
  exactNodeId,
  getTree,
  relationsOf,
  searchNodes,
  treeByFocus,
  type LaidTree,
  type LayoutEdge,
  type LayoutNode,
} from "@/data/family-tree";

const GUEST = "#6f665b";
const GOLD = "#a6843d";
const ROSE = "#8c2f2b";
const PURPLE = "#6d4c8a";

function edgePaint(edge: LayoutEdge, active: boolean, dimming: boolean) {
  const spouse = edge.kind === "spouse";
  const variant = edge.kind === "variant-parent";
  const adoption = edge.kind === "adoption";
  const color = variant ? PURPLE : spouse ? ROSE : GOLD;
  let opacity = spouse ? (edge.local ? 0.92 : 0.28) : variant ? (edge.quiet ? 0.28 : 0.7) : edge.local ? 0.85 : edge.quiet ? 0.28 : 0.5;
  if (adoption && !dimming) opacity = 0.95;
  if (dimming) opacity = active ? 1 : 0.06;
  const dash = variant ? "5 4" : adoption ? "7 3 1.5 3" : spouse && !edge.local ? "5 4" : undefined;
  return { color, opacity, width: active ? 2.6 : adoption ? 1.8 : edge.local ? 1.7 : 1.2, dash };
}

function relatedSet(tree: LaidTree, id: string) {
  const rel = relationsOf(tree, id);
  const ids = new Set<string>([id]);
  for (const group of [
    rel.parents,
    rel.adoptiveParents,
    rel.variantParents,
    rel.spouses,
    rel.children,
    rel.adopted,
    rel.variantChildren,
    rel.siblings,
    rel.coAdopted,
  ]) {
    for (const person of group) ids.add(person.id);
  }
  return ids;
}

export function FamilyTreeView() {
  const [treeId, setTreeId] = useState(DEFAULT_TREE_ID);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [openSuggest, setOpenSuggest] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const listId = useId();
  const tree = getTree(treeId) ?? TREES[0];
  const exact = exactNodeId(query);
  const suggestions = exact || !query.trim() ? [] : searchNodes(query).slice(0, 8);
  const selectedNode = selected ? tree.byId.get(selected) : undefined;
  const related = useMemo(() => (selected && tree.byId.has(selected) ? relatedSet(tree, selected) : null), [selected, tree]);
  const relations = selected && tree.byId.has(selected) ? relationsOf(tree, selected) : null;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const focus = params.get("focus");
    const requested = params.get("tree");
    if (focus) {
      const id = exactNodeId(focus) ?? (searchNodes(focus).length === 1 ? searchNodes(focus)[0].id : null);
      const owner = id ? treeByFocus(id) : undefined;
      if (id && owner) {
        setTreeId(owner.id);
        setSelected(id);
        return;
      }
    }
    if (requested && getTree(requested)) setTreeId(requested);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`ft-${selected}`)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
      inline: "center",
    });
  }, [selected, treeId]);

  function writeUrl(nextTree: string, focus: string | null) {
    const url = new URL(window.location.href);
    url.searchParams.set("tree", nextTree);
    if (focus) url.searchParams.set("focus", focus);
    else url.searchParams.delete("focus");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  function choose(id: string, label?: string) {
    const owner = treeByFocus(id);
    if (!owner) return;
    setTreeId(owner.id);
    setSelected(id);
    setOpenSuggest(false);
    if (label) setQuery(label);
    writeUrl(owner.id, id);
  }

  function openTree(id: string) {
    setTreeId(id);
    setSelected(null);
    setQuery("");
    writeUrl(id, null);
    scroller.current?.scrollTo({ left: 0 });
  }

  function dismiss() {
    setSelected(null);
    writeUrl(tree.id, null);
  }

  function onQuery(value: string) {
    setQuery(value);
    setOpenSuggest(true);
    const id = exactNodeId(value);
    if (id) choose(id);
  }

  return (
    <div>
      <div className="mt-6 flex gap-1 overflow-x-auto pb-1" role="tablist" aria-label="가문">
        {TREES.map((item) => {
          const on = item.id === tree.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tree-tab-${item.id}`}
              aria-selected={on}
              aria-controls="family-tree-panel"
              className={`shrink-0 rounded-full px-3 py-2 text-sm ${on ? "bg-terra/10 font-semibold text-terra" : "text-muted hover:bg-stone hover:text-ink"}`}
              onClick={() => openTree(item.id)}
            >
              {item.ko}
              <span className={`ml-1.5 text-[10px] tracking-wide ${on ? "text-terra" : "text-muted"}`}>{item.en}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{tree.lead}</p>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <form
          className="relative w-full max-w-md"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            const id = exactNodeId(query) ?? suggestions[0]?.id;
            if (id) choose(id, treeByFocus(id)?.byId.get(id)?.ko);
          }}
        >
          <label htmlFor="tree-find" className="text-xs text-muted">
            이름 찾기 · Find
          </label>
          <input
            id="tree-find"
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            onFocus={() => setOpenSuggest(true)}
            placeholder="라그나르, 롤로, 알프레드, Alfred"
            aria-label="가족관계도에서 이름 찾기"
            aria-autocomplete="list"
            aria-controls={suggestions.length > 0 ? listId : undefined}
            className="mt-1 w-full rounded-full border border-line bg-card px-4 py-2 text-sm outline-none focus:border-terra"
          />
          {openSuggest && suggestions.length > 0 ? (
            <ul id={listId} role="listbox" className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-md border border-line bg-card py-1 shadow-lg">
              {suggestions.map((node) => (
                <li key={node.id} role="option" aria-selected={selected === node.id}>
                  <button
                    type="button"
                    className="flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-stone"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => choose(node.id, node.ko)}
                  >
                    <span className="font-serif text-ink">{node.ko}</span>
                    <span className="text-xs text-muted">
                      {node.en}
                      <span className="ml-1 text-[10px]">{node.treeKo}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </form>
        <div className="flex flex-wrap gap-2" aria-label="세대로 이동">
          {tree.bands.map((band) => (
            <button
              key={band.id}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1 text-xs text-ink hover:border-terra"
              onClick={() => {
                const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                document.getElementById(`band-${band.id}`)?.scrollIntoView({
                  behavior: reduce ? "auto" : "smooth",
                  block: "nearest",
                  inline: "start",
                });
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: band.color }} aria-hidden />
              {band.ko}
              <span className="text-[10px] tracking-wide text-muted">{band.en}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
        {tree.bands.map((band) => (
          <li key={band.id} className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: band.color }} aria-hidden />
            {band.ko}
            <span className="text-[10px] tracking-wide">{band.en}</span>
          </li>
        ))}
        <li className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-dashed" style={{ borderColor: GUEST }} aria-hidden />
          점선 칸 · 혈연으로 잇지 않은 사람
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="28" height="8" aria-hidden>
            <line x1="0" y1="4" x2="28" y2="4" stroke={GOLD} strokeWidth="2" />
          </svg>
          혈연 부모 → 자식
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="36" height="8" aria-hidden>
            <line x1="0" y1="4" x2="28" y2="4" stroke={GOLD} strokeWidth="2" strokeDasharray="5 2 1 2" />
            <rect x="30" y="1" width="6" height="6" fill="#fbf7f2" stroke={GOLD} transform="rotate(45 33 4)" />
          </svg>
          입양
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="28" height="8" aria-hidden>
            <line x1="0" y1="2" x2="28" y2="2" stroke={ROSE} strokeWidth="1.4" />
            <line x1="0" y1="6" x2="28" y2="6" stroke={ROSE} strokeWidth="1.4" />
          </svg>
          배우자·연인
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="28" height="8" aria-hidden>
            <line x1="0" y1="4" x2="28" y2="4" stroke={PURPLE} strokeWidth="1.6" strokeDasharray="4 3" />
          </svg>
          전승이 갈림
        </li>
      </ul>

      <div
        ref={scroller}
        id="family-tree-panel"
        role="tabpanel"
        aria-labelledby={`tree-tab-${tree.id}`}
        className="mt-3 cursor-grab overflow-x-auto overflow-y-hidden rounded-lg border border-line active:cursor-grabbing"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          const target = event.target as HTMLElement;
          if (target.closest("button, a, input")) return;
          const el = scroller.current;
          if (!el) return;
          drag.current = { x: event.clientX, left: el.scrollLeft };
          el.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current || !scroller.current) return;
          scroller.current.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div id="family-tree" className="relative mx-auto" style={{ width: tree.width, height: tree.height }}>
          {tree.bands.map((band) => (
            <div
              key={band.id}
              id={`band-${band.id}`}
              className="absolute left-0"
              style={{ top: band.top, height: band.height, width: tree.width, background: band.soft }}
            >
              <div className="sticky left-2 top-2 z-20 w-max rounded-full border border-white/80 bg-white/90 px-3 py-1 shadow-sm">
                <span className="font-serif text-sm" style={{ color: band.color }}>
                  {band.ko}
                </span>
                <span className="ml-2 text-[10px] tracking-[0.14em] text-muted">{band.en}</span>
              </div>
            </div>
          ))}
          <svg className="absolute inset-0 z-[1]" width={tree.width} height={tree.height} aria-hidden>
            {tree.edges.map((edge) => {
              const active = related ? related.has(edge.from) && related.has(edge.to) : false;
              const paint = edgePaint(edge, active, Boolean(related));
              const halo = related && !active ? 0 : 0.95;
              const labelOn = edge.kind === "adoption" && (!related || active);
              return (
                <g key={edge.id} fill="none" strokeLinecap="round">
                  <path d={edge.d} stroke="#fbf7f2" strokeWidth={paint.width + 2.4} strokeOpacity={halo} />
                  {edge.d2 ? <path d={edge.d2} stroke="#fbf7f2" strokeWidth={paint.width + 2.4} strokeOpacity={halo} /> : null}
                  <path d={edge.d} stroke={paint.color} strokeWidth={paint.width} strokeOpacity={paint.opacity} strokeDasharray={paint.dash} />
                  {edge.d2 ? (
                    <path d={edge.d2} stroke={paint.color} strokeWidth={paint.width} strokeOpacity={paint.opacity} strokeDasharray={paint.dash} />
                  ) : null}
                  {edge.kind === "adoption" && edge.mark ? (
                    <g opacity={labelOn ? 1 : 0.15}>
                      <rect
                        x={edge.mark.x - 4}
                        y={edge.mark.y - 4}
                        width="8"
                        height="8"
                        fill="#fbf7f2"
                        stroke={GOLD}
                        strokeWidth="1.3"
                        transform={`rotate(45 ${edge.mark.x} ${edge.mark.y})`}
                      />
                      {labelOn ? (
                        <text x={edge.mark.x + 8} y={edge.mark.y + 3} fill={GOLD} fontSize="10" stroke="#fbf7f2" strokeWidth="3" paintOrder="stroke">
                          입양
                        </text>
                      ) : null}
                    </g>
                  ) : null}
                </g>
              );
            })}
          </svg>
          {tree.nodes.map((node) => (
            <TreeCard
              key={node.id}
              node={node}
              color={tree.bands.find((band) => band.id === node.band)?.color ?? GOLD}
              pressed={selected === node.id}
              dimmed={Boolean(related && !related.has(node.id))}
              linked={Boolean(related && related.has(node.id) && selected !== node.id)}
              onSelect={() => choose(node.id)}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">옆으로 밀거나 드래그하면 가계도 전체가 보입니다. 칸을 누르면 부모, 입양, 배우자, 자녀, 형제가 밝아집니다.</p>

      {selectedNode && relations ? (
        <section
          aria-live="polite"
          className="fixed inset-x-3 bottom-3 z-40 max-h-[46vh] overflow-auto rounded-lg border border-line bg-card p-4 shadow-lg sm:inset-x-auto sm:right-4 sm:w-[26rem]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-[0.16em] text-terra">
                {tree.bands.find((band) => band.id === selectedNode.band)?.ko} · {tree.bands.find((band) => band.id === selectedNode.band)?.en}
              </p>
              <h2 className="font-serif text-2xl text-ink">{selectedNode.ko}</h2>
              <p className="text-sm text-muted">
                {selectedNode.latin ? `${selectedNode.latin} · ` : null}
                {selectedNode.en}
              </p>
              {selectedNode.years ? <p className="text-xs text-terra">{selectedNode.years}</p> : null}
            </div>
            <button type="button" className="rounded border border-line px-2 py-1 text-xs text-muted hover:text-ink" onClick={dismiss}>
              닫기
            </button>
          </div>
          <p className="mt-2 text-sm leading-6 text-ink">{selectedNode.summary}</p>
          {selectedNode.note ? <p className="mt-2 text-xs leading-5 text-dusk">다른 이야기: {selectedNode.note}</p> : null}
          <div className="mt-3 space-y-2 text-sm">
            <PeopleRow
              label="부모"
              people={relations.parents}
              empty={relations.parents.length || relations.variantParents.length || relations.adoptiveParents.length ? undefined : selectedNode.parentNote ?? "이 그림에는 없음"}
              onPick={choose}
            />
            <PeopleRow label="입양한 부모" people={relations.adoptiveParents} onPick={choose} />
            <PeopleRow label="다른 전승의 부모" people={relations.variantParents} onPick={choose} />
            <PeopleRow label="배우자·연인" people={relations.spouses} onPick={choose} />
            <PeopleRow label="자녀" people={relations.children} onPick={choose} />
            <PeopleRow label="입양한 자녀" people={relations.adopted} onPick={choose} />
            <PeopleRow label="다른 전승의 자녀" people={relations.variantChildren} onPick={choose} />
            <PeopleRow label="형제·자매" people={relations.siblings} onPick={choose} />
            <PeopleRow label="함께 입양된 사람" people={relations.coAdopted} onPick={choose} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedNode.href ? (
              <PersonAnchor href={selectedNode.href} className="rounded-full bg-terra px-3 py-1.5 text-sm text-white hover:bg-terra-deep">
                {selectedNode.hrefLabel ?? "이 사이트의 글"}
              </PersonAnchor>
            ) : null}
            <button type="button" className="rounded-full border border-line px-3 py-1.5 text-sm hover:border-terra" onClick={dismiss}>
              전체 가계도
            </button>
          </div>
          <Elsewhere links={selectedNode.also} />
        </section>
      ) : null}
    </div>
  );
}

function PeopleRow({
  label,
  people,
  empty,
  onPick,
}: {
  label: string;
  people: { id: string; ko: string; en: string }[];
  empty?: string;
  onPick: (id: string) => void;
}) {
  if (!people.length && !empty) return null;
  return (
    <div className="flex flex-wrap items-baseline gap-1.5">
      <span className="text-xs text-muted">{label}</span>
      {people.length ? (
        people.map((person) => (
          <button
            key={person.id}
            type="button"
            className="rounded-full border border-line bg-bg px-2 py-0.5 text-xs hover:border-terra"
            onClick={() => onPick(person.id)}
          >
            {person.ko}
            <span className="text-muted"> {person.en}</span>
          </button>
        ))
      ) : (
        <span className="text-xs text-muted">{empty}</span>
      )}
    </div>
  );
}

function TreeCard({
  node,
  color,
  pressed,
  dimmed,
  linked,
  onSelect,
}: {
  node: LayoutNode;
  color: string;
  pressed: boolean;
  dimmed: boolean;
  linked: boolean;
  onSelect: () => void;
}) {
  const border = node.guestTag ? GUEST : color;
  const reign = Boolean(node.years && /재위|정제|통치|카이사르/.test(node.years));
  return (
    <div
      id={`ft-${node.id}`}
      className="absolute z-10"
      style={{ left: node.x, top: node.y, width: node.w, height: node.h, opacity: dimmed ? 0.28 : 1, scrollMargin: "140px" }}
    >
      {node.badge ? (
        <span className="absolute -top-2 left-1 z-10 rounded-full bg-[#6d4c8a] px-1.5 py-0.5 text-[9px] leading-none text-white">다른 전승</span>
      ) : null}
      <button
        type="button"
        aria-pressed={pressed}
        onClick={onSelect}
        title={node.years ? `${node.ko} / ${node.en}. ${node.years}` : `${node.ko} / ${node.en}`}
        className={`flex h-full w-full flex-col items-center justify-center rounded-md border bg-white px-1 text-center ${node.href ? "pr-6" : ""}`}
        style={{
          borderColor: border,
          borderStyle: node.guestTag ? "dashed" : "solid",
          boxShadow: pressed ? "0 0 0 3px #a34732" : linked ? `0 0 0 2px ${border}` : undefined,
        }}
      >
        <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-white" style={{ background: border }}>
          {node.ko.replace(/[()\s]/g, "").slice(0, 1)}
        </span>
        <span className="mt-0.5 max-w-full truncate font-serif text-[12px] leading-4 text-ink">{node.ko}</span>
        <span className="max-w-full truncate text-[10px] leading-3 text-muted">{node.sub}</span>
        <span className={`max-w-full truncate px-0.5 text-[10px] leading-3 ${reign ? "text-terra" : "text-muted"}`}>{node.years || " "}</span>
      </button>
      {node.href ? (
        <PersonAnchor
          href={node.href}
          className="absolute bottom-1 right-1 z-10 rounded bg-white/90 px-1 text-[10px] leading-4 text-terra underline"
          aria-label={`${node.ko} ${node.hrefLabel ?? "이 사이트의 글"}`}
        >
          {node.hrefLabel ?? "글"}
        </PersonAnchor>
      ) : null}
    </div>
  );
}

function PersonAnchor({ href, className, children, ...rest }: { href: string; className?: string; children: React.ReactNode; "aria-label"?: string }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
