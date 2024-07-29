import clsx from "clsx";
import { useScroll, useTransform, motion } from "framer-motion";
import usePageHeight from "../hooks/usePageHeight";
import Button from "../ui/Button";
import Link from "../ui/Link";
import MobileNav from "./MobileNav";

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
    window.scrollTo({ top: topOffset, behavior: "smooth" });
  } else {
    alert("Section not found");
  }
}

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

  const mobileNavBorderBottomWidth = useTransform(
    scrollY,
    [0, firstSectionHeight - 20, firstSectionHeight],
    [0, 0, 1]
  );

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
    <>
      <motion.header
        className={clsx(
          "md:flex hidden z-10 fixed left-0 right-0 flex justify-between items-center md:px-8 px-4 bg-transparent text-white w-full"
        )}
        style={{ backgroundColor, color: textColor, height: HeaderHeightPx }}
        initial={{ backgroundColor: "transparent", color: "white" }}
      >
        <nav className="flex flex-1">
          <div className="flex flex-1 text-md font-semibold justify-between align-center">
            <div className="flex space-x-6">
              <Link onClick={handleClickAboutLink} className="top-2">
                ABOUT ME
              </Link>
              <Link onClick={handleClickContactLink} className="top-2">
                CONTACT ME
              </Link>
            </div>

            <div className="flex">
              <Button
                textColor={buttonTextColor}
                backgroundColor={buttonBackgroundColor}
                onClick={handleResumeButtonClick}
              >
                Check Out My Resume!
              </Button>
            </div>
          </div>
        </nav>
        <motion.div
          className={clsx("h-[1px] bg-spaceblack absolute left-4 right-4")}
          style={{ y: headerBottomTranslateY, top: HeaderHeightPx }}
          // High initial value to hide the line initially
          initial={{ y: -10000 }}
        />
      </motion.header>

      <motion.header
        className="md:hidden fixed top-0 left-0 right-0 bg-transparent z-10"
        style={{
          backgroundColor,
          color: textColor,
          height: HeaderHeightPx,
          borderBottomWidth: mobileNavBorderBottomWidth,
        }}
        initial={{ backgroundColor: "transparent", color: "white" }}
      >
        <MobileNav
          color={textColor}
          backgroundColor={backgroundColor}
          handleClickAboutLink={handleClickAboutLink}
          handleClickContactLink={handleClickContactLink}
          handleResumeButtonClick={handleResumeButtonClick}
        />
      </motion.header>
    </>
  );
}

export default Header;
