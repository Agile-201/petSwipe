"use client";

import { X, Heart } from "lucide-react";
import { Button } from "@/shared/ui/button";
import PetProfile from "@/entities/pets/PetProfile"
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface PetCardContextProps {
  profile: PetProfile;
  onLike?: () => void;
  onDislike?: () => void;
}

export const PetCardContext = ({ profile, onLike, onDislike }: PetCardContextProps) => {
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-1 flex-col md:flex-row">
        
        <div className="relative h-80 md:h-auto md:w-1/2">
          <img
            src={profile.image}
            alt={profile.name}
            className="h-full w-full object-cover select-none"
            draggable={false}
          />
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between md:gap-4">
            <button
              onClick={onDislike}
              className="rounded-full bg-white p-3 text-black backdrop-blur-sm transition-all hover:bg-red-300 hover:scale-110"
              aria-label="Dislike"
            >
              <X size={28} className="text-red-300 hover:text-white md:size-9" />
            </button>
            <button
              onClick={onLike}
              className="rounded-full bg-white p-3 text-black backdrop-blur-sm transition-all hover:bg-green-300 hover:scale-110"
              aria-label="Like"
            >
              <Heart size={28} className="text-green-300 hover:text-white md:size-9" />
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-grow p-4 md:w-1/2 bg-[#759ACF40]">
          <div className="ml-0 md:ml-4 md:mt-2">
            <h2 className="text-3xl font-bold text-[#0F1B65] dark:text-white md:text-[40px]">
              {profile.name}
            </h2>
            <p className="mt-4 flex flex-wrap items-center text-lg font-bold text-[#0F1B65] md:text-[20px]">
              Возраст: 
              <span className="ml-2 mt-0 text-base font-light md:ml-4 md:mt-1 md:text-[17px]">
                {profile.age} {profile.age < 5 ? "года" : "лет"}
              </span>
            </p>
            <p className="mt-3 flex flex-wrap items-center text-lg font-bold text-[#0F1B65] md:text-[20px]">
              Порода: 
              <span className="ml-2 mt-0 text-base font-light md:ml-4 md:mt-1 md:text-[17px]">
                {profile.breed}
              </span>
            </p>
            <h3 className="mt-3 text-lg font-bold text-[#0F1B65] md:text-[20px]">
              Описание:
            </h3>
            <p className="mt-1 text-base font-light text-[#0F1B65] md:text-[17px]">
              {profile.bio}
            </p>
            <h3 className="mt-3 text-lg font-bold text-[#0F1B65] md:text-[20px]">
              Особенности питомца:
            </h3>
            <p className="mt-1 text-base font-light text-[#0F1B65] md:text-[17px]">
              {profile.extraInfo}
            </p>
            <Link href="pet/18371236">
              <p className="mt-4 text-base font-light text-[#0F1B65] underline md:text-[20px]">
                Подробнее
              </p>
            </Link>
          </div>

          <Button
            onClick={() => router.push('/chats')}
            className="mt-auto h-11 w-full max-w-[242px] self-center rounded-[20px] bg-[#387CCD] font-normal hover:bg-[#0F1B65] md:w-[242px]"
          >
            Связаться с владельцем
          </Button>
        </div>
      </div>
    </div>
  );
};