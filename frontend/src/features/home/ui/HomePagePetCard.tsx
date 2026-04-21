"use client";

import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";

interface HomePagePetCardProps {
  name: string;
  kindOfPet: string;
  age: number;
  color: string;
  temper: string;
  takingConditions: string;
  imageUrl?: string;
}

export function HomePagePetCard({
  name,
  kindOfPet,
  age,
  color,
  temper,
  takingConditions,
  imageUrl = "mainCat.png",
}: HomePagePetCardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col h-[505px] w-[250px] rounded-[25px] bg-[#D8ECFF80]">
      <img
        src={imageUrl}
        className="w-full h-[200px] object-cover rounded-t-[25px]"
        alt={name}
      />

      <div className="flex flex-col flex-1 pt-4 pl-4 items-start">
        <p className="text-[17px]">{kindOfPet}</p>
        <p className="font-bold mb-2 text-[19px]">{name}</p>
        <p className="font-light mb-2 text-[14px]">
          Возраст: {age} {age > 4 ? "лет" : "года"}
        </p>
        <p className="font-light mb-2 text-[14px]">Окрас: {color}</p>
        <p className="text-start font-light mb-2 text-[14px]">Характер: {temper}</p>
        <p className="text-start font-light text-[14px]">
          Требования к пристройству: {takingConditions}
        </p>

        <Button
          className="mt-auto bg-[#387CCD] h-[34px] rounded-[15px] w-[160px] font-normal mb-2 self-end mr-5 text-[13px]"
        >
          Теперь с семьёй
        </Button>
      </div>
    </div>
  );
}