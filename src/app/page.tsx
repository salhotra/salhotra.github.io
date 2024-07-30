"use client";

import clsx from "clsx";
import { useRef } from "react";

import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Stars from "./components/Stars";
import TypedText from "./components/TypedText";
import { kiMedium } from "./fonts";

export default function Home(): JSX.Element {
  const firstSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const contactSectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-y-auto overflow-x-clip relative">
      <Header
        firstSectionRef={firstSectionRef}
        aboutSectionRef={aboutSectionRef}
        contactSectionRef={contactSectionRef}
      />
      <section
        ref={firstSectionRef}
        className="w-full h-[100vh] relative bg-spaceblack"
      >
        <Stars />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <h1
            className={clsx(
              kiMedium.className,
              "m-0 p-0 font-bold text-center w-full main-heading"
            )}
            style={{
              letterSpacing: "-0.1rem",
              fontSize: "min(10vw, 100px)",
            }}
          >
            <TypedText textLines={["Hello! I'm", "Nishant Salhotra"]} />
          </h1>
        </div>
      </section>
      <section
        className="w-full bg-white overflow-hidden"
        ref={aboutSectionRef}
      >
        <About />
      </section>
      <section
        className="w-full bg-white overflow-hidden"
        ref={contactSectionRef}
      >
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
