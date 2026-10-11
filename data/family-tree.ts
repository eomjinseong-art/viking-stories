/**
 * 관계도.
 *
 * 선은 네 가지입니다.
 * - parent: 혈연의 부모 → 자식 (금색 실선)
 * - adoption: 입양 (금색 점선과 «입양» 표시)
 * - spouse: 배우자 (장미색)
 * - variant-parent: 전승이 갈리거나 근거가 약한 부모 (보라색 점선)
 *
 * 인물을 더할 때는 같은 가로줄의 col 간격을 1.2 이상으로 두고, 세대 간격은 210 전후로 둡니다.
 */

import type { LinkItem, Source } from "@/data/types";
import { personBySlug } from "@/data/people";
import { ALLOWED_SISTER_ORIGINS, CHOSEN_URL, GERMANIC_URL, ROME_URL, TIMELINE_URL } from "@/lib/site";

export type LinkKind = "parent" | "adoption" | "spouse" | "variant-parent";

export type TreeSeed = {
  id: string;
  ko: string;
  en: string;
  latin?: string;
  band: string;
  /** Horizontal slot. Same-row gap should stay ≥ 1.2. */
  col: number;
  y: number;
  years?: string;
  tag?: string;
  guestTag?: string;
  href?: string;
  hrefLabel?: string;
  also?: readonly LinkItem[];
  summary: string;
  note?: string;
  parentNote?: string;
  badge?: boolean;
  aliases?: string[];
};

export type TreeLink = { from: string; to: string; kind: LinkKind };

export type BandMeta = {
  id: string;
  ko: string;
  en: string;
  hint: string;
  color: string;
  soft: string;
};

export type NoteItem = { title: string; body: string };
export type DisputeItem = { id: string; title: string; main: string; other: string };

type TreeDef = {
  id: string;
  ko: string;
  en: string;
  lead: string;
  bands: BandMeta[];
  seeds: TreeSeed[];
  links: TreeLink[];
  disputes: DisputeItem[];
  notes: NoteItem[];
  sources: Source[];
  must: [LinkKind, string, string][];
};

const COL = 176;
const NODE_W = 156;
const NODE_H = 118;
const PAD = 28;

function rel(): {
  links: TreeLink[];
  parent: (from: string, to: string) => void;
  parents: (child: string, ...from: string[]) => void;
  adopt: (from: string, to: string) => void;
  spouse: (a: string, b: string) => void;
  variant: (from: string, to: string) => void;
} {
  const links: TreeLink[] = [];
  return {
    links,
    parent: (from, to) => links.push({ from, to, kind: "parent" }),
    parents: (child, ...from) => from.forEach((id) => links.push({ from: id, to: child, kind: "parent" })),
    adopt: (from, to) => links.push({ from, to, kind: "adoption" }),
    spouse: (a, b) => links.push({ from: a, to: b, kind: "spouse" }),
    variant: (from, to) => links.push({ from, to, kind: "variant-parent" }),
  };
}

const ragnarLinks = rel();
{
  const { spouse, variant } = ragnarLinks;
  spouse("ragnar", "lagertha");
  spouse("ragnar", "aslaug");
  for (const son of ["ivar", "bjorn", "hvitserk", "sigurd", "halfdan", "ubba"]) variant("ragnar", son);
}

const denmarkLinks = rel();
{
  const { parent, parents, spouse } = denmarkLinks;
  spouse("gorm", "thyra");
  parents("harald-bluetooth", "gorm", "thyra");
  parent("harald-bluetooth", "svein");
  parent("svein", "cnut");
  spouse("cnut", "emma");
  parent("cnut", "harefoot");
  parents("harthacnut", "cnut", "emma");
}

const normandyLinks = rel();
{
  const { parent, parents, spouse, variant } = normandyLinks;
  spouse("rollo", "poppa");
  parent("rollo", "william-longsword");
  variant("poppa", "william-longsword");
  parent("william-longsword", "richard1");
  parent("sprota", "richard1");
  spouse("richard1", "gunnor");
  parents("richard2", "richard1", "gunnor");
  spouse("richard2", "judith");
  parents("richard3", "richard2", "judith");
  parents("robert", "richard2", "judith");
  parent("robert", "william");
  parent("herleva", "william");
  spouse("william", "matilda");
}

const wessexLinks = rel();
{
  const { parent, parents, spouse, variant } = wessexLinks;
  spouse("alfred", "ealhswith");
  parents("edward", "alfred", "ealhswith");
  parents("aethelflaed", "alfred", "ealhswith");
  spouse("aethelflaed", "aethelred");
  parent("edward", "athelstan");
  variant("ecgwynn", "athelstan");
}

const rusLinks = rel();
{
  const { parent, parents, spouse, variant } = rusLinks;
  variant("rurik", "igor");
  spouse("igor", "olga");
  parents("sviatoslav", "igor", "olga");
  parents("vladimir", "sviatoslav", "malusha");
  spouse("vladimir", "anna");
  parent("vladimir", "yaroslav");
}

const atlanticLinks = rel();
{
  const { parent, parents, spouse, variant } = atlanticLinks;
  spouse("erik", "thjodhild");
  parents("leif", "erik", "thjodhild");
  variant("erik", "freydis");
}

const DEFS: TreeDef[] = [
  {
    id: "ragnar",
    ko: "라그나르 전승",
    en: "Ragnar",
    lead: "라그나르와 아들들의 혈연은 사가의 그림입니다. 실선으로 잇지 않고 보라색 점선만 둡니다. 이바르·할프단·우바는 연대기의 군 지도자이고, 아버지의 이름만 전승입니다.",
    bands: [
      { id: "elders", ko: "전승의 부부", en: "Legend", hint: "라거타와 아슬라우는 한 집의 동시 아내가 아닙니다. 이야기가 갈립니다.", color: "#6a4560", soft: "rgba(106,69,96,0.08)" },
      { id: "sons", ko: "아들로 묶인 이름", en: "Sons", hint: "점선은 ‘아들이라는 전승’입니다. 연대기가 확인해 준 혈연이 아닙니다.", color: "#a34732", soft: "rgba(163,71,50,0.08)" },
    ],
    seeds: [
      { id: "lagertha", ko: "라거타", en: "Lagertha", band: "elders", col: 0.4, y: 70, years: "전승", tag: "삭소", href: "/people/lagertha", summary: "삭소가 적은 라그나르의 첫 아내이자 여전사입니다. 당대 연대기에는 없습니다.", aliases: ["Lagertha"] },
      { id: "ragnar", ko: "라그나르", en: "Ragnar", latin: "Ragnar Lothbrok", band: "elders", col: 2.0, y: 70, years: "9세기 전승", tag: "사가", href: "/people/ragnar", summary: "털바지의 라그나르. 파리와 대군을 한 집안으로 묶는 전승의 중심입니다.", aliases: ["Ragnar Lothbrok", "로드브로크"] },
      { id: "aslaug", ko: "아슬라우", en: "Aslaug", band: "elders", col: 3.6, y: 70, years: "전승", tag: "크라카", badge: true, summary: "사가에서 라그나르의 아내이자 여러 아들의 어머니로 나오는 이름입니다. 별명 크라카. 역사의 비문은 없습니다.", note: "라거타와 같은 해의 한 살림으로 읽지 않습니다.", aliases: ["Kraka", "크라카"] },
      { id: "ivar", ko: "아이바르", en: "Ivar", band: "sons", col: 0, y: 290, years: "9세기", tag: "대군", badge: true, href: "/people/ivar", summary: "대군의 지도자. 뼈 없는 이라는 별명과 라그나르의 아들이라는 말은 사가입니다.", parentNote: "연대기는 아버지를 적지 않습니다." },
      { id: "bjorn", ko: "비요른", en: "Bjorn", band: "sons", col: 1.3, y: 290, years: "9세기", tag: "항로", badge: true, href: "/people/bjorn", summary: "지중해 원정의 베르노와 사가의 아이언사이드를 뒤에 겹쳐 부른 이름입니다." },
      { id: "hvitserk", ko: "흐비트세르크", en: "Hvitserk", band: "sons", col: 2.6, y: 290, years: "전승", tag: "사가", badge: true, summary: "흰 셔츠라는 별명의 아들로 사가에만 뚜렷합니다. 대군의 명단과 자동으로 같지 않습니다.", aliases: ["Hvitserk"] },
      { id: "sigurd", ko: "시구르드", en: "Sigurd", latin: "Snake-in-the-Eye", band: "sons", col: 3.9, y: 290, years: "전승", tag: "뱀의 눈", badge: true, summary: "눈의 뱀이라는 표식이 있는 아들로 사가가 적습니다. 덴마크 왕 시구르드 뱀눈과의 동일시는 전승입니다.", aliases: ["Sigurd Snake-in-the-Eye"] },
      { id: "halfdan", ko: "할프단", en: "Halfdan", band: "sons", col: 5.2, y: 290, years: "877년 무렵", tag: "노섬브리아", badge: true, href: "/people/halfdan", summary: "노섬브리아의 땅을 나눈 대군의 지도자입니다. 성 라그나르손은 후대가 붙였습니다." },
      { id: "ubba", ko: "우바", en: "Ubba", band: "sons", col: 6.5, y: 290, years: "878년?", tag: "대군", badge: true, href: "/people/ubba", summary: "대군과 연결되는 이름입니다. 878년 킨위트의 형제가 우바인지는 연대기가 확정하지 않습니다." },
    ],
    disputes: [
      { id: "sons", title: "아들 명단", main: "점선으로 여섯 이름을 라그나르 아래에 모아 두었습니다. 드라마가 그렇게 묶기 때문입니다.", other: "사가마다 어머니의 이름과 아들의 수가 다릅니다. 연대기는 이 혈연을 적지 않습니다." },
    ],
    notes: [{ title: "실선이 없는 이유", body: "아버지에서 아들로 금색 실선을 그으면, 전승이 역사처럼 보입니다. 이 가문만 일부러 점선입니다." }],
    sources: [{ work: "『라그나르의 사가』, 삭소", ref: "가족 이야기" }, { work: "앵글로색슨 연대기", ref: "이바르·할프단. 아버지 없음" }],
    links: ragnarLinks.links,
    must: [
      ["spouse", "ragnar", "lagertha"],
      ["variant-parent", "ragnar", "ivar"],
      ["variant-parent", "ragnar", "bjorn"],
      ["variant-parent", "ragnar", "ubba"],
    ],
  },
  {
    id: "denmark",
    ko: "덴마크 왕가",
    en: "Denmark",
    lead: "옐링의 돌이 고름·튀라·하랄드를 잇고, 연대기가 스벤과 크누트, 엠마를 잇습니다. 시그리드라는 전설의 왕비는 넣지 않았습니다.",
    bands: [
      { id: "gorm", ko: "고름", en: "Gorm", hint: "작은 룬 돌의 부모입니다.", color: "#2f4a3c", soft: "rgba(47,74,60,0.08)" },
      { id: "harald", ko: "푸른이", en: "Bluetooth", hint: "큰 돌의 주인공입니다.", color: "#a34732", soft: "rgba(163,71,50,0.08)" },
      { id: "svein", ko: "스벤", en: "Svein", hint: "잉글랜드 왕위는 그의 죽음으로 아들 대에 넘어갑니다.", color: "#6a4560", soft: "rgba(106,69,96,0.08)" },
      { id: "cnut", ko: "크누트와 엠마", en: "Cnut", hint: "엠마는 노르망디 리샤르 1세의 딸입니다. 노르망디 그림에는 칸을 두 번 두지 않았습니다.", color: "#a6843d", soft: "rgba(166,132,61,0.1)" },
      { id: "sons", ko: "아들", en: "Sons", hint: "토끼발의 어머니는 엠마가 아닙니다.", color: "#7d3324", soft: "rgba(125,51,36,0.06)" },
    ],
    seeds: [
      { id: "gorm", ko: "고름", en: "Gorm", band: "gorm", col: 1.6, y: 70, years: "10세기", tag: "옐링", href: "/people/gorm", summary: "하랄드가 돌에 아버지로 새긴 덴마크의 왕입니다." },
      { id: "thyra", ko: "튀라", en: "Thyra", band: "gorm", col: 3.2, y: 70, years: "10세기", tag: "옐링", summary: "같은 돌의 어머니입니다. 덴마크의 장식이라는 칭호가 있으나 그 뜻은 논의가 있습니다.", aliases: ["Thyra Danebod"] },
      { id: "harald-bluetooth", ko: "하랄드 푸른이", en: "Harald Bluetooth", band: "harald", col: 2.4, y: 280, years: "986년 무렵", tag: "개종", href: "/people/harald-bluetooth", summary: "덴마크인들을 기독교로 만들었다고 큰 돌에 새기게 한 왕입니다.", also: [{ href: `${CHOSEN_URL}/bible-books/acts`, label: "더 초즌 · 성경: 사도행전" }] },
      { id: "svein", ko: "스벤", en: "Svein", band: "svein", col: 2.4, y: 490, years: "1014년", tag: "포크비어드", href: "/people/svein", summary: "갈래 수염의 스벤. 크누트의 아버지이고, 잉글랜드 왕위는 잠시였습니다." },
      { id: "cnut", ko: "크누트", en: "Cnut", band: "cnut", col: 1.2, y: 700, years: "1016–1035", tag: "북해", href: "/people/cnut", summary: "잉글랜드와 덴마크의 왕. 북해 제국은 현대의 이름입니다." },
      { id: "emma", ko: "엠마", en: "Emma", band: "cnut", col: 2.8, y: 700, years: "1052년", tag: "노르망디", href: "/people/emma", summary: "리샤르 1세의 딸. 애설레드의 미망인이었다가 크누트의 왕비가 됩니다.", note: "참회왕 에드워드의 어머니이기도 합니다. 그 선은 이 덴마크 그림 밖에 둡니다." },
      { id: "harefoot", ko: "하랄드 토끼발", en: "Harold Harefoot", band: "sons", col: 0.4, y: 910, years: "1040년", tag: "잉글랜드", summary: "크누트와 노샘프턴의 앨프기푸의 아들로 전해집니다. 엠마의 아들이 아닙니다.", parentNote: "어머니는 이 그림에 없습니다." },
      { id: "harthacnut", ko: "하르트크누트", en: "Harthacnut", band: "sons", col: 2.8, y: 910, years: "1042년", tag: "덴마크", summary: "크누트와 엠마의 아들입니다. 그의 죽음 뒤 왕위는 참회왕 에드워드에게 갑니다." },
    ],
    disputes: [{ id: "svein-wife", title: "스벤의 아내", main: "아내 칸을 비워 두었습니다.", other: "폴란드 공녀와 사가의 시그리드를 같은 사람으로 볼지 갈립니다." }],
    notes: [{ title: "엠마", body: "노르망디 가계의 리샤르 1세가 그의 아버지입니다. 칸은 여기 한 번만 있습니다." }],
    sources: [{ work: "옐링 룬 돌" }, { work: "앵글로색슨 연대기", ref: "스벤, 크누트, 아들들" }],
    links: denmarkLinks.links,
    must: [
      ["parent", "gorm", "harald-bluetooth"],
      ["parent", "harald-bluetooth", "svein"],
      ["parent", "svein", "cnut"],
      ["spouse", "cnut", "emma"],
      ["parent", "emma", "harthacnut"],
    ],
  },
  {
    id: "normandy",
    ko: "노르망디",
    en: "Normandy",
    lead: "롤로에서 정복왕 윌리엄까지 공가의 줄기입니다. 포파의 어머니 자격은 점선입니다. 에를레브는 윌리엄의 어머니이지 로베르의 왕비가 아닙니다.",
    bands: [
      { id: "rollo", ko: "롤로", en: "Rollo", hint: "911년의 합의는 두도의 이야기입니다.", color: "#a34732", soft: "rgba(163,71,50,0.08)" },
      { id: "longsword", ko: "롱그스워드", en: "Longsword", hint: "942년에 죽습니다.", color: "#2f4a3c", soft: "rgba(47,74,60,0.08)" },
      { id: "richard1", ko: "리샤르 1세", en: "Richard I", hint: "군노르가 다음 세대의 어머니입니다. 엠마도 그의 딸이나 칸은 덴마크 쪽에 있습니다.", color: "#6a4560", soft: "rgba(106,69,96,0.08)" },
      { id: "richard2", ko: "리샤르 2세", en: "Richard II", hint: "유디트는 브르타뉴의 딸입니다.", color: "#a6843d", soft: "rgba(166,132,61,0.1)" },
      { id: "robert", ko: "로베르", en: "Robert", hint: "형 리샤르 3세가 먼저 죽고 로베르가 잇습니다. 에를레브와는 배우자 선을 긋지 않았습니다.", color: "#7d3324", soft: "rgba(125,51,36,0.06)" },
      { id: "william", ko: "윌리엄", en: "William", hint: "1066년의 왕. 약탈 선장이 아닙니다.", color: "#241c16", soft: "rgba(36,28,22,0.04)" },
    ],
    seeds: [
      { id: "rollo", ko: "롤로", en: "Rollo", band: "rollo", col: 1.6, y: 70, years: "911년", tag: "센 강", href: "/people/rollo", summary: "루앙 일대를 받은 바이킹 우두머리. 사가의 굉게르흐롤프와 같은지는 불확실합니다.", also: [{ href: `${GERMANIC_URL}/kingdoms/franks`, label: "게르만이야기: 프랑크" }] },
      { id: "poppa", ko: "포파", en: "Poppa", band: "rollo", col: 3.2, y: 70, years: "전승", tag: "두도", badge: true, summary: "두도가 롤로의 배우자로 적은 이름입니다. 교회의 아내였는지는 다툽니다." },
      { id: "william-longsword", ko: "기욤 롱그스워드", en: "William Longsword", band: "longsword", col: 1.6, y: 280, years: "942년", tag: "아들", href: "/people/william-longsword", summary: "롤로의 아들로 이어진 노르망디의 지배자입니다.", parentNote: "포파가 어머니인지는 점선입니다." },
      { id: "sprota", ko: "스프로타", en: "Sprota", band: "longsword", col: 3.2, y: 280, years: "10세기", tag: "모레 다니코", summary: "리샤르 1세의 어머니로 전합니다. 교회 결혼이 아닌 북방식 결합으로 적힙니다." },
      { id: "richard1", ko: "리샤르 1세", en: "Richard I", band: "richard1", col: 1.6, y: 490, years: "996년", tag: "공작", summary: "공포공 리샤르. 노르망디 공가를 굳힌 사람입니다. 딸 엠마는 덴마크 가계에 있습니다." },
      { id: "gunnor", ko: "군노르", en: "Gunnor", band: "richard1", col: 3.2, y: 490, years: "10세기", tag: "리샤르 2세의 어머니", summary: "리샤르 1세의 배우자로 리샤르 2세의 어머니가 됩니다." },
      { id: "richard2", ko: "리샤르 2세", en: "Richard II", band: "richard2", col: 0.6, y: 700, years: "1026년", tag: "공작", summary: "리샤르 3세와 로베르의 아버지입니다." },
      { id: "judith", ko: "유디트", en: "Judith", band: "richard2", col: 2.2, y: 700, years: "11세기", tag: "브르타뉴", summary: "브르타뉴의 유디트. 리샤르 3세와 로베르의 어머니로 전합니다.", aliases: ["Judith of Brittany"] },
      { id: "richard3", ko: "리샤르 3세", en: "Richard III", band: "robert", col: 0, y: 910, years: "1027년", tag: "짧은 재위", summary: "형이 먼저 공작이 되었다가 곧 죽습니다. 윌리엄의 아버지가 아닙니다." },
      { id: "robert", ko: "로베르", en: "Robert I", band: "robert", col: 1.6, y: 910, years: "1035년", tag: "공작", summary: "장엄공 로베르. 윌리엄의 아버지입니다. 에를레브와 결혼하지 않았습니다.", aliases: ["Robert the Magnificent"] },
      { id: "herleva", ko: "에를레브", en: "Herleva", band: "robert", col: 3.2, y: 910, years: "11세기", tag: "어머니", summary: "윌리엄의 어머니입니다. 교회의 공작 부인이 아니라 부모 선만 있습니다.", aliases: ["Herleva", "Arlette"] },
      { id: "william", ko: "윌리엄", en: "William", band: "william", col: 1.6, y: 1120, years: "1066–1087", tag: "정복왕", href: "/people/william", summary: "롤로의 후손인 노르망디 공작. 헤이스팅스의 승리자입니다." },
      { id: "matilda", ko: "마틸다", en: "Matilda", band: "william", col: 3.2, y: 1120, years: "1083년", tag: "플랑드르", summary: "플랑드르의 마틸다. 윌리엄의 아내입니다.", aliases: ["Matilda of Flanders"] },
    ],
    disputes: [
      { id: "poppa", title: "포파", main: "롤로에서 기욤으로 가는 부자 선은 실선, 포파에게서 가는 선은 점선입니다.", other: "두도는 포파를 어머니로 적습니다. 바이외의 포로였다는 말과 결혼의 형식은 확인이 약합니다." },
    ],
    notes: [
      { title: "엠마", body: "리샤르 1세의 딸 엠마는 덴마크 가계의 크누트 옆에 있습니다." },
      { title: "카롤루스", body: "911년의 땅은 단순왕 샤를의 합의로 전합니다. 카롤루스 대제가 준 땅이 아닙니다." },
    ],
    sources: [{ work: "두도 드 생캉탱", ref: "롤로와 포파" }, { work: "노르망 연대기", ref: "리샤르에서 윌리엄" }],
    links: normandyLinks.links,
    must: [
      ["parent", "rollo", "william-longsword"],
      ["variant-parent", "poppa", "william-longsword"],
      ["parent", "robert", "william"],
      ["parent", "herleva", "william"],
      ["spouse", "william", "matilda"],
    ],
  },
  {
    id: "wessex",
    ko: "웨섹스",
    en: "Wessex",
    lead: "알프레드에서 에드워드와 에텔플레드로, 에텔스탄은 에드워드의 아들입니다. 에텔플레드에게서 에텔스탄으로 가는 부모 선은 없습니다.",
    bands: [
      { id: "alfred", ko: "알프레드", en: "Alfred", hint: "878년 에딩턴의 왕.", color: "#2f4a3c", soft: "rgba(47,74,60,0.08)" },
      { id: "children", ko: "자녀", en: "Children", hint: "에텔플레드는 메르시아로 시집갑니다. 에크그윈은 에텔스탄의 어머니로만 점선입니다.", color: "#a34732", soft: "rgba(163,71,50,0.08)" },
      { id: "athelstan", ko: "에텔스탄", en: "Athelstan", hint: "937년 브루난버.", color: "#6a4560", soft: "rgba(106,69,96,0.08)" },
    ],
    seeds: [
      { id: "alfred", ko: "알프레드", en: "Alfred", band: "alfred", col: 2.0, y: 70, years: "849–899", tag: "웨섹스", href: "/people/alfred", summary: "에딩턴의 왕. 대왕은 후대의 존칭입니다.", also: [{ href: `${TIMELINE_URL}/events/alfred-edington`, label: "나두연표: 에딩턴" }, { href: `${GERMANIC_URL}/kingdoms/anglo-saxons`, label: "게르만이야기: 앵글로색슨" }] },
      { id: "ealhswith", ko: "에알스위스", en: "Ealhswith", band: "alfred", col: 3.6, y: 70, years: "9세기", tag: "왕비", summary: "알프레드의 아내. 에드워드와 에텔플레드의 어머니입니다.", aliases: ["Ealhswith"] },
      { id: "edward", ko: "에드워드", en: "Edward", band: "children", col: 0.6, y: 280, years: "924년", tag: "왕", href: "/people/edward", summary: "알프레드의 아들. 에텔스탄의 아버지입니다." },
      { id: "ecgwynn", ko: "에크그윈", en: "Ecgwynn", band: "children", col: 2.2, y: 280, years: "기록 짧음", tag: "점선", badge: true, summary: "에텔스탄의 어머니로 이름이 남았으나 지위는 거의 알려지지 않았습니다.", aliases: ["Ecgwynn"] },
      { id: "aethelflaed", ko: "에텔플레드", en: "Aethelflaed", band: "children", col: 4.0, y: 280, years: "918년", tag: "메르시아", href: "/people/aethelflaed", summary: "알프레드의 딸, 에드워드의 누이. 에텔스탄의 어머니가 아닙니다." },
      { id: "aethelred", ko: "애설레드", en: "Aethelred", band: "children", col: 5.6, y: 280, years: "911년", tag: "메르시아", summary: "메르시아의 영주. 에텔플레드의 남편입니다. 웨섹스의 애설레드 왕과 다른 사람입니다.", aliases: ["Aethelred of Mercia"] },
      { id: "athelstan", ko: "에텔스탄", en: "Athelstan", band: "athelstan", col: 1.4, y: 490, years: "939년", tag: "브루난버", href: "/people/athelstan", summary: "에드워드의 아들. 브루난버의 왕입니다.", parentNote: "에텔플레드의 아들이 아닙니다. 고모 집에서 자랐다는 전승만 있습니다." },
    ],
    disputes: [{ id: "ecgwynn", title: "에크그윈", main: "에드워드에서 에텔스탄으로 가는 선은 실선입니다.", other: "어머니의 신분과 결혼 여부는 기록이 짧아 점선입니다." }],
    notes: [{ title: "구스럼", body: "구스럼은 적의 왕입니다. 이 혈통에 넣지 않았습니다." }],
    sources: [{ work: "앵글로색슨 연대기" }, { work: "아세르", ref: "알프레드" }],
    links: wessexLinks.links,
    must: [
      ["parent", "alfred", "edward"],
      ["parent", "alfred", "aethelflaed"],
      ["parent", "edward", "athelstan"],
      ["spouse", "aethelflaed", "aethelred"],
    ],
  },
  {
    id: "rurikid",
    ko: "류리크 왕조",
    en: "Rurikids",
    lead: "원초 연대기의 계보입니다. 류릭에서 이고리로 가는 선만 점선입니다. 올렉은 섭정이라 혈연 칸이 아닙니다.",
    bands: [
      { id: "rurik", ko: "류릭", en: "Rurik", hint: "862년은 연대기의 해입니다.", color: "#6a4560", soft: "rgba(106,69,96,0.08)" },
      { id: "igor", ko: "이고리와 올가", en: "Igor", hint: "올가의 복수는 연대기의 문학적 장면이 섞입니다.", color: "#a34732", soft: "rgba(163,71,50,0.08)" },
      { id: "sviatoslav", ko: "스뱌토슬라프", en: "Sviatoslav", hint: "블라디미르의 어머니 말루샤는 공주가 아닙니다.", color: "#2f4a3c", soft: "rgba(47,74,60,0.08)" },
      { id: "vladimir", ko: "블라디미르", en: "Vladimir", hint: "안나는 왕비이지 야로슬라프의 어머니가 아닙니다.", color: "#a6843d", soft: "rgba(166,132,61,0.1)" },
      { id: "yaroslav", ko: "야로슬라프", en: "Yaroslav", hint: "현자라는 별명은 후대입니다.", color: "#7d3324", soft: "rgba(125,51,36,0.06)" },
    ],
    seeds: [
      { id: "rurik", ko: "류릭", en: "Rurik", band: "rurik", col: 1.0, y: 70, years: "862년 전승", tag: "연대기", href: "/people/rurik", badge: true, summary: "초청받았다는 시조. 건국 이야기의 인물입니다." },
      { id: "oleg", ko: "올렉", en: "Oleg", band: "rurik", col: 3.0, y: 70, years: "10세기 초", guestTag: "섭정", summary: "연대기의 섭정입니다. 류릭의 아들도 이고리의 아버지도 아닙니다.", aliases: ["Oleg the Seer"] },
      { id: "igor", ko: "이고리", en: "Igor", band: "igor", col: 1.0, y: 280, years: "945년 무렵", tag: "키예프", badge: true, summary: "올가의 남편. 드레블리안족에게 죽었다고 전합니다. 류릭의 아들이라는 계보는 간격이 넓습니다.", parentNote: "류릭과의 혈연은 점선입니다." },
      { id: "olga", ko: "올가", en: "Olga", band: "igor", col: 2.6, y: 280, years: "969년", tag: "섭정", href: "/people/olga", summary: "이고리의 아내, 스뱌토슬라프의 어머니. 콘스탄티노폴리스에서 세례를 받습니다.", also: [{ href: `${ROME_URL}/rulers/constantine`, label: "로마이야기: 콘스탄티누스" }] },
      { id: "sviatoslav", ko: "스뱌토슬라프", en: "Sviatoslav", band: "sviatoslav", col: 1.0, y: 490, years: "972년", tag: "원정", href: "/people/sviatoslav", summary: "올가의 아들, 블라디미르의 아버지. 옛 신앙에 남았습니다." },
      { id: "malusha", ko: "말루샤", en: "Malusha", band: "sviatoslav", col: 2.8, y: 490, years: "10세기", tag: "어머니", summary: "블라디미르의 어머니로 전하는 사람입니다. 올가의 집 살림 쪽이지 공주의 결혼이 아닙니다.", aliases: ["Malusha"] },
      { id: "vladimir", ko: "블라디미르", en: "Vladimir", band: "vladimir", col: 1.4, y: 700, years: "1015년", tag: "세례", href: "/people/vladimir", summary: "키예프의 군주. 988년 무렵 기독교를 받습니다.", also: [{ href: `${ROME_URL}/rulers/constantine`, label: "로마이야기: 그 도시의 시작" }] },
      { id: "anna", ko: "안나", en: "Anna", band: "vladimir", col: 3.2, y: 700, years: "1011년 무렵", tag: "비잔티움", summary: "바실리오스 2세의 누이로 전하는 왕비입니다. 야로슬라프의 어머니가 아닙니다.", aliases: ["Anna Porphyrogenita"] },
      { id: "yaroslav", ko: "야로슬라프", en: "Yaroslav", band: "yaroslav", col: 1.4, y: 910, years: "1054년", tag: "현자", href: "/people/yaroslav", summary: "블라디미르의 아들. 어머니의 이름은 로그네다로 전하는 설이 많아 이 그림에는 어머니 칸을 넣지 않았습니다.", parentNote: "안나에게서 가는 부모 선은 없습니다." },
    ],
    disputes: [{ id: "rurik-igor", title: "류릭과 이고리", main: "점선 하나입니다.", other: "연대기는 부자로 적지만, 879년과 이고리의 활동 사이가 길어 사서가 메운 계보일 수 있습니다." }],
    notes: [{ title: "올렉", body: "점선 테두리의 칸입니다. 혈연 선이 없습니다." }],
    sources: [{ work: "원초 연대기", ref: "12세기 편찬" }],
    links: rusLinks.links,
    must: [
      ["variant-parent", "rurik", "igor"],
      ["parent", "olga", "sviatoslav"],
      ["parent", "sviatoslav", "vladimir"],
      ["parent", "vladimir", "yaroslav"],
      ["spouse", "vladimir", "anna"],
    ],
  },
  {
    id: "atlantic",
    ko: "북대서양",
    en: "Atlantic",
    lead: "에이릭과 레이프는 사가의 부자이고, 그린란드 정착은 고고학이 받칩니다. 프레이디스는 사가의 딸이라 점선입니다.",
    bands: [
      { id: "erik", ko: "에이릭", en: "Erik", hint: "그린란드로 사람들을 데려갑니다.", color: "#2f4a3c", soft: "rgba(47,74,60,0.08)" },
      { id: "children", ko: "자녀", en: "Children", hint: "레이프의 어머니는 사가에서 티오드힐드입니다.", color: "#a34732", soft: "rgba(163,71,50,0.08)" },
    ],
    seeds: [
      { id: "erik", ko: "에이릭", en: "Erik the Red", band: "erik", col: 1.2, y: 70, years: "10세기", tag: "그린란드", href: "/people/erik", summary: "추방된 뒤 그린란드 정착을 이끈 사람입니다.", aliases: ["Erik the Red", "붉은 에이릭"] },
      { id: "thjodhild", ko: "티오드힐드", en: "Thjodhild", band: "erik", col: 2.8, y: 70, years: "10세기", tag: "교회", summary: "사가에서 에이릭의 아내이고 레이프의 어머니입니다. 그린란드에 교회를 세웠다고 전합니다.", aliases: ["Thjodhild"] },
      { id: "leif", ko: "레이프", en: "Leif", band: "children", col: 0.8, y: 280, years: "1000년 무렵", tag: "빈란드", href: "/people/leif", summary: "사가의 빈란드 항해자. 랑스 오 메도즈의 명패는 아닙니다.", aliases: ["Leif Erikson"] },
      { id: "freydis", ko: "프레이디스", en: "Freydis", band: "children", col: 2.4, y: 280, years: "사가", tag: "점선", badge: true, summary: "에이릭의 딸로 사가에 나오는 이름입니다. 빈란드에서의 폭력은 이야기마다 다르고, 어머니도 티오드힐드와 다르게 적힙니다.", parentNote: "어머니 선은 긋지 않았습니다.", aliases: ["Freydis"] },
    ],
    disputes: [{ id: "freydis", title: "프레이디스", main: "아버지에게서만 점선입니다.", other: "두 사가가 그의 빈란드 여행을 다르게 적습니다." }],
    notes: [{ title: "유적", body: "랑스 오 메도즈는 노르드인의 자리이지, 이 가계도의 집 주소는 아닙니다." }],
    sources: [{ work: "『에이릭의 사가』, 『그린란드인의 사가』" }],
    links: atlanticLinks.links,
    must: [
      ["parent", "erik", "leif"],
      ["parent", "thjodhild", "leif"],
      ["variant-parent", "erik", "freydis"],
    ],
  },
];

export type LayoutNode = TreeSeed & {
  x: number;
  y: number;
  w: number;
  h: number;
  sub: string;
  href?: string;
  keys: string[];
};

export type LayoutEdge = {
  id: string;
  d: string;
  d2?: string;
  kind: LinkKind;
  from: string;
  to: string;
  local: boolean;
  quiet: boolean;
  mark?: { x: number; y: number };
};

export type LayoutBand = BandMeta & {
  top: number;
  height: number;
  nodeIds: string[];
};

export type LaidTree = {
  id: string;
  ko: string;
  en: string;
  lead: string;
  disputes: DisputeItem[];
  notes: NoteItem[];
  sources: Source[];
  links: TreeLink[];
  width: number;
  height: number;
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  bands: LayoutBand[];
  byId: Map<string, LayoutNode>;
};

type Box = { id: string; x: number; y: number; w: number; h: number; cx: number; cy: number };

function subLine(seed: TreeSeed) {
  return [seed.tag, seed.guestTag, seed.en].filter(Boolean).join(" · ");
}

function placeNodes(def: TreeDef) {
  const cols = def.seeds.map((seed) => seed.col);
  const min = Math.min(...cols);
  const max = Math.max(...cols);
  const width = (max - min) * COL + NODE_W + PAD * 2;
  const nodes: LayoutNode[] = def.seeds.map((seed) => {
    const keys = [seed.ko, seed.en, seed.latin, seed.id, seed.tag, ...(seed.aliases ?? [])].filter((key): key is string => Boolean(key));
    return {
      ...seed,
      x: PAD + (seed.col - min) * COL,
      w: NODE_W,
      h: NODE_H,
      sub: subLine(seed),
      keys,
    };
  });
  const height = Math.max(...nodes.map((node) => node.y + node.h)) + 36;
  return { nodes, width, height };
}

function boxes(nodes: LayoutNode[]): Box[] {
  return nodes.map((node) => ({
    id: node.id,
    x: node.x,
    y: node.y,
    w: node.w,
    h: node.h,
    cx: node.x + node.w / 2,
    cy: node.y + node.h / 2,
  }));
}

function directedPath(from: Box, to: Box, kind: LinkKind): { d: string; mark: { x: number; y: number } } {
  const downward = from.cy <= to.cy;
  const x1 = from.cx;
  const y1 = downward ? from.y + from.h : from.y;
  const x2 = to.cx;
  const y2 = downward ? to.y : to.y + to.h;
  const sameRow = Math.abs(from.cy - to.cy) < 24;
  if (sameRow && kind === "variant-parent") {
    const left = Math.min(x1, x2);
    const right = Math.max(x1, x2);
    const y = Math.min(from.y, to.y);
    const mx = (left + right) / 2;
    const my = y - 26;
    return { d: `M ${left} ${y} Q ${mx} ${my}, ${right} ${y}`, mark: { x: mx, y: (y + my) / 2 } };
  }
  if (sameRow) {
    const yb = from.y + from.h;
    const drop = 14;
    const mx = (x1 + x2) / 2;
    return { d: `M ${x1} ${yb} Q ${mx} ${yb + drop}, ${x2} ${yb}`, mark: { x: mx, y: yb + drop } };
  }
  if (Math.abs(x1 - x2) < 6) return { d: `M ${x1} ${y1} V ${y2}`, mark: { x: x1, y: (y1 + y2) / 2 } };
  const mid = (y1 + y2) / 2;
  return {
    d: `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`,
    mark: { x: (x1 + x2) / 2, y: (y1 + y2) / 2 },
  };
}

function spousePath(a: Box, b: Box): { d: string; d2?: string } {
  const left = a.cx <= b.cx ? a : b;
  const right = a.cx <= b.cx ? b : a;
  const x1 = left.x + left.w;
  const x2 = right.x;
  const gap = x2 - x1;
  if (Math.abs(a.cy - b.cy) < 24 && gap < COL * 0.75) {
    const y = (left.cy + right.cy) / 2;
    return { d: `M ${x1} ${y - 2.5} H ${x2}`, d2: `M ${x1} ${y + 2.5} H ${x2}` };
  }
  if (Math.abs(a.cy - b.cy) < 24) {
    const y = left.y;
    const mid = (left.cx + right.cx) / 2;
    const lift = Math.min(34, 16 + Math.abs(right.cx - left.cx) * 0.04);
    return { d: `M ${left.cx} ${y} Q ${mid} ${y - lift}, ${right.cx} ${y}` };
  }
  const upper = a.cy <= b.cy ? a : b;
  const lower = a.cy <= b.cy ? b : a;
  const mid = (upper.y + upper.h + lower.y) / 2;
  const bow = upper.cx <= lower.cx ? 28 : -28;
  return { d: `M ${upper.cx} ${upper.y + upper.h} C ${upper.cx + bow} ${mid}, ${lower.cx + bow} ${mid}, ${lower.cx} ${lower.y}` };
}

function edgePaths(nodes: LayoutNode[], links: TreeLink[]): LayoutEdge[] {
  const box = new Map(boxes(nodes).map((item) => [item.id, item]));
  return links.map((link) => {
    const from = box.get(link.from);
    const to = box.get(link.to);
    if (!from || !to) throw new Error(`가족관계도 선 오류: ${link.kind} ${link.from} → ${link.to}`);
    const path = link.kind === "spouse" ? spousePath(from, to) : directedPath(from, to, link.kind);
    const dx = Math.abs(from.cx - to.cx);
    const dy = Math.abs(from.cy - to.cy);
    const local = link.kind === "spouse" ? dx < COL * 1.6 && dy < NODE_H * 1.4 : dx < COL * 2.2 && dy < 280;
    const downward = from.cy <= to.cy;
    const child = downward ? to : from;
    const mark =
      link.kind === "adoption" && Math.abs(from.cy - to.cy) >= 24
        ? { x: child.cx, y: downward ? child.y - 14 : child.y + child.h + 14 }
        : "mark" in path
          ? path.mark
          : undefined;
    return {
      id: `${link.kind}-${link.from}-${link.to}`,
      d: path.d,
      d2: "d2" in path ? path.d2 : undefined,
      kind: link.kind,
      from: link.from,
      to: link.to,
      local,
      quiet: Math.hypot(dx, dy) > 640,
      mark,
    };
  });
}

function buildBands(def: TreeDef, nodes: LayoutNode[]): LayoutBand[] {
  return def.bands.map((meta) => {
    const group = nodes.filter((node) => node.band === meta.id).sort((a, b) => a.y - b.y || a.x - b.x);
    if (!group.length) throw new Error(`빈 세대: ${def.id} ${meta.id}`);
    const top = Math.min(...group.map((node) => node.y)) - 52;
    const bottom = Math.max(...group.map((node) => node.y + node.h)) + 18;
    return { ...meta, top, height: bottom - top, nodeIds: group.map((node) => node.id) };
  });
}

function assertLayout(def: TreeDef, nodes: LayoutNode[], bands: LayoutBand[]) {
  const ids = new Set<string>();
  for (const node of nodes) {
    if (ids.has(node.id)) throw new Error(`가족관계도 id 중복: ${def.id} ${node.id}`);
    ids.add(node.id);
    if (!def.bands.some((band) => band.id === node.band)) throw new Error(`없는 세대: ${def.id} ${node.id}`);
  }
  for (const link of def.links) {
    if (!ids.has(link.from) || !ids.has(link.to)) throw new Error(`가족관계도 선 오류: ${def.id} ${link.kind} ${link.from} → ${link.to}`);
  }
  const seen = new Set<string>();
  for (const link of def.links) {
    const key = `${link.kind}:${link.from}:${link.to}`;
    if (seen.has(key)) throw new Error(`중복 선: ${def.id} ${key}`);
    seen.add(key);
  }
  for (const [kind, from, to] of def.must) {
    const found = def.links.some((link) => {
      if (link.kind !== kind) return false;
      if (link.from === from && link.to === to) return true;
      return kind === "spouse" && link.from === to && link.to === from;
    });
    if (!found) throw new Error(`${def.id}에 없는 관계: ${kind} ${from} → ${to}`);
  }
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (overlapX > 2 && overlapY > 2) throw new Error(`가족관계도 칸이 겹칩니다: ${def.id} ${a.id} · ${b.id}`);
    }
  }
  for (let i = 1; i < bands.length; i += 1) {
    const gap = bands[i].top - (bands[i - 1].top + bands[i - 1].height);
    if (gap < 12) throw new Error(`세대 간격이 좁습니다: ${def.id} ${bands[i - 1].id} → ${bands[i].id} (${gap})`);
  }
}

function layoutTree(def: TreeDef): LaidTree {
  const placed = placeNodes(def);
  const bands = buildBands(def, placed.nodes);
  assertLayout(def, placed.nodes, bands);
  return {
    id: def.id,
    ko: def.ko,
    en: def.en,
    lead: def.lead,
    disputes: def.disputes,
    notes: def.notes,
    sources: def.sources,
    links: def.links,
    width: placed.width,
    height: placed.height,
    nodes: placed.nodes,
    edges: edgePaths(placed.nodes, def.links),
    bands,
    byId: new Map(placed.nodes.map((node) => [node.id, node])),
  };
}

export const TREES: LaidTree[] = DEFS.map(layoutTree);

const treeById = new Map(TREES.map((tree) => [tree.id, tree]));
const nodeOwner = new Map<string, LaidTree>();
for (const tree of TREES) {
  for (const node of tree.nodes) {
    if (nodeOwner.has(node.id)) throw new Error(`가문 사이 id 중복: ${node.id}`);
    nodeOwner.set(node.id, tree);
  }
}



const allowedSisterOrigins = new Set(ALLOWED_SISTER_ORIGINS);

for (const tree of TREES) {
  for (const node of tree.nodes) {
    for (const link of node.also ?? []) {
      let origin = "";
      try {
        origin = new URL(link.href).origin;
      } catch {
        throw new Error(`가족관계도 바깥 링크 주소가 잘못되었습니다: ${link.href}`);
      }
      if (!allowedSisterOrigins.has(origin)) throw new Error(`가족관계도 바깥 링크가 자매 사이트가 아닙니다: ${link.href}`);
    }
    if (!node.href || node.href.startsWith("http")) continue;
    const path = node.href.split(/[?#]/)[0];
    if (path.startsWith("/people/")) {
      const slug = path.slice("/people/".length);
      if (!personBySlug(slug)) throw new Error(`가족관계도 링크에 해당하는 인물 페이지가 없습니다: ${node.href}`);
      continue;
    }
    throw new Error(`확인하지 않은 가족관계도 링크: ${node.href}`);
  }
}

export const DEFAULT_TREE_ID = "ragnar";

export function treeByFocus(id: string) {
  return nodeOwner.get(id);
}

export type RelationPerson = { id: string; ko: string; en: string; href?: string };

function personRef(tree: LaidTree, id: string): RelationPerson {
  const node = tree.byId.get(id);
  if (!node) throw new Error(id);
  return { id: node.id, ko: node.ko, en: node.en, href: node.href };
}

function byX(tree: LaidTree) {
  return (a: RelationPerson, b: RelationPerson) => (tree.byId.get(a.id)?.x ?? 0) - (tree.byId.get(b.id)?.x ?? 0);
}

export function relationsOf(tree: LaidTree, id: string) {
  const order = byX(tree);
  const pick = (kind: LinkKind, direction: "from" | "to") =>
    tree.links
      .filter((link) => link.kind === kind && (direction === "to" ? link.to === id : link.from === id))
      .map((link) => personRef(tree, direction === "to" ? link.from : link.to))
      .sort(order);
  const parents = pick("parent", "to");
  const adoptiveParents = pick("adoption", "to");
  const variantParents = pick("variant-parent", "to");
  const children = pick("parent", "from");
  const adopted = pick("adoption", "from");
  const variantChildren = pick("variant-parent", "from");
  const spouses = tree.links
    .filter((link) => link.kind === "spouse" && (link.from === id || link.to === id))
    .map((link) => personRef(tree, link.from === id ? link.to : link.from))
    .sort(order);
  const parentIds = new Set(parents.map((person) => person.id));
  const siblingIds = new Set<string>();
  for (const link of tree.links) {
    if (link.kind !== "parent" || !parentIds.has(link.from) || link.to === id) continue;
    siblingIds.add(link.to);
  }
  const siblings = [...siblingIds].map((siblingId) => personRef(tree, siblingId)).sort(order);
  const adoptiveParentIds = new Set(adoptiveParents.map((person) => person.id));
  const coAdoptedIds = new Set<string>();
  for (const link of tree.links) {
    if (link.kind !== "adoption" || !adoptiveParentIds.has(link.from) || link.to === id) continue;
    coAdoptedIds.add(link.to);
  }
  const coAdopted = [...coAdoptedIds].map((personId) => personRef(tree, personId)).sort(order);
  return { parents, adoptiveParents, variantParents, spouses, children, adopted, variantChildren, siblings, coAdopted };
}

function norm(value: string) {
  return value.toLowerCase().replace(/[\s·.'’\-()/_]/g, "");
}

export type SearchHit = LayoutNode & { treeId: string; treeKo: string };

export function searchNodes(query: string): SearchHit[] {
  const q = norm(query);
  if (!q) return [];
  const hits: { node: SearchHit; exact: boolean; prefix: boolean }[] = [];
  for (const tree of TREES) {
    for (const node of tree.nodes) {
      const keys = node.keys.map(norm);
      const exact = keys.some((key) => key === q);
      const prefix = keys.some((key) => key.startsWith(q));
      const hit = exact || prefix || keys.some((key) => key.includes(q));
      if (!hit) continue;
      hits.push({ node: { ...node, treeId: tree.id, treeKo: tree.ko }, exact, prefix });
    }
  }
  return hits
    .sort((a, b) => Number(b.exact) - Number(a.exact) || Number(b.prefix) - Number(a.prefix) || a.node.ko.localeCompare(b.node.ko, "ko"))
    .map((item) => item.node);
}

export function exactNodeId(query: string) {
  const q = norm(query);
  if (!q) return null;
  const ids = new Set<string>();
  for (const tree of TREES) {
    for (const node of tree.nodes) {
      if (node.keys.some((key) => norm(key) === q)) ids.add(node.id);
    }
  }
  if (ids.size !== 1) return null;
  return [...ids][0];
}

export function focusHref(id: string) {
  const tree = nodeOwner.get(id);
  if (!tree) return "/family-tree";
  return `/family-tree?tree=${tree.id}&focus=${id}`;
}

export function personTreeHref(slug: string) {
  const person = personBySlug(slug);
  if (!person?.treeId) return null;
  return focusHref(person.treeId);
}

export function getTree(id: string) {
  return treeById.get(id);
}