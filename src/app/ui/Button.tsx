import { motion, motionValue, MotionValue } from "framer-motion";

interface Props {
  children: string;
  textColor?: MotionValue<string>;
  backgroundColor?: MotionValue<string>;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

function Button({
  type,
  children,
  onClick,
  textColor = motionValue("black"),
  backgroundColor = motionValue("white"),
}: Props) {
  return (
    <button className="font-medium" onClick={onClick} type={type}>
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

export default Button;
