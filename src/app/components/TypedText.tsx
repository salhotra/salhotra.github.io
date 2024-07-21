import clsx from "clsx";
import { motion } from "framer-motion";

const CHARACTER_DELAY_SECONDS = 0.1;

function getCharsLength(lines: string[]) {
  return lines.reduce((acc, line) => acc + line.length, 0);
}

function TypedCharacter({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      style={{ display: "inline-block" }}
      className={clsx(char === " " && "mr-[0.3em]")}
    >
      {char}
    </motion.span>
  );
}

function TypedText({ textLines }: { textLines: string[] }) {
  const typedLines = textLines.map((line, lineIndex) => {
    const typedText = line.split("").map((char, charIndex) => {
      const prevLines = textLines.slice(0, lineIndex);
      const prevCharsLength = getCharsLength(prevLines);
      const delay = (charIndex + prevCharsLength) * CHARACTER_DELAY_SECONDS;

      return <TypedCharacter key={delay} char={char} delay={delay} />;
    });

    return (
      <div key={lineIndex} className="flex justify-center">
        {typedText}
      </div>
    );
  });

  return <>{typedLines}</>;
}

export default TypedText;
