// Hand-authored inline SVG icons, one per tool. Keep viewBox 0 0 24 24, white strokes/fills
// so they drop straight onto any colored tile background with no extra assets.
export const ICONS = {
  whiteboard: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 18.5L15.5 7 17 8.5 5.5 20H4v-1.5z" fill="#fff"/>
    <path d="M15 6.5l2.5 2.5 1.8-1.8a1.2 1.2 0 000-1.7l-.8-.8a1.2 1.2 0 00-1.7 0L15 6.5z" fill="#fff"/>
    <path d="M3 21h18" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  trafficLights: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="2" width="8" height="20" rx="4" stroke="#fff" stroke-width="1.6"/>
    <circle cx="12" cy="6.5" r="1.8" fill="#fff"/>
    <circle cx="12" cy="12" r="1.8" fill="#fff"/>
    <circle cx="12" cy="17.5" r="1.8" fill="#fff"/>
  </svg>`,

  countdown: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="13" r="8.5" stroke="#fff" stroke-width="1.6"/>
    <path d="M12 8.5V13l3.2 2" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.5 2h5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  trueFalse: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" stroke="#fff" stroke-width="1.6"/>
    <path d="M12 2.5v19" stroke="#fff" stroke-width="1.6"/>
    <path d="M6 12.5l2.2 2.2L11 11" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.5 10l3.5 3.5M18 10l-3.5 3.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  abcd: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="8.2" height="8.2" rx="1.5" stroke="#fff" stroke-width="1.6"/>
    <rect x="13.3" y="2.5" width="8.2" height="8.2" rx="1.5" stroke="#fff" stroke-width="1.6"/>
    <rect x="2.5" y="13.3" width="8.2" height="8.2" rx="1.5" stroke="#fff" stroke-width="1.6"/>
    <rect x="13.3" y="13.3" width="8.2" height="8.2" rx="1.5" stroke="#fff" stroke-width="1.6"/>
  </svg>`,

  fractionWall: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="3.5" rx="1" stroke="#fff" stroke-width="1.4"/>
    <line x1="12" y1="3" x2="12" y2="6.5" stroke="#fff" stroke-width="1.4"/>
    <rect x="2" y="10.2" width="20" height="3.5" rx="1" stroke="#fff" stroke-width="1.4"/>
    <line x1="8.6" y1="10.2" x2="8.6" y2="13.7" stroke="#fff" stroke-width="1.4"/>
    <line x1="15.3" y1="10.2" x2="15.3" y2="13.7" stroke="#fff" stroke-width="1.4"/>
    <rect x="2" y="17.4" width="20" height="3.5" rx="1" stroke="#fff" stroke-width="1.4"/>
    <line x1="6.7" y1="17.4" x2="6.7" y2="20.9" stroke="#fff" stroke-width="1.4"/>
    <line x1="11.3" y1="17.4" x2="11.3" y2="20.9" stroke="#fff" stroke-width="1.4"/>
    <line x1="16" y1="17.4" x2="16" y2="20.9" stroke="#fff" stroke-width="1.4"/>
  </svg>`,

  smiley: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" stroke="#fff" stroke-width="1.6"/>
    <circle cx="8.7" cy="10" r="1.2" fill="#fff"/>
    <circle cx="15.3" cy="10" r="1.2" fill="#fff"/>
    <path d="M7.5 14c1 1.6 2.6 2.5 4.5 2.5s3.5-.9 4.5-2.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  thermometer: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 14.3V4.5a1.5 1.5 0 00-3 0v9.8a3.5 3.5 0 103 0z" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="12" cy="16.5" r="1.6" fill="#fff"/>
    <line x1="14.5" y1="7" x2="16.5" y2="7" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="14.5" y1="10" x2="16.5" y2="10" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`,

  stopwatch: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="13.5" r="8" stroke="#fff" stroke-width="1.6"/>
    <path d="M12 9v4.5l2.8 1.8" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.5 2.5h5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M18.5 4l1.4 1.4" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,
};
