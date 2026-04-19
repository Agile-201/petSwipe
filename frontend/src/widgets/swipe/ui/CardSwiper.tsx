"use client";

import { useState } from "react";
import { PetCard } from "@/features/swipe";


const cardData = [
  {
    id: 1,
    name: "Мурзик",
    age: 2,
    breed: "Сибирский",
    bio: "Энергичный и любопытный, обожает играть с бумажками и спать в самых неожиданных местах.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/06/Sibirische-Katze-Omega-1.jpg",
  },
  {
    id: 2,
    name: "Симба",
    age: 6,
    breed: "Британская короткошёрстная",
    bio: "Спокойный и важный аристократ, который предпочитает наблюдать за миром с подоконника.",
    image: "https://lapkins.ru/upload/uf/495/495883edea49a186ad723819f400bd3a.jpg",
  },
  {
    id: 3,
    name: "Рекс",
    age: 3,
    breed: "Лабрадор",
    bio: "Весёлый и преданный друг, всегда готов принести мяч или просто подставить голову для чесания.",
    image: "https://kisapes.ru/wp-content/uploads/2020/03/labrador-17.jpg",
  },
  {
    id: 4,
    name: "Барсик",
    age: 8,
    breed: 'нет информации',
    bio: "добрый великан среди кошек с царственной внешностью и мягким, собачьим по преданности характером.",
    image: "img2.png",
  },
  {
    id: 5,
    name: "Василий",
    age: 4,
    breed: 'Мейн-кун',
    bio: "добрый великан среди кошек с царственной внешностью и мягким, собачьим по преданности характером.",
    image: "img1.png",
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
      <div className="flex items-center justify-center">
        <div className="flex h-[600px] w-[700px] items-center justify-center">
          <p className="text-gray-500">Анкеты закончились!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[600px] w-[700px] mb-20">
      {cards.map((card, index) => (
        <PetCard
          key={card.id}
          profile={card}
          onSwipe={(dir) => handleSwipe(dir, card)}
          isActive={index === 0}
        />
      ))}
    </div>
  );
};