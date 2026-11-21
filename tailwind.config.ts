import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ember: "#cf9a5c", charcoal: "#10110f" } } },
  plugins: []
};
export default config;
