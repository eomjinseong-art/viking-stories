export const SITE_NAME = "바이킹이야기";
export const SITE_NAME_EN = "Viking Stories";
export const SITE_MARK = "V";
export const SITE_TAGLINE = "노르드인의 바다를, 짧은 한국어로";
export const SITE_SUB =
  "약탈과 정착, 왕국과 사가를 전설과 역사로 나눠 적습니다. 게르만이야기의 다음 이야기이고, 어려운 말에는 쉬운 풀이를 붙입니다.";
export const BRAND_LINE = "나두 — 나의 모든 일상을 AI와 함께";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viking-stories.vercel.app";

export const SISTER_SITES_LABEL = "나두 역사·신화";

export const MYTH_URL = "https://nadoo-myth.vercel.app";
export const ILIAD_URL = "https://iliad-stories.vercel.app";
export const GREECE_URL = "https://greece-stories.vercel.app";
export const ROME_URL = "https://rome-stories.vercel.app";
export const GERMANIC_URL = "https://germanic-stories.vercel.app";
export const EGYPT_URL = "https://egypt-stories.vercel.app";
export const PERSIA_URL = "https://persia-stories.vercel.app";
export const CHOSEN_URL = "https://the-chosen-korean.vercel.app";
export const PHILOSOPHY_URL = "https://philosophy-stories.vercel.app";
export const KOREA_URL = "https://korea-stories.vercel.app";
export const WORLD_URL = "https://nadoo-world.vercel.app";
export const TIMELINE_URL = "https://nadoo-timeline.vercel.app";
export const HUB_URL = "https://tinalinkeom.vercel.app";
export const CHECKLIST_URL = "https://movie-checklist-sigma.vercel.app/?list=history";

export const SISTER_SITES = [
  { href: MYTH_URL, label: "나두신화", en: "Myth" },
  { href: ILIAD_URL, label: "일리아스이야기", en: "Iliad" },
  { href: GREECE_URL, label: "그리스이야기", en: "Greece" },
  { href: ROME_URL, label: "로마이야기", en: "Rome" },
  { href: GERMANIC_URL, label: "게르만이야기", en: "Germanic" },
  { href: SITE_URL, label: "바이킹이야기", en: "Viking" },
  { href: EGYPT_URL, label: "이집트이야기", en: "Egypt" },
  { href: PERSIA_URL, label: "페르시아이야기", en: "Persia" },
  { href: CHOSEN_URL, label: "더 초즌 · 성경", en: "The Chosen · Bible" },
  { href: PHILOSOPHY_URL, label: "철학이야기", en: "Philosophy" },
  { href: KOREA_URL, label: "대한민국이야기", en: "Korea" },
  { href: WORLD_URL, label: "나두세계", en: "World" },
  { href: TIMELINE_URL, label: "나두연표", en: "Timeline" },
  { href: HUB_URL, label: "나두 허브", en: "Nadoo Hub" },
] as const;

export const ALLOWED_SISTER_ORIGINS = SISTER_SITES.map((site) => new URL(site.href).origin);

export const OTHER_FAMILY_TREES = [
  { href: `${MYTH_URL}/family-tree`, label: "나두신화 가족관계도", en: "Myth" },
  { href: `${ILIAD_URL}/family-tree`, label: "일리아스이야기 가족관계도", en: "Iliad" },
  { href: `${GREECE_URL}/family-tree`, label: "그리스이야기 가족관계도", en: "Greece" },
  { href: `${ROME_URL}/family-tree`, label: "로마이야기 가족관계도", en: "Rome" },
  { href: `${GERMANIC_URL}/family-tree`, label: "게르만이야기 관계도", en: "Germanic" },
  { href: `${EGYPT_URL}/family-tree`, label: "이집트이야기 가족관계도", en: "Egypt" },
  { href: `${PERSIA_URL}/family-tree`, label: "페르시아이야기 가족관계도", en: "Persia" },
  { href: `${KOREA_URL}/family-tree`, label: "대한민국이야기 가족관계도", en: "Korea" },
  { href: `${CHOSEN_URL}/family-tree`, label: "더 초즌 · 성경 가족관계도", en: "The Chosen · Bible" },
] as const;

export const OTHER_FILM_PAGES = [
  { href: `${ILIAD_URL}/movies`, label: "일리아스이야기 영화", en: "Iliad" },
  { href: `${GREECE_URL}/movies`, label: "그리스이야기 영화", en: "Greece" },
  { href: `${ROME_URL}/movies`, label: "로마이야기 영화", en: "Rome" },
  { href: `${GERMANIC_URL}/films`, label: "게르만이야기 영화", en: "Germanic" },
  { href: `${EGYPT_URL}/movies`, label: "이집트이야기 영화", en: "Egypt" },
  { href: `${PERSIA_URL}/movies`, label: "페르시아이야기 영화", en: "Persia" },
  { href: `${KOREA_URL}/films`, label: "대한민국이야기 영화", en: "Korea" },
  { href: `${PHILOSOPHY_URL}/films`, label: "철학이야기 영화", en: "Philosophy" },
  { href: `${MYTH_URL}/in-media`, label: "나두신화에서 영화 보기", en: "Myth" },
  { href: `${CHOSEN_URL}/together`, label: "더 초즌에서 함께 보기", en: "The Chosen · Bible" },
] as const;

export const COUPANG_URL = "https://link.coupang.com/a/hsdzLh1vB6";

export const NAV = [
  { href: "/who", label: "바이킹" },
  { href: "/myth", label: "신화" },
  { href: "/map", label: "지도" },
  { href: "/chronicle", label: "연대기" },
  { href: "/people", label: "인물" },
  { href: "/family-tree", label: "관계도" },
  { href: "/films", label: "영화" },
  { href: "/sources", label: "출처" },
] as const;

export const HOME_SECTIONS = [
  {
    href: "/who",
    en: "Who",
    title: "바이킹은 누구인가",
    desc: "노르드인, 바이킹이라는 말, 스칸디나비아 게르만족, 왕과 팅, 롱쉽, 룬, 생활과 교역.",
  },
  {
    href: "/myth",
    en: "Myth",
    title: "북유럽 신화 입문",
    desc: "오딘, 토르, 로키, 프레이야, 발할라, 라그나로크, 이그드라실. 13세기 사가와 9세기의 신앙을 나눕니다.",
  },
  {
    href: "/map",
    en: "Routes",
    title: "원정·정착 지도",
    desc: "서쪽 바다, 동쪽 강, 남쪽 프랑크와 노르망디. 손으로 그린 도식이고 국경선이 아닙니다.",
  },
  {
    href: "/chronicle",
    en: "Chronicle",
    title: "연대기",
    desc: "793년 린디스판부터 1066년 스탐퍼드 브리지와 헤이스팅스까지. 전승은 전승이라고 적습니다.",
  },
  {
    href: "/chronicle/lindisfarne",
    en: "793",
    title: "린디스판",
    desc: "바이킹 시대를 흔히 여는 이정표. 첫 배였는지는 연대기가 단정하지 않습니다.",
  },
  {
    href: "/people",
    en: "People",
    title: "인물",
    desc: "라그나르의 전승, 알프레드와 롤로, 류릭과 블라디미르, 크누트와 1066년의 세 왕.",
  },
  {
    href: "/family-tree",
    en: "Relations",
    title: "가계도",
    desc: "라그나르 전승, 노르망디, 루리크, 덴마크, 웨섹스, 북대서양. 칸을 누르면 혈연이 밝아집니다.",
  },
  {
    href: "/films",
    en: "Films",
    title: "영화·드라마",
    desc: "실제로 있는 작품만. 연도, 줄거리, 역사와 다른 점. 넷플릭스 배지는 한국 카탈로그를 확인한 날만.",
  },
  {
    href: "/sources",
    en: "Sources",
    title: "출처",
    desc: "앵글로색슨 연대기, 프랑크 연대기, 아이슬란드 사가, 원초 연대기. 단정하지 않은 항목도 모아 둡니다.",
  },
] as const;
