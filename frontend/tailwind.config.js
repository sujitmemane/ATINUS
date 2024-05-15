import keepPreset from "keep-react/preset";
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  presets: [keepPreset],
  plugins: [flowbite.plugin()],
};
