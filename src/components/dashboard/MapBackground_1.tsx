export function MapBackground() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 700 520"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Background */}
      <rect width="700" height="520" fill="#dde8d4" />

      {/* Grid streets */}
      {[80, 160, 240, 320, 400, 480, 560, 640].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="520" stroke="#c5d4bc" strokeWidth="1.5" />
      ))}
      {[80, 160, 240, 320, 400, 480].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="700" y2={y} stroke="#c5d4bc" strokeWidth="1.5" />
      ))}

      {/* Diagonal roads */}
      <line x1="0" y1="0" x2="700" y2="420" stroke="#c5d4bc" strokeWidth="1.5" />
      <line x1="0" y1="200" x2="600" y2="520" stroke="#c5d4bc" strokeWidth="1.5" />
      <line x1="700" y1="0" x2="100" y2="520" stroke="#c5d4bc" strokeWidth="1.5" />

      {/* City blocks */}
      {[
        [90, 90], [170, 90], [250, 90], [330, 90], [410, 90], [500, 90],
        [90, 170], [170, 170], [250, 170], [330, 170], [410, 170], [500, 170],
        [90, 250], [170, 250], [250, 250], [330, 250], [410, 250], [500, 250],
        [90, 330], [170, 330], [250, 330], [330, 330], [410, 330], [500, 330],
        [90, 410], [170, 410], [250, 410], [330, 410],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="65" height="65" fill="#c3d4b8" rx="2" opacity="0.7" />
      ))}

      {/* Park */}
      <ellipse cx="560" cy="130" rx="50" ry="32" fill="#a8d4a0" opacity="0.7" />
      <ellipse cx="560" cy="130" rx="30" ry="20" fill="#90c888" opacity="0.5" />

      {/* Water */}
      <ellipse cx="140" cy="450" rx="45" ry="25" fill="#9fc8e0" opacity="0.65" />

      {/* Route Lines */}
      {/* Red Line 1 */}
      <polyline
        points="50,70 180,140 340,130 490,155 640,185"
        stroke="#e74c3c"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.88"
      />
      {/* Blue Line 2 */}
      <polyline
        points="50,210 160,240 290,255 420,260 560,285 660,310"
        stroke="#3b82f6"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.88"
      />
      {/* Green Line 3 */}
      <polyline
        points="50,370 180,320 290,340 420,330 560,390"
        stroke="#16a34a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.88"
      />

      {/* Bus markers on routes */}
      {[100, 200, 310, 420, 530].map((x, i) => (
        <g key={`b1-${i}`}>
          <rect x={x - 10} y="55" width="20" height="14" rx="3" fill="#e74c3c" />
          <text x={x} y="65" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">BUS</text>
        </g>
      ))}
      {[110, 210, 320, 450, 560].map((x, i) => (
        <g key={`b2-${i}`}>
          <rect x={x - 10} y="195" width="20" height="14" rx="3" fill="#3b82f6" />
          <text x={x} y="205" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">BUS</text>
        </g>
      ))}
      {[90, 195, 300, 420, 510].map((x, i) => (
        <g key={`b3-${i}`}>
          <rect x={x - 10} y="305" width="20" height="14" rx="3" fill="#16a34a" />
          <text x={x} y="315" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">BUS</text>
        </g>
      ))}

      {/* Route label tags */}
      <rect x="605" y="172" width="80" height="18" rx="5" fill="#e74c3c" />
      <text x="645" y="183" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">Red Line 1</text>

      <rect x="600" y="298" width="85" height="18" rx="5" fill="#3b82f6" />
      <text x="642" y="309" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">Blue Line 2</text>

      <rect x="490" y="378" width="88" height="18" rx="5" fill="#16a34a" />
      <text x="534" y="389" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">Green Line 3</text>
    </svg>
  );
}
