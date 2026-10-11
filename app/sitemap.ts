import type { MetadataRoute } from "next";
import { chapters } from "@/data/chapters";
import { people } from "@/data/people";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/who",
    "/myth",
    "/map",
    "/chronicle",
    "/people",
    "/family-tree",
    "/films",
    "/sources",
    ...chapters.map((chapter) => `/chronicle/${chapter.slug}`),
    ...people.map((person) => `/people/${person.slug}`),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
