import { useEffect, useState } from "react";

function useContainerSize(ref: React.RefObject<HTMLDivElement | null>): {
  containerWidth: number;
  containerHeight: number;
} {
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
}

export default useContainerSize;
