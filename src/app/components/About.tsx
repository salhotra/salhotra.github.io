import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

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

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
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
    <div
      ref={containerRef}
      className="w-full"
      style={{
        boxSizing: "border-box",
      }}
    >
      <div
        ref={testElementRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
        }}
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
  return (
    <div className="flex flex-col w-full h-full md:px-12 px-4">
      <h1
        className={"md:text-8xl font-bold md:my-12 my-4"}
        style={{
          fontSize: "min(10vw, 12em)",
        }}
      >
        ABOUT ME
      </h1>
      <div className="text-4xl md:mt-24 mt-6 leading-normal font-medium">
        <MaskedText
          text={`I have dedicated a decade of my life to the art of software development.
          My journey started with a simple Hello World program in C over 10 years
          ago and has since evolved into a passion for building scalable,
          maintainable, and efficient software systems. I have worked with a
          variety of technologies over the years, including JavaScript,
          TypeScript, Node, React, GraphQL, and many more.`}
        />

        <br />

        <MaskedText
          text={`I have experience
          building web applications, APIs, and testing, as well as working with
          databases and cloud services. I have built and maintained 15+ projects
          in my career, including 8 mobile applications and 9 web applications in
          a professional capacity. I have also built some personal projects,
          albeit smaller in scale and experimental in nature.`}
        />
      </div>
    </div>
  );
}

export default About;
