"use client"

import { HomePagePetCard } from "@/features/home/ui/HomePagePetCard";

export function OurWorkInfo() {
    return(
        <div className="flex items-center flex-col">
            <p className="text-[50px] text-[#0F1B65] font-bold mt-20">Как мы работаем?</p>

            <div className="h-[163px] w-full flex justify-center items-center gap-20 text-[#0F1B65]">
            <div className="flex flex-col justify-center items-start mt-12">
                <p className="text-[30px] font-bold">
                Регистрация
                </p>
                <p className="w-[140px] text-[16px] font-light">
                Зарегестрируйся на нашей платформе и начни поиск своего хвостика!
                </p>
            </div>

            <div className="flex flex-col justify-center items-start">
                <p className="text-[30px] font-bold">
                Лайкни первым
                </p>
                <p className="w-[200px] text-[16px] font-light">
                Посмотри анкеты и поставь сердчеко хвостику
                </p>
            </div>

            <div className="flex flex-col justify-center items-start mt-13">
                <p className="text-[30px] font-bold">
                Перейди в чат
                </p>
                <p className="w-[200px] text-[16px] font-light">
                Понравился хвостик? Обсуди детали вашего воссоединения вместе с хозяином или питомником
                </p>
            </div>
            </div>

            <p className="text-[50px] text-[#0F1B65] font-bold mt-30">Наши счастливые хвостики</p>

            <p className="text-[24px] text-[#0F1B65] font-light mt-4 text-center w-[800px] text-start">
            Благодаря нашему сервису многие хвостики попали в счастливые и любящие семьи. Вот некоторые из наших хвостиков:
            </p>

            <div className="flex justify-center items-center gap-8 text-[#0F1B65] rounded-[25px] pt-6 mb-19">
            <HomePagePetCard
                name="Луша"
                kindOfPet="Кошечка"
                age={7}
                color="трёхцветная"
                temper="Контактная, ласковая, игривая"
                takingConditions="Сетки антикошки, отсутствие самовыгула, одной кошкой"
            />

            <HomePagePetCard
                name="Аркадий"
                kindOfPet="Кот"
                age={4}
                color="трёхцветная"
                temper="Спокойный джентельмен"
                takingConditions="Выгуливать не требуется"
                imageUrl="https://preview.redd.it/why-does-my-cat-alwaysmeow-after-i-sneeze-v0-4w7ewux6ur8b1.jpg?width=640&crop=smart&auto=webp&s=4aa14741dcea14864ab9c066a12642d764d96a93"
            />

            <HomePagePetCard
                name="Пётр"
                kindOfPet="Собака"
                age={3}
                color="золотой"
                temper="Азорной непоседливый"
                takingConditions="Любите и кормите"
                imageUrl="https://pets-start.by/upload/iblock/c5f/m3ttlkezjbrre3ibtwz7wue3mjh3vmk2.jpg"
            />
            </div>
        </div>
    )
}