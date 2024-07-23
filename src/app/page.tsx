"use client";

import clsx from "clsx";
import { kiMedium } from "./fonts";
import Stars from "./components/Stars";
import TypedText from "./components/TypedText";
import About from "./components/About";
import { useRef } from "react";
import Header from "./components/Header";
import Contact from "./components/Contact";

export default function Home(): JSX.Element {
  const firstSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const contactSectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-auto relative">
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
      <section className="w-full bg-white" ref={aboutSectionRef}>
        <About />
      </section>
      <section className="w-full h-96 pt-24 bg-white" ref={contactSectionRef}>
        <Contact />
      </section>
    </main>
  );
}
