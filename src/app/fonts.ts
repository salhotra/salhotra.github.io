import localFont from "next/font/local";
import { Azeret_Mono } from "next/font/google";

export const alroBold = localFont({
  src: "../fonts/alro-alro-bold-700.ttf",
});

export const kiMedium = localFont({
  src: "../fonts/Ki-Medium.ttf",
});

export const azeretMono = Azeret_Mono({
  weight: "600",
  subsets: ["latin"],
});
