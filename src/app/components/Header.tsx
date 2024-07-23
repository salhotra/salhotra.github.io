import clsx from "clsx";
import {
  useScroll,
  useTransform,
  motion,
  useAnimation,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import usePageHeight from "../hooks/usePageHeight";

export const HeaderHeightPx = 72;
const ResumeFileName = "Nishant Salhotra - Software Engineer - Resume.pdf";

const Theme = {
  light: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    textColor: "rgba(0, 0, 0, 1)",
    buttonTextColor: "rgba(0, 0, 0, 1)",
    buttonBackgroundColor: "rgba(255, 255, 255, 1)",
  },
  dark: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    textColor: "rgba(255, 255, 255, 1)",
    buttonTextColor: "rgba(255, 255, 255, 1)",
    buttonBackgroundColor: "rgba(0, 0, 0, 1)",
  },
};

function scrollToSection(sectionRef: React.RefObject<HTMLDivElement | null>) {
  if (sectionRef.current) {
    const topOffset = sectionRef.current.offsetTop;
    window.scrollTo({ top: topOffset - 160, behavior: "smooth" });
  } else {
    alert("Section not found");
  }
}

/**
 * ----------------------------------------
 * HeaderLink Component
 * ----------------------------------------
 */

function HeaderLink({
  href,
  onClick,
  children,
}: {
  href: string;
  children: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const animationControls = useAnimation();

  const handleMouseEnter = () => {
    animationControls.start({ width: "100%" });
  };

  const handleMouseLeave = () => {
    animationControls.start({ width: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    animationControls.stop();
  };

  return (
    <Link
      href={href}
      className="relative top-2"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <motion.div
        className="h-[1px] bg-white absolute left-0 right-0 bottom-0 top-7 bg-gradient-to-r from-orange-500 to-purple-500"
        initial={{ width: 0 }}
        animate={animationControls}
        transition={{ duration: 0.4 }}
      />
    </Link>
  );
}

/**
 * ----------------------------------------
 * HeaderButton Component
 * ----------------------------------------
 */

function HeaderButton({
  children,
  onClick,
  textColor,
  backgroundColor,
}: {
  children: string;
  textColor: MotionValue<string>;
  backgroundColor: MotionValue<string>;
  onClick?: () => void;
}) {
  return (
    <button className="font-medium" onClick={onClick}>
      <div className="bg-gradient-to-r from-orange-500 to-purple-500 p-[1px] rounded-full">
        <motion.div
          className="rounded-full px-4 py-1"
          style={{
            color: textColor,
            backgroundColor,
          }}
        >
          {children}
        </motion.div>
      </div>
    </button>
  );
}

/**
 * ----------------------------------------
 * Header Component
 * ----------------------------------------
 */

interface Props {
  firstSectionRef: React.RefObject<HTMLDivElement | null>;
  aboutSectionRef: React.RefObject<HTMLDivElement | null>;
  contactSectionRef: React.RefObject<HTMLDivElement | null>;
}

function Header({
  firstSectionRef,
  aboutSectionRef,
  contactSectionRef,
}: Props): JSX.Element {
  const { scrollY } = useScroll();
  const firstSectionHeight = usePageHeight(firstSectionRef);

  const headerBottomTranslateY = useTransform(
    scrollY,
    [0, firstSectionHeight],
    [firstSectionHeight, 0]
  );

  const scrollYInputRange = [0, firstSectionHeight - 90, firstSectionHeight];

  const backgroundColor = useTransform(scrollY, scrollYInputRange, [
    Theme.dark.backgroundColor,
    Theme.dark.backgroundColor,
    Theme.light.backgroundColor,
  ]);

  const textColor = useTransform(scrollY, scrollYInputRange, [
    Theme.dark.textColor,
    Theme.dark.textColor,
    Theme.light.textColor,
  ]);

  const buttonTextColor = useTransform(scrollY, scrollYInputRange, [
    Theme.dark.buttonTextColor,
    Theme.dark.buttonTextColor,
    Theme.light.buttonTextColor,
  ]);

  const buttonBackgroundColor = useTransform(scrollY, scrollYInputRange, [
    Theme.dark.buttonBackgroundColor,
    Theme.dark.buttonBackgroundColor,
    Theme.light.buttonBackgroundColor,
  ]);

  const handleClickAboutLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection(aboutSectionRef);
  };

  const handleClickContactLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection(contactSectionRef);
  };

  const handleResumeButtonClick = () => {
    window.open(`/${ResumeFileName}`, "_blank");
  };

  return (
    <motion.header
      className={clsx(
        "z-10 fixed left-0 right-0 flex justify-between items-center md:px-8 px-4 bg-transparent text-white w-full"
      )}
      style={{ backgroundColor, color: textColor, height: HeaderHeightPx }}
      initial={{ backgroundColor: "transparent", color: "white" }}
    >
      <nav className="flex flex-1">
        <div className="flex flex-1 text-md font-semibold justify-between align-center">
          <div className="flex space-x-6">
            <HeaderLink href="/" onClick={handleClickAboutLink}>
              ABOUT ME
            </HeaderLink>
            <HeaderLink href="/" onClick={handleClickContactLink}>
              CONTACT ME
            </HeaderLink>
          </div>

          <div className="flex">
            <HeaderButton
              textColor={buttonTextColor}
              backgroundColor={buttonBackgroundColor}
              onClick={handleResumeButtonClick}
            >
              Check Out My Resume!
            </HeaderButton>
          </div>
        </div>
      </nav>

      {/* Header bottom line */}
      <motion.div
        className={clsx("h-[1px] bg-spaceblack absolute left-4 right-4")}
        style={{ y: headerBottomTranslateY, top: HeaderHeightPx }}
        // High initial value to hide the line initially
        initial={{ y: -10000 }}
      />
    </motion.header>
  );
}

export default Header;
