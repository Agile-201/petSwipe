"use client";

import { useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform, animate } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { X, Heart } from "lucide-react";

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  image: string;
  breed: string;
}

interface TinderCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
  isActive: boolean;
}

interface CardContentProps {
  profile: Profile;
  onLike?: () => void;
  onDislike?: () => void;
}


export const TinderCard = ({ profile, onSwipe, isActive }: TinderCardProps) => {
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
      <CardContent profile={profile} onLike={swipeRight} onDislike={swipeLeft} />
    </motion.div>
  );
};



export const CardContent = ({ profile, onLike, onDislike }: CardContentProps) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="relative h-64 md:h-auto md:w-1/2">
          <img
            src={profile.image}
            alt={profile.name}
            className="h-full w-full object-cover select-none"
            draggable={false}
          />
          <div className="absolute bottom-4 left-4 flex gap-49">
            <button
              onClick={onDislike}
              className="rounded-full bg-white p-3 text-black backdrop-blur-sm transition-all hover:bg-red-500 hover:scale-110"
              aria-label="Dislike"
            >
              <X size={36} />
            </button>
            <button
              onClick={onLike}
              className="rounded-full bg-white p-3 text-black backdrop-blur-sm transition-all hover:bg-green-500 hover:scale-110"
              aria-label="Like"
            >
              <Heart size={36} />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between p-4 md:w-1/2 bg-[#759ACF40]">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {profile.name}, {profile.age}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {profile.breed}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">
              О себе
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {profile.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};