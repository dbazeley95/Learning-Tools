// Single source of truth for the home grid and router. To add a new tool:
// 1. Create js/tools/<id>.js exporting mount(container) / unmount(container).
// 2. Add a matching css/tools/<id>.css (link it in index.html) if it needs styling.
// 3. Add an icon to js/icons.js.
// 4. Add one entry below. The home grid and router pick it up automatically.
// An entry may use `href` instead of `mount` for a tile that just opens an external
// resource (e.g. a PDF) in a new tab rather than a routed in-app view.
export const TOOLS = [
  {
    id: "whiteboard",
    name: "Whiteboard",
    color: "navy",
    icon: "whiteboard",
    mount: () => import("./tools/whiteboard.js"),
  },
  {
    id: "traffic-lights",
    name: "Traffic Lights",
    color: "gold",
    icon: "trafficLights",
    mount: () => import("./tools/traffic-lights.js"),
  },
  {
    id: "stem-sentences",
    name: "Stem Sentences",
    color: "mauve",
    icon: "stemSentences",
    mount: () => import("./tools/stem-sentences.js"),
  },
  {
    id: "true-false",
    name: "True or False",
    color: "tan",
    icon: "trueFalse",
    mount: () => import("./tools/true-false.js"),
  },
  {
    id: "abcd",
    name: "ABCD",
    color: "red",
    icon: "abcd",
    mount: () => import("./tools/abcd.js"),
  },
  {
    id: "talk-roles",
    name: "Talk Roles",
    color: "navy",
    icon: "talkRoles",
    href: "./files/Oracy_role_cards.pdf",
  },
  {
    id: "www-ebi",
    name: "WWW / EBI",
    color: "gold",
    icon: "wwwEbi",
    mount: () => import("./tools/www-ebi.js"),
  },
  {
    id: "checklist",
    name: "Edit Checklist",
    color: "mauve",
    icon: "checklist",
    mount: () => import("./tools/checklist.js"),
  },
  {
    id: "emoji",
    name: "Emoji",
    color: "tan",
    icon: "emoji",
    mount: () => import("./tools/emoji.js"),
  },
  {
    id: "fraction-wall",
    name: "Fraction Wall",
    color: "red",
    icon: "fractionWall",
    mount: () => import("./tools/fraction-wall.js"),
  },
];

export function getTool(id) {
  return TOOLS.find((t) => t.id === id);
}
