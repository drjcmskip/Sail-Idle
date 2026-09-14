// One hand-drawn silhouette per boat class, not per boat — boats within a
// class share it but differ in stats. Each entry has two SVG groups:
// `structure` (hull/foils/rig — fixed color) and `sails` (fabric or wing —
// hue-rotated live based on upgrade investment, see ui.js).
export const BOAT_ART = {
  derive: {
    structure: `
      <path class="hull" d="M20 68 Q50 82 80 68 L74 78 Q50 90 26 78 Z" />
      <rect class="mast" x="49" y="18" width="2" height="46" />
    `,
    sails: `
      <path class="sail sail-main" d="M50 18 L50 62 L28 62 Z" />
      <path class="sail sail-jib" d="M50 24 L50 62 L68 62 Z" />
    `,
  },

  mini650: {
    structure: `
      <path class="hull" d="M18 68 Q50 84 82 68 L76 79 Q50 91 24 79 Z" />
      <rect class="ballast" x="10" y="68" width="11" height="6" rx="2" />
      <rect class="ballast" x="79" y="68" width="11" height="6" rx="2" />
      <rect class="mast" x="49" y="14" width="2" height="52" />
    `,
    sails: `
      <path class="sail sail-main" d="M50 14 L50 62 L26 62 Z" />
      <path class="sail sail-jib" d="M50 22 L50 62 L70 62 Z" />
    `,
  },

  halfton: {
    structure: `
      <path class="hull" d="M16 66 Q50 84 84 66 L77 79 Q50 92 23 79 Z" />
      <rect class="cabin" x="40" y="56" width="20" height="11" rx="2.5" />
      <rect class="mast" x="49" y="10" width="2" height="56" />
    `,
    sails: `
      <path class="sail sail-main" d="M50 10 L50 60 L24 60 Z" />
      <path class="sail sail-jib" d="M50 18 L50 60 L72 60 Z" />
    `,
  },

  class40: {
    structure: `
      <path class="hull" d="M14 66 Q50 78 86 66 L78 80 Q50 92 22 80 Z" />
      <path class="rudder" d="M36 79 L30 91 L39 81 Z" />
      <path class="rudder" d="M64 79 L70 91 L61 81 Z" />
      <rect class="mast" x="49" y="8" width="2" height="58" />
    `,
    sails: `
      <path class="sail sail-main" d="M50 8 L50 58 L22 58 Z" />
      <path class="sail sail-jib" d="M50 16 L50 58 L74 58 Z" />
    `,
  },

  imoca: {
    structure: `
      <path class="hull" d="M12 64 Q50 72 88 64 L79 80 Q50 92 21 80 Z" />
      <path class="foil" d="M18 68 L6 74 L18 72 Z" />
      <path class="foil" d="M82 68 L94 74 L82 72 Z" />
      <rect class="mast" x="49" y="6" width="2" height="60" />
    `,
    sails: `
      <path class="sail sail-main" d="M50 6 L50 56 L20 56 Z" />
      <path class="sail sail-jib" d="M50 14 L50 56 L76 56 Z" />
    `,
  },

  ocean50: {
    structure: `
      <rect class="crossbeam" x="14" y="68" width="72" height="3" />
      <path class="hull-second" d="M6 70 Q16 78 26 70 L22 80 Q16 86 10 80 Z" />
      <path class="hull-second" d="M74 70 Q84 78 94 70 L90 80 Q84 86 80 80 Z" />
      <path class="hull" d="M30 66 Q50 76 70 66 L64 84 Q50 92 36 84 Z" />
      <rect class="mast" x="49" y="8" width="2" height="58" />
    `,
    sails: `
      <path class="sail sail-main" d="M50 8 L50 58 L24 58 Z" />
      <path class="sail sail-jib" d="M50 16 L50 58 L74 58 Z" />
    `,
  },

  ac75: {
    structure: `
      <path class="foil-strut" d="M32 74 L14 88" />
      <path class="foil-strut" d="M68 74 L86 88" />
      <path class="hull" d="M20 66 Q50 74 80 66 L73 80 Q50 90 27 80 Z" />
      <rect class="mast" x="49" y="6" width="2" height="60" />
    `,
    sails: `
      <path class="sail sail-main" d="M50 6 L50 58 L22 58 Z" />
      <path class="sail sail-jib" d="M50 14 L50 58 L76 58 Z" />
    `,
  },

  f50: {
    structure: `
      <rect class="crossbeam" x="26" y="68" width="48" height="3" />
      <path class="hull-second" d="M18 66 Q28 80 38 66 L34 78 Q28 86 22 78 Z" />
      <path class="hull-second" d="M62 66 Q72 80 82 66 L78 78 Q72 86 66 78 Z" />
      <rect class="mast" x="49" y="10" width="2" height="52" />
    `,
    sails: `
      <path class="wingsail" d="M50 12 Q60 28 54 62 Q50 64 46 62 Q40 28 50 12 Z" />
    `,
  },

  ultim: {
    structure: `
      <rect class="crossbeam" x="10" y="66" width="80" height="3" />
      <path class="foil-strut" d="M14 78 L14 86" />
      <path class="foil-strut" d="M86 78 L86 86" />
      <path class="hull-second" d="M2 68 Q14 78 26 68 L21 82 Q14 88 7 82 Z" />
      <path class="hull-second" d="M74 68 Q86 78 98 68 L93 82 Q86 88 79 82 Z" />
      <path class="hull" d="M32 64 Q50 72 68 64 L62 86 Q50 94 38 86 Z" />
      <rect class="mast" x="49" y="4" width="2" height="62" />
    `,
    sails: `
      <path class="sail sail-main" d="M50 4 L50 56 L18 56 Z" />
      <path class="sail sail-jib" d="M50 12 L50 56 L78 56 Z" />
    `,
  },
};

export function boatArtMarkup(classId) {
  const art = BOAT_ART[classId] ?? BOAT_ART.derive;
  return `
    <g class="boat-structure">${art.structure}</g>
    <g class="boat-sails">${art.sails}</g>
  `;
}
