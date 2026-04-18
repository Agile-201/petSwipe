"use client";

import { useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform, animate } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { PetCardContext } from './PetCardContext'
import PetProfile from "@/entities/swipe/PetProfile"


interface PetCardProps {
  profile: PetProfile;
  onSwipe: (direction: "left" | "right") => void;
  isActive: boolean;
}


export const PetCard = ({ profile, onSwipe, isActive }: PetCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 0.5, 1, 0.5, 0]);

  const swipeLeft = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    animate(x, -300, { duration: 0.3, ease: "easeOut" }).then(() => {
      onSwipe("left");
      x.set(0);
    });
  };

  const swipeRight = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    animate(x, 300, { duration: 0.3, ease: "easeOut" }).then(() => {
      onSwipe("right");
      x.set(0);
    });
  };

  const handleDragEnd = (event: MouseEvent, info: PanInfo) => {
    if (isAnimating) return;
    if (info.offset.x > 100) {
      swipeRight();
    } else if (info.offset.x < -100) {
      swipeLeft();
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => swipeLeft(),
    onSwipedRight: () => swipeRight(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (!isActive) return null;

  return (
    <motion.div
      {...swipeHandlers}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      style={{ x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      className="absolute h-[600px] w-[700px] cursor-grab active:cursor-grabbing"
    >
      <PetCardContext profile={profile} onLike={swipeRight} onDislike={swipeLeft} />
    </motion.div>
  );
};