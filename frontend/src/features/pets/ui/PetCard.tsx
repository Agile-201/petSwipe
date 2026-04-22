'use client'

interface PetCardProps {
    name: string;
    category: string;
    age: number;
    breed: string;
    description: string;
    features: string;
    imageUrl?: string;
}

export function PetCard({
    name,
    category,
    age,
    breed,
    description,
    features,
    imageUrl = "/img1.png",
}: PetCardProps) {
    return (
        <div className="px-3">
        <div className="w-full max-w-[800px] bg-[#D8ECFF] mx-20 rounded-[30px] mb-15 mx-auto">
            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 pt-6 md:pt-13 px-4 md:px-0">
                <div className="flex justify-center">
                    <img
                        src={imageUrl}
                        className="w-full max-w-[300px] h-auto md:h-[330px] object-cover rounded-[30px] mb-5"
                        alt="loadImage"
                    />
                </div>

                <div className="flex flex-col text-[#0F1B65] w-full md:w-auto">
                    <p className="mb-2 font-[700]">Имя питомца:</p>
                    <div className="rounded-[20px] h-[44px] p-[20px] flex items-center text-[#0F1B65] text-[16px] bg-white w-full md:w-[400px] mb-4">
                        {name}
                    </div>

                    <p className="mb-2 font-[700]">Категория питомца:</p>
                    <div className="rounded-[20px] h-[44px] p-[20px] flex items-center text-[#0F1B65] text-[16px] bg-white w-full md:w-[400px] mb-4">
                        {category}
                    </div>

                    <p className="mb-2 font-[700]">Возраст:</p>
                    <div className="rounded-[20px] h-[44px] p-[20px] flex items-center text-[#0F1B65] text-[16px] bg-white w-full md:w-[400px] mb-4">
                        {age}
                    </div>

                    <p className="mb-2 font-[700]">Порода:</p>
                    <div className="rounded-[20px] h-[44px] p-[20px] flex items-center text-[#0F1B65] text-[16px] bg-white w-full md:w-[400px] mb-6">
                        {breed}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start text-[#0F1B65] px-4 md:px-10 pb-6">
                <p className="mb-2 font-[700]">Описание питомца (внешность, характер):</p>
                <div className="rounded-[20px] p-[20px] min-h-[70px] flex items-start text-[#0F1B65] text-[16px] bg-white w-full mb-4">
                    {description}
                </div>

                <p className="mb-2 font-[700]">Особенности питомца (заболевания, ограничения):</p>
                <div className="rounded-[20px] p-[20px] min-h-[70px] flex items-start text-[#0F1B65] text-[16px] bg-white w-full mb-4">
                    {features}
                </div>
            </div>
        </div>
        </div>
    )
}