import type { Config } from "tailwindcss";
type AddUtilitiesFunction = (
  utilities: Record<string, Record<string, string>>
) => void;
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./feature/**/*.{js,ts,jsx,tsx,mdx}",
    "./backend/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./backend/feature/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#F2F4F5",
          100: "#E4E7E9",
          200: "#C9CFD2",
          300: "#ADB7BC",
          400: "#929FA5",
          500: "#77878F",
          600: "#5F6C72",
          700: "#475156",
          800: "#303639",
          900: "#191C1F",
        },
        orange: {
          50: "#FFF3EB",
          100: "#FFE7D6",
          200: "#FFCEAD",
          300: "#FFB685",
          400: "#FF9D5C",
          500: "#FA8232",
          600: "#DE732D",
          700: "#99501F",
          800: "#663514",
          900: "#331B0A",
        },
        blue: {
          50: "#EAF6FE",
          100: "#D5EDFD",
          200: "#ABDBFA",
          300: "#81C9F8",
          400: "#57B7F5",
          500: "#2DA5F3",
          600: "#2484C2",
          700: "#1B6392",
          800: "#124261",
          900: "#092131",
        },
        green: {
          50: "#EAF7E9",
          100: "#D5F0D3",
          200: "#ABE0A7",
          300: "#81D17C",
          400: "#57C150",
          500: "#2DB224",
          600: "#248E1D",
          700: "#1B6B16",
          800: "#12470E",
          900: "#EAF6FE",
        },
        yellow: {
          50: "#FBF4CE",
          100: "#FBF4CE",
          200: "#F7E99E",
          300: "#F3DE6D",
          400: "#EFD33D",
          500: "#EBC80C",
          600: "#BCA00A",
          700: "#8D7807",
          800: "#5E5005",
          900: "#2F2802",
        },
        red: {
          50: "#FDEEEE",
          100: "#F8BCBC",
          200: "#F8BCBC",
          300: "#F59B9B",
          400: "#F17979",
          500: "#EE5858",
          600: "#BE4646",
          700: "#8F3535",
          800: "#5F2323",
          900: "#301212",
        },
        primaryBackend: {
          900: "#03132b",
          800: "#062657",
          700: "#083982",
          600: "#0b4cae",
          500: "#005ce8",
          400: "#3e7fe1",
          300: "#6e9fe8",
          200: "#9fbff0",
          100: "#cfdff7",
          50: "#f0f6ff",
        },
        secondaryBackend: {
          900: "#333014",
          800: "#666129",
          700: "#99913d",
          600: "#ccc252",
          500: "#fff266",
          400: "#fff585",
          300: "#fff7a3",
          200: "#fffac2",
          100: "#fffce0",
          50: "#fffef0",
        },
        successBackend: {
          900: "#032314",
          800: "#064627",
          700: "#09693b",
          600: "#0c8c4e",
          500: "#0faf62",
          400: "#3fbf81",
          300: "#6fcfa1",
          200: "#9fdfc0",
          100: "#cfefe0",
          50: "#e7f7ef",
        },
        warningBackend: {
          900: "#331e00",
          800: "#663c00",
          700: "#995900",
          600: "#cc7700",
          500: "#ff9500",
          400: "#ffaa33",
          300: "#ffbf66",
          200: "#ffd599",
          100: "#ffeacc",
          50: "#fff4e6",
        },
        dangerBackend: {
          900: "#2e0e0e",
          800: "#5d1c1c",
          700: "#8b2a2a",
          600: "#ba3838",
          500: "#e84646",
          400: "#ed6b6b",
          300: "#f19090",
          200: "#f6b5b5",
          100: "#fadada",
          50: "#fdeded",
        },
        grayBackned: {
          900: "#191b1c",
          800: "#313638",
          700: "#4a5154",
          600: "#626c70",
          500: "#7b878c",
          400: "#959fa3",
          300: "#b0b7ba",
          200: "#cacfd1",
          100: "#e5e7e8",
          50: "#f5f6f7",
          10: " #fff",
        },
      },
    },
    fontFamily: {
      publicSans: ["var(--font-public-sans)"],
      poppins: ["var(--font-poppins-sans)", ...fontFamily.sans],
      arial: "Arial, sans-serif",
    },
    textShadow: {
      default: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      lg: "4px 4px 8px rgba(0, 0, 0, 0.5)",
      xl: "6px 6px 12px rgba(0, 0, 0, 0.5)",
    },
    backgroundImage: {
      "ocean-depth":
        "linear-gradient(to bottom, #0575E6 0%, #02298A 85%, #021B79 100%)",
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: AddUtilitiesFunction }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow-lg": {
          textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-xl": {
          textShadow: "6px 6px 12px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;
