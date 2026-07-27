// Hand-authored inline SVG icons, one per tool. Keep viewBox 0 0 24 24, strokes/fills set to
// currentColor so each icon inherits its tile's contrast-safe foreground color automatically.
export const ICONS = {
  whiteboard: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 18.5L15.5 7 17 8.5 5.5 20H4v-1.5z" fill="currentColor"/>
    <path d="M15 6.5l2.5 2.5 1.8-1.8a1.2 1.2 0 000-1.7l-.8-.8a1.2 1.2 0 00-1.7 0L15 6.5z" fill="currentColor"/>
    <path d="M3 21h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  trafficLights: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="2" width="8" height="20" rx="4" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="12" cy="6.5" r="1.8" fill="currentColor"/>
    <circle cx="12" cy="12" r="1.8" fill="currentColor"/>
    <circle cx="12" cy="17.5" r="1.8" fill="currentColor"/>
  </svg>`,

  trueFalse: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="1.6"/>
    <path d="M12 2.5v19" stroke="currentColor" stroke-width="1.6"/>
    <path d="M6 12.5l2.2 2.2L11 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.5 10l3.5 3.5M18 10l-3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  abcd: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="8.2" height="8.2" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
    <rect x="13.3" y="2.5" width="8.2" height="8.2" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
    <rect x="2.5" y="13.3" width="8.2" height="8.2" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
    <rect x="13.3" y="13.3" width="8.2" height="8.2" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
  </svg>`,

  fractionWall: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="3.5" rx="1" stroke="currentColor" stroke-width="1.4"/>
    <line x1="12" y1="3" x2="12" y2="6.5" stroke="currentColor" stroke-width="1.4"/>
    <rect x="2" y="10.2" width="20" height="3.5" rx="1" stroke="currentColor" stroke-width="1.4"/>
    <line x1="8.6" y1="10.2" x2="8.6" y2="13.7" stroke="currentColor" stroke-width="1.4"/>
    <line x1="15.3" y1="10.2" x2="15.3" y2="13.7" stroke="currentColor" stroke-width="1.4"/>
    <rect x="2" y="17.4" width="20" height="3.5" rx="1" stroke="currentColor" stroke-width="1.4"/>
    <line x1="6.7" y1="17.4" x2="6.7" y2="20.9" stroke="currentColor" stroke-width="1.4"/>
    <line x1="11.3" y1="17.4" x2="11.3" y2="20.9" stroke="currentColor" stroke-width="1.4"/>
    <line x1="16" y1="17.4" x2="16" y2="20.9" stroke="currentColor" stroke-width="1.4"/>
  </svg>`,

  stemSentences: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 5.5h13a2.5 2.5 0 012.5 2.5v4a2.5 2.5 0 01-2.5 2.5h-8l-4 3.5v-3.5h-1a2.5 2.5 0 01-2.5-2.5V8a2.5 2.5 0 012.5-2.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    <line x1="8.5" y1="9" x2="18.5" y2="9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="8.5" y1="12" x2="15.5" y2="12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,

  talkRoles: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8.5" cy="7" r="3" stroke="currentColor" stroke-width="1.6"/>
    <path d="M2.5 19c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="17" cy="8.5" r="2.4" stroke="currentColor" stroke-width="1.5"/>
    <path d="M14 19c.3-2.3 2-4 4-4 2.3 0 4.2 1.9 4.5 4.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  wwwEbi: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="4" width="8.4" height="16" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
    <rect x="13.1" y="4" width="8.4" height="16" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
    <path d="M4.5 8.5h4.4M4.5 11.5h4.4M4.5 14.5h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M15.1 8.5h4.4M15.1 11.5h4.4M15.1 14.5h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
  </svg>`,

  checklist: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="19" height="19" rx="3" stroke="currentColor" stroke-width="1.6"/>
    <path d="M6.5 8l1.6 1.6L11 6.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="13" y1="7.5" x2="18.5" y2="7.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M6.5 15l1.6 1.6L11 13.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="13" y1="14.5" x2="18.5" y2="14.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,

  emoji: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="1.6"/>
    <path d="M8.5 9.5c0-.7.6-1.3 1.3-1.3s1.2.6 1.2 1.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M13 9.5c0-.7.6-1.3 1.3-1.3s1.2.6 1.2 1.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M7.3 13.5c1.3 2.3 3 3.5 4.7 3.5s3.4-1.2 4.7-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,
};
