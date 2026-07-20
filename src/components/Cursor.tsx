import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    // Windows XP Style Cursors (Base64 SVG)
    // Default Arrow
    const xpArrow = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fill="white" stroke="black" stroke-width="1.5" stroke-linejoin="miter" d="M4 4v20l6-5 4 9 3-1-4-9 6-1z"/></svg>`;
    
    // Pointer (Hand)
    const xpHand = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fill="white" stroke="black" stroke-width="1.5" stroke-linejoin="miter" d="M12 2v6h2V4h2v6h2V6h2v6h2v6l-4 6H9l-5-5v-6h3l2 3V2z"/></svg>`;

    const style = document.createElement('style');
    style.innerHTML = `
      @media (pointer: fine) {
        * {
          cursor: url('${xpArrow}') 4 4, auto !important;
        }
        a, button, input, textarea, [role="button"], .cursor-hover,
        a *, button *, [role="button"] * {
          cursor: url('${xpHand}') 12 2, pointer !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
