import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import NextLink from "next/link";

function Link({
  href,
  onClick,
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}): JSX.Element {
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
    <NextLink
      href={href || "/"}
      target={href?.startsWith("http") ? "_blank" : "_self"}
      className={clsx("relative pb-[2px]", className)}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <motion.div
        className="h-[1px] absolute left-0 right-0 bottom-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"
        initial={{ width: 0 }}
        animate={animationControls}
        transition={{ duration: 0.4 }}
      />
    </NextLink>
  );
}

export default Link;
