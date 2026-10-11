export type Source = { work: string; ref?: string };

export type Kind = "legend" | "history" | "mixed";

export type LinkItem = { href: string; label: string };

export type Guide = {
  en: string;
  title: string;
  summary: string;
  points: readonly [string, string, string];
  more?: readonly string[];
};

export type FilmKind = "영화" | "시리즈" | "다큐" | "애니";

export type Film = {
  /** Anchor id. Matches nadoo-timeline films.json when the work is listed there. */
  slug: string;
  titleKo: string;
  titleOriginal: string;
  year: string;
  kind: FilmKind;
  plot: string;
  history: string;
  links: readonly LinkItem[];
  /** Set only after the title page on netflix.com/kr was opened. */
  netflixKr?: { checkedAt: string };
};

export type Chapter = Guide & {
  slug: string;
  years: string;
  kind: Kind;
  cause: string;
  who: string;
  result: string;
  sources: readonly Source[];
  related: readonly LinkItem[];
  filmSlugs: readonly string[];
};

export type PersonSide = "saga" | "north" | "west" | "east";

export type Person = {
  slug: string;
  en: string;
  nameKo: string;
  nameEn: string;
  latin?: string;
  years: string;
  role: string;
  side: PersonSide;
  kind: Kind;
  summary: string;
  points: readonly [string, string, string];
  more?: readonly string[];
  sources: readonly Source[];
  related: readonly LinkItem[];
  filmSlugs: readonly string[];
  /** Node id on the relationship chart, when this person is drawn. */
  treeId?: string;
};
