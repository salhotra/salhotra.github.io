import { motion } from "framer-motion";

/**
 * A blinking cursor component.
 * The blinking animation is not transitioned smoothly by design.
 * When animate is false, the cursor is visible but not blinking.
 * @returns JSX.Element
 */
function BlinkingCursor({
  animate = true,
}: {
  animate?: boolean;
}): JSX.Element {
  return (
    <motion.span
      style={{ display: "inline-block" }}
      animate={{ opacity: animate ? 0 : 1 }}
      transition={{ duration: 0.5, repeat: Infinity }}
    >
      _
    </motion.span>
  );
}

export default BlinkingCursor;
