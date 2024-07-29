import { useCallback, useState } from "react";
import {
  motion,
  MotionValue,
  useAnimate,
  useMotionValueEvent,
} from "framer-motion";
import { SiMeteor } from "react-icons/si";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Button from "../ui/Button";

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

  useMotionValueEvent(props.color, "change", (value) => {
    setColor(value);
  });

  // const toggleBackgroundDivScrolling = (isSidebarOpen: boolean) => {
  //   // Disable scrolling when menu is open.
  //   // This is a hacky way to disable scrolling which is not ideal but
  //   // works for this small project. In a real-world project, we should
  //   // not manipulate the DOM directly like this.
  //   if (isSidebarOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // };

  const animateToggleButton = useCallback(
    async (isOpen: boolean) => {
      if (isOpen) {
        await toggleButtonAnimate(toggleButtonScope.current, {
          rotate: -45,
          animationDuration: 0.1,
        });

        await toggleButtonAnimate(toggleButtonScope.current, {
          x: 1000,
          animationDuration: 0.5,
        });
      } else {
        await toggleButtonAnimate(toggleButtonScope.current, {
          rotate: 135,
          animationDuration: 0,
        });

        await toggleButtonAnimate(toggleButtonScope.current, {
          x: 0,
          animationDuration: 0.2,
          // animationDelay: 0,
          // type: "decay",
        });
      }
    },
    [toggleButtonAnimate, toggleButtonScope]
  );

  const toggleMenu = () => {
    setIsOpen((currentValue) => {
      const newValue = !currentValue;
      // Do we even need to do this?
      // toggleBackgroundDivScrolling(newValue);
      animateToggleButton(newValue);
      return newValue;
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
        transition={{ duration: 0.3, delay: isOpen ? 0.4 : 0 }}
        className="fixed top-0 left-0 h-full w-full z-10 bg-gray-100 py-12 pl-[12vw] text-white border-r-2 border-white"
        style={{
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
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
