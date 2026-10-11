const sea = "#d5e4ec";
const land = "#e7efe6";
const ink = "#241c16";
const route = "#a34732";
const later = "#6a4560";

const places = [
  { id: "scand", label: "스칸디나비아", x: 430, y: 78, href: "/who" },
  { id: "britain", label: "영국", x: 250, y: 168, href: "/chronicle/lindisfarne" },
  { id: "ireland", label: "아일랜드·더블린", x: 168, y: 210, href: "/chronicle/dublin" },
  { id: "iceland", label: "아이슬란드", x: 150, y: 78, href: "/chronicle/iceland-greenland" },
  { id: "greenland", label: "그린란드", x: 70, y: 120, href: "/chronicle/iceland-greenland" },
  { id: "vinland", label: "빈란드", x: 48, y: 230, href: "/chronicle/vinland" },
  { id: "franks", label: "프랑크·파리", x: 300, y: 300, href: "/chronicle/frankish-raids" },
  { id: "normandy", label: "노르망디", x: 250, y: 268, href: "/chronicle/normandy" },
  { id: "sicily", label: "시칠리아", x: 390, y: 430, href: "/chronicle/normandy" },
  { id: "kyiv", label: "키예프", x: 560, y: 250, href: "/chronicle/rus-kyiv" },
  { id: "byzantium", label: "콘스탄티노폴리스", x: 620, y: 380, href: "/chronicle/varangian-guard" },
];

export function RouteMap() {
  return (
    <figure className="mt-8">
      <svg viewBox="0 0 760 520" role="img" aria-labelledby="route-map-title route-map-desc" className="h-auto w-full rounded-lg border border-line bg-[#e7efe6]">
        <title id="route-map-title">바이킹 원정과 정착의 도식 지도</title>
        <desc id="route-map-desc">
          위쪽이 북쪽인 손으로 그린 도식입니다. 거리와 해안선은 실제 지도가 아닙니다. 붉은 선은 바다와 강의 이동, 보라 점선은 바이킹 시대 이후의 노르만 남하입니다.
        </desc>
        <rect width="760" height="520" fill={land} />
        <ellipse cx="300" cy="200" rx="250" ry="120" fill={sea} />
        <ellipse cx="120" cy="150" rx="90" ry="70" fill={sea} />
        <path d="M470 40c40 30 50 80 40 130 30 20 70 30 110 20 20 50 10 110-20 150-40 20-90 10-120-10 10 40-10 90-50 110 40 30 90 80 80 130" fill={sea} opacity="0.85" />
        <text x="24" y="28" fill={route} fontSize="13">
          도식 · 한 해의 국경이 아님
        </text>
        <path d="M430 90 C 340 110, 280 140, 250 168" fill="none" stroke={route} strokeWidth="2.2" />
        <path d="M250 176 C 210 190, 190 200, 176 208" fill="none" stroke={route} strokeWidth="2.2" />
        <path d="M410 70 C 300 50, 210 60, 160 78" fill="none" stroke={route} strokeWidth="2.2" />
        <path d="M150 90 C 120 100, 90 110, 78 124" fill="none" stroke={route} strokeWidth="2.2" />
        <path d="M78 140 C 60 170, 50 200, 52 220" fill="none" stroke={route} strokeWidth="2.2" />
        <path d="M430 120 C 390 180, 340 240, 310 290" fill="none" stroke={route} strokeWidth="2.2" />
        <path d="M280 250 C 270 258, 262 262, 256 266" fill="none" stroke={route} strokeWidth="2.2" />
        <path d="M470 100 C 520 150, 540 200, 555 240" fill="none" stroke={route} strokeWidth="2.2" />
        <path d="M568 270 C 590 310, 605 345, 616 368" fill="none" stroke={route} strokeWidth="2.2" />
        <path d="M270 290 C 310 340, 350 390, 380 420" fill="none" stroke={later} strokeWidth="2" strokeDasharray="5 4" />
        {places.map((place) => (
          <a key={place.id} href={place.href}>
            <circle cx={place.x} cy={place.y} r="5" fill={route} />
            <text x={place.x + 8} y={place.y + 4} fill={ink} fontSize="13">
              {place.label}
            </text>
          </a>
        ))}
        <text x="24" y="470" fill={ink} fontSize="12">
          붉은 실선 · 서쪽 바다, 동쪽 강, 프랑크 해안
        </text>
        <text x="24" y="492" fill={later} fontSize="12">
          보라 점선 · 노르망디에서 시칠리아 (11세기, 바이킹 시대 이후의 노르만)
        </text>
      </svg>
      <figcaption className="mt-2 text-xs leading-5 text-muted">
        지명을 누르면 그 항로의 장으로 갑니다. 해안선은 기억용 도식입니다.
      </figcaption>
    </figure>
  );
}
