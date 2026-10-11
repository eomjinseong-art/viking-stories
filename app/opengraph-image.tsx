import { ImageResponse } from "next/og";

export const alt = "바이킹이야기 · 쉬운 바이킹 역사";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const title = "바이킹이야기";
  const sub = "노르드인의 바다를, 짧은 한국어로";
  const font = await loadFont(`${title}${sub}VIKING STORIES 린디스판 롱쉽 빈란드`);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f3eee6",
          color: "#241c16",
          padding: "72px",
          borderTop: "18px solid #a34732",
          borderBottom: "18px solid #a34732",
          fontFamily: font ? "NotoSerifKR" : "serif",
        }}
      >
        <div style={{ color: "#a34732", fontSize: 28, letterSpacing: 8 }}>VIKING STORIES</div>
        <div style={{ marginTop: 20, fontSize: 92 }}>{title}</div>
        <div style={{ marginTop: 18, fontSize: 34, color: "#6e6258" }}>{sub}</div>
        <div style={{ marginTop: 36, fontSize: 26, color: "#2f4a3c" }}>린디스판 · 롱쉽 · 데인로 · 빈란드 · 1066</div>
      </div>
    ),
    {
      ...size,
      ...(font ? { fonts: [{ name: "NotoSerifKR", data: font, weight: 700 as const, style: "normal" as const }] } : {}),
    },
  );
}
