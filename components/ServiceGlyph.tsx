// Abstract, brand-true glyph used for service cards/pages until real
// Higgsfield stills are generated (see README). Built from the same
// twin-arc language as the logo — each index gets a distinct arrangement
// so the eight services stay visually distinguishable at a glance.
export function ServiceGlyph({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const seed = index % 8;
  const rotations = [0, 24, -18, 42, -36, 12, -8, 30];
  const rotate = rotations[seed];

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`sg-grad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#403D92" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#403D92" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#sg-grad-${seed})`} />
      <g transform={`rotate(${rotate} 100 100)`} opacity="0.9">
        <path
          d="M40 140 C 60 110, 60 70, 100 55"
          stroke="#B8D444"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M55 155 C 80 130, 80 80, 130 50"
          stroke="#B8D444"
          strokeWidth="1.4"
          strokeOpacity="0.55"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M160 60 C 140 90, 140 130, 100 145"
          stroke="#F4F3EE"
          strokeWidth="2"
          strokeOpacity="0.7"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="100" cy="55" r="4.5" fill="#CDE85A" />
        <circle cx="100" cy="145" r="2.5" fill="#F4F3EE" fillOpacity="0.8" />
      </g>
    </svg>
  );
}
