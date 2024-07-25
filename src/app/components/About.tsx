import { useRef, useState, useEffect, Fragment } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { HeaderHeightPx } from "./Header";
import { MobileWidthPx } from "../constants";
import SectionHeading from "../ui/SectionHeading";
import useWindowSize from "../hooks/useWindowSize";

const aboutMe: string[] = [
  `I have dedicated a decade of my life to the art of software development.
  My journey started with a simple Hello World program in C over 10 years
  ago and has since evolved into a passion for building scalable,
  maintainable, and efficient software systems. I have worked with a
  variety of technologies over the years, including JavaScript,
  TypeScript, Node, React, GraphQL, and many more.`,

  `I have experience
  building web applications, APIs, and testing, as well as working with
  databases and cloud services. I have built and maintained 15+ projects
  in my career, including 8 mobile applications and 9 web applications in
  a professional capacity. I have also built some personal projects,
  albeit smaller in scale and experimental in nature.`,
];

const useContainerSize = (ref: React.RefObject<HTMLDivElement>) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current.clientWidth);
      setContainerHeight(ref.current.clientHeight);
    }

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
        setContainerHeight(entry.contentRect.height);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return { containerWidth, containerHeight };
};

const splitTextIntoLines = (
  text: string,
  containerWidth: number,
  ref: React.RefObject<HTMLDivElement>
) => {
  if (!containerWidth) return [];

  const words = text.split(" ");
  const lines = [];
  let currentLine: string[] = [];
  const testElement: HTMLDivElement | null = ref.current;

  words.forEach((word) => {
    currentLine.push(word);
    if (!testElement) return;

    testElement.textContent = currentLine.join(" ");

    if (testElement.clientWidth >= containerWidth - 5) {
      currentLine.pop();
      lines.push(currentLine.join(" "));
      currentLine = [word];
    }
  });

  lines.push(currentLine.join(" "));

  return lines;
};

function MaskedText({ text }: { text: string }) {
  const containerRef = useRef(null);
  // TODO: Rename
  const testElementRef = useRef<HTMLDivElement | null>(null);

  const { containerWidth } = useContainerSize(containerRef);
  const [lines, setLines] = useState<string[]>([]);
  const { height: windowHeight } = useWindowSize();
  const unmaskThresholdStart = windowHeight * 0.5;
  const unmaskThresholdEnd = unmaskThresholdStart - 50;

  useEffect(() => {
    setLines(splitTextIntoLines(text, containerWidth, testElementRef));
  }, [text, containerWidth]);

  return (
    <div ref={containerRef} className="w-full box-border">
      <div
        ref={testElementRef}
        className="absolute whitespace-nowrap invisible"
      />
      {lines.map((line, index) => (
        <TextLine
          key={line + index}
          line={line}
          maskingPositions={[unmaskThresholdStart, unmaskThresholdEnd]}
        />
      ))}
    </div>
  );
}

function TextLine({
  line,
  maskingPositions,
}: {
  line: string;
  maskingPositions: [number, number];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const y = useMotionValue(0);
  const { scrollY } = useScroll();
  const [initialY, setInitialY] = useState(0);

  const width = useTransform(y, maskingPositions, ["100%", "0%"]);

  useEffect(() => {
    if (!ref.current) return;

    setInitialY(ref.current.offsetTop);
  }, [line]);

  useMotionValueEvent(scrollY, "change", (latestScrollY) => {
    y.set(initialY - latestScrollY);
  });

  return (
    <div className="relative" ref={ref}>
      {line}

      <motion.div
        className="absolute top-0 right-0 h-full bg-white opacity-90"
        style={{
          width,
        }}
      />
    </div>
  );
}

function About() {
  const textWrapperRef = useRef<HTMLDivElement | null>(null);
  const windowSize = useWindowSize();
  const headingVerticalMargin =
    windowSize.width > MobileWidthPx ? windowSize.height * 0.15 : 32;

  return (
    <div className="flex flex-col w-full h-full">
      <SectionHeading
        marginTop={headingVerticalMargin + HeaderHeightPx}
        marginBottom={headingVerticalMargin}
      >
        ABOUT ME
      </SectionHeading>
      <div ref={textWrapperRef}>
        <div className="text-4xl leading-normal font-medium md:mx-8 mx-4">
          {aboutMe.map((text, index) => (
            <Fragment key={index}>
              <MaskedText text={text} />
              {index < aboutMe.length - 1 && <br />}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
