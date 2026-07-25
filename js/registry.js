// Single source of truth for the home grid and router. To add a new tool:
// 1. Create js/tools/<id>.js exporting mount(container) / unmount(container).
// 2. Add a matching css/tools/<id>.css (link it in index.html) if it needs styling.
// 3. Add an icon to js/icons.js.
// 4. Add one entry below. The home grid and router pick it up automatically.
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
    id: "countdown",
    name: "Countdown",
    color: "mauve",
    icon: "countdown",
    mount: () => import("./tools/countdown.js"),
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
    id: "fraction-wall",
    name: "Fraction Wall",
    color: "navy",
    icon: "fractionWall",
    mount: () => import("./tools/fraction-wall.js"),
  },
  {
    id: "smiley",
    name: "Smiley",
    color: "gold",
    icon: "smiley",
    mount: () => import("./tools/smiley.js"),
  },
  {
    id: "thermometer",
    name: "Thermometer",
    color: "mauve",
    icon: "thermometer",
    mount: () => import("./tools/thermometer.js"),
  },
  {
    id: "stopwatch",
    name: "Stopwatch",
    color: "tan",
    icon: "stopwatch",
    mount: () => import("./tools/stopwatch.js"),
  },
];

export function getTool(id) {
  return TOOLS.find((t) => t.id === id);
}
