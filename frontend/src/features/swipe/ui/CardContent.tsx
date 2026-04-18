"use client";

import { X, Heart } from "lucide-react";
import { Button } from "@/shared/ui/button";
import PetProfile from "@/entities/swipe/PetProfile"


interface CardContentProps {
  profile: PetProfile;
  onLike?: () => void;
  onDislike?: () => void;
}


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

          <div className="ml-4 mt-2">
            <h2 className="text-[40px] font-bold text-[#0F1B65] dark:text-white">
              {profile.name}
            </h2>
            <p className="flex text-[20px] text-[#0F1B65] items-center font-bold mt-4">
              Возраст: <p className="ml-4 mt-1 text-[17px] text-[#0F1B65] font-light">{profile.age} { profile.age < 5 ? "года" : "лет"}</p>
            </p>
            <p className="flex text-[20px] text-[#0F1B65] items-center font-bold mt-3">
              Порода: <p className="ml-4 mt-1 text-[17px] text-[#0F1B65] font-light">{profile.breed}</p>
            </p>
            <h3 className="flex text-[20px] text-[#0F1B65] items-center font-bold mt-3">
              Описание:
            </h3>
            <p className="text-[17px] text-[#0F1B65] font-light mt-1">
              {profile.bio}
            </p>
            <p className="flex text-[20px] text-[#0F1B65] items-center font-light mt-4 underline">
              Подробнее
            </p>
          </div>

          <Button className="bg-[#387CCD] h-[44px] rounded-[20px] w-[242px] font-normal mb-2 self-center">
            Связаться с владельцем
          </Button>
        </div>
      </div>
    </div>
  );
};