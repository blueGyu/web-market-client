"use client";

import type { ChildrenNode } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlyoutAnimation extends ChildrenNode {
  init_id: string;
  init_class: string;
  end: string;
  initState: boolean;
  onComplete: () => void;
}

interface Position {
  x: number;
  y: number;
}

export default function FlyoutAnimation({
  init_id,
  init_class,
  end,
  initState,
  children,
  onComplete,
}: FlyoutAnimation) {
  const [initPosition, setInitPosition] = useState<Position>({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const initTarget = document
      .getElementById(init_id)!
      .querySelector(init_class);
    if (initTarget) {
      const rect = initTarget.getBoundingClientRect();
      const x = rect.left + window.screenX;
      const y = rect.top + window.screenY;
      console.log(x, y);
      setInitPosition({ x, y });
    }

    const endTarget = document.querySelector(end);
    if (endTarget) {
      const rect = endTarget.getBoundingClientRect();
      const x = rect.left + window.screenX;
      const y = rect.top + window.screenY;
      console.log(x, y);
      setEndPosition({ x, y });
    }
  }, [init_id, init_class, end]);

  const handleAnimationComplete = () => {
    onComplete();
    setInitPosition({ x: 0, y: 0 });
    setEndPosition({ x: 0, y: 0 });
  };

  return (
    <>
      {initState && (
        <AnimatePresence>
          <motion.div
            className="fixed min-w-11 min-h-11 bg-black text-white z-30"
            initial={{
              top: initPosition.y,
              left: initPosition.x,
              opacity: 1,
            }}
            animate={{
              top: endPosition.y,
              left: endPosition.x,
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            onAnimationComplete={handleAnimationComplete}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
