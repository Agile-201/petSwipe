"use client";

import { useState } from "react";
import { CardContent, TinderCard } from "@/features/swipe";


const cardData = [
  {
    id: 1,
    name: "Василий",
    age: 4,
    breed: 'Мейн-кун',
    bio: "добрый великан среди кошек с царственной внешностью и мягким, собачьим по преданности характером.",
    image: "https://lh6.googleusercontent.com/proxy/78d8tcE2bEZSulevM8xnKPoxjp-i1hG93HRbVf2X23ILge1lCuuQA1YHD0lt3ZLsfZQcHKAqZ6FVYyYhn9RDmPFw8FtCMAonTOKJPAY",
  },
  {
    id: 2,
    name: "Барсик",
    age: 8,
    breed: 'нет информации',
    bio: "добрый великан среди кошек с царственной внешностью и мягким, собачьим по преданности характером.",
    image: "https://lh6.googleusercontent.com/proxy/78d8tcE2bEZSulevM8xnKPoxjp-i1hG93HRbVf2X23ILge1lCuuQA1YHD0lt3ZLsfZQcHKAqZ6FVYyYhn9RDmPFw8FtCMAonTOKJPAY",
  },
  {
    id: 3,
    name: "Василий",
    age: 4,
    breed: 'Мейн-кун',
    bio: "добрый великан среди кошек с царственной внешностью и мягким, собачьим по преданности характером.",
    image: "https://lh6.googleusercontent.com/proxy/78d8tcE2bEZSulevM8xnKPoxjp-i1hG93HRbVf2X23ILge1lCuuQA1YHD0lt3ZLsfZQcHKAqZ6FVYyYhn9RDmPFw8FtCMAonTOKJPAY",
  },

];


export const CardSwiper = () => {
  const [cards, setCards] = useState(cardData);

  const handleSwipe = (direction: "left" | "right", card: (typeof cardData)[0]) => {
    console.log(`Swipe ${direction} on ${card.name}`);
    setCards((prev) => prev.slice(1));
  };

  if (cards.length === 0) {
    return (
      <div className="flex h-[600px] w-[700px] items-center justify-center">
        <p className="text-gray-500">Нет больше анкет</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[600px] w-[700px] mb-20">
      {cards.map((card, index) => (
        <TinderCard
          key={card.id}
          profile={card}
          onSwipe={(dir) => handleSwipe(dir, card)}
          isActive={index === 0}
        />
      ))}
    </div>
  );
};