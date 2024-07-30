import {
  MotionValue,
  motion,
  useAnimate,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { SiMeteor } from "react-icons/si";

import Button from "../ui/Button";
import Stars from "./Stars";

function supportsBackdropFilter() {
  return CSS.supports("backdrop-filter: blur(10px)");
}

const MotionSiMeteor = motion(SiMeteor, {
  forwardMotionProps: true,
});

const MotionIoMdClose = motion(IoMdClose, {
  forwardMotionProps: true,
});

interface Props {
  color: MotionValue<string>;
  backgroundColor: MotionValue<string>;
  handleClickAboutLink: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleClickContactLink: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleResumeButtonClick: () => void;
}

function MobileNav(props: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleButtonScope, toggleButtonAnimate] = useAnimate();
  const [color, setColor] = useState(props.color.get());
  const [browserSupportsBackdropFilter, setBrowserSupportsBackdropFilter] =
    useState(false);

  useMotionValueEvent(props.color, "change", (value) => {
    setColor(value);
  });

  useEffect(() => {
    setBrowserSupportsBackdropFilter(supportsBackdropFilter());
  }, []);

  const animateToggleButton = useCallback(
    async (isOpen: boolean) => {
      if (isOpen) {
        await toggleButtonAnimate(toggleButtonScope.current, {
          rotate: -45,
        });

        await toggleButtonAnimate(
          toggleButtonScope.current,
          {
            x: "120vw",
          },
          {
            bounce: 0,
          }
        );
      } else {
        await toggleButtonAnimate(toggleButtonScope.current, {
          rotate: 135,
        });

        await toggleButtonAnimate(
          toggleButtonScope.current,
          {
            x: 0,
          },
          {
            bounceDamping: 10,
          }
        );
      }
    },
    [toggleButtonAnimate, toggleButtonScope]
  );

  useEffect(() => {
    animateToggleButton(isOpen);
  }, [animateToggleButton, isOpen]);

  const toggleMenu = () => {
    setIsOpen((currentValue) => {
      return !currentValue;
    });
  };

  return (
    <>
      <motion.button
        onClick={toggleMenu}
        className="text-white p-4 z-10 rotate-[135deg]"
        ref={toggleButtonScope}
      >
        <MotionSiMeteor size={44} color={color} />
      </motion.button>
      <motion.div
        initial={{ transform: "translateX(-100%)" }}
        animate={{
          transform: isOpen ? "translateX(-6%)" : "translateX(-100%)",
        }}
        transition={{ duration: 0.3, delay: isOpen ? 0.6 : 0 }}
        className="fixed top-0 left-0 h-full w-full z-10 bg-gray-100 py-12 pl-[12vw] text-white border-r-2 border-white mobile-nav-container"
        style={
          browserSupportsBackdropFilter
            ? {
                background: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(10px)",
              }
            : {
                backgroundColor: "rgba(186, 183, 189, 1)",
              }
        }
      >
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <Stars />
        </div>
        <button onClick={toggleMenu} className="absolute top-0 right-0 p-4">
          <MotionIoMdClose size={24} color={color} />
        </button>
        <motion.ul style={{ color }} className="text-4xl space-y-8">
          <li>
            <Link
              href="/"
              onClick={(e) => {
                toggleMenu();
                props.handleClickAboutLink(e);
              }}
            >
              ABOUT ME
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={(e) => {
                toggleMenu();
                props.handleClickContactLink(e);
              }}
            >
              CONTACT ME
            </Link>
          </li>
        </motion.ul>

        <div className="text-xl absolute bottom-8 pl-[6%]">
          <Button onClick={props.handleResumeButtonClick}>
            Check Out My Resume!
          </Button>
        </div>
      </motion.div>
    </>
  );
}

export default MobileNav;
