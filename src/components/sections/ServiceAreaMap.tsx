interface ServiceAreaMapProps {
  className?: string;
}

const regions = [
  {
    id: "sacramento",
    label: "Greater Sacramento",
    d: "M120 140 L160 130 L170 150 L165 175 L140 180 L115 170 Z",
    labelX: 140,
    labelY: 160,
  },
  {
    id: "bay-area",
    label: "Bay Area",
    d: "M40 155 L75 140 L95 150 L100 175 L85 195 L55 190 L35 175 Z",
    labelX: 68,
    labelY: 170,
  },
  {
    id: "placer",
    label: "Placer County",
    d: "M155 105 L195 95 L205 120 L195 140 L165 135 L155 120 Z",
    labelX: 178,
    labelY: 120,
  },
  {
    id: "eldorado",
    label: "El Dorado County",
    d: "M175 140 L210 130 L225 150 L215 170 L185 175 L170 155 Z",
    labelX: 195,
    labelY: 155,
  },
  {
    id: "foothills",
    label: "Sierra Foothills",
    d: "M210 90 L250 70 L265 100 L255 135 L225 145 L210 125 Z",
    labelX: 238,
    labelY: 110,
  },
];

export default function ServiceAreaMap({ className = "" }: ServiceAreaMapProps) {
  return (
    <svg
      viewBox="0 0 300 280"
      className={className}
      role="img"
      aria-label="Map of Northern California service areas including Greater Sacramento, Bay Area, Placer County, El Dorado County, and Sierra Foothills"
    >
      {/* NorCal outline */}
      <path
        d="M10 50 L50 20 L120 10 L200 15 L270 40 L285 80 L275 140 L260 180 L230 220 L180 250 L120 260 L60 240 L25 200 L10 150 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-stone-300"
      />

      {/* Region paths */}
      {regions.map((region) => (
        <g key={region.id} data-region={region.id}>
          <path
            d={region.d}
            className="fill-transparent stroke-sage-300 transition-colors"
            strokeWidth="1.5"
            data-region-path
          />
          <text
            x={region.labelX}
            y={region.labelY}
            textAnchor="middle"
            className="fill-stone-600 text-[8px] font-sans"
            data-region-label
          >
            {region.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
