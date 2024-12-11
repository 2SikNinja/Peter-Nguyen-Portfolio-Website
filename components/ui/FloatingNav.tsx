"use client";
import React, { useState, JSX } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../../lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true); // Always show when near the top
      } else {
        if (direction < 0) {
          setVisible(true); // Scrolling down
        } else {
          setVisible(false); // Scrolling up
        }
      }
    }
  });

  return (
    <motion.div
      initial={{
        opacity: 1,
        y: 0,
      }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -50,
      }}
      transition={{
        opacity: { duration: 0.5 }, // Slower fade
        y: { duration: 0.3 }, // Movement transition
      }}
      className={cn(
        "flex max-w-fit fixed top-10 inset-x-0 mx-auto border rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-10 py-5 items-center justify-center space-x-4 border-white/[0.2] bg-black-100",
        className
      )}
    >
      {navItems.map((navItem: any, idx: number) => (
        <Link
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="text-sm !cursor-pointer">{navItem.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};
