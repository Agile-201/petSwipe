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
        <div className="h-[720px] w-[800px] bg-[#D8ECFF80] rounded-[30px] mb-15">
            <div className="flex justify-center gap-10 pt-13">
                <div className="flex flex-col">
                    <img
                        src={imageUrl}
                        className="w-[300px] h-[330px] object-cover rounded-[30px] mb-5"
                        alt="loadImage"
                    />
                </div>

                <div className="flex flex-col text-[#0F1B65]">
                    <p className="mb-3 font-[700]">Имя питомца:</p>
                    <div className="rounded-[20px] h-[44px] p-[20px] flex items-center text-[#0F1B65] text-[16px] bg-white w-[400px] mb-4">
                        {name}
                    </div>

                    <p className="mb-3 font-[700]">Категория питомца:</p>
                    <div className="rounded-[20px] h-[44px] p-[20px] flex items-center text-[#0F1B65] text-[16px] bg-white w-[400px] mb-4">
                        {category}
                    </div>

                    <p className="mb-3 font-[700]">Возраст:</p>
                    <div className="rounded-[20px] h-[44px] p-[20px] flex items-center text-[#0F1B65] text-[16px] bg-white w-[400px] mb-4">
                        {age}
                    </div>

                    <p className="mb-3 font-[700]">Порода:</p>
                    <div className="rounded-[20px] h-[44px] p-[20px] flex items-center text-[#0F1B65] text-[16px] bg-white w-[400px] mb-6">
                        {breed}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start text-[#0F1B65] px-10">
                <p className="mb-3 font-[700]">Описание питомца (внешность, характер):</p>
                <div className="rounded-[20px] p-[20px] min-h-[70px] flex items-start text-[#0F1B65] text-[16px] bg-white w-full mb-4">
                    {description}
                </div>

                <p className="mb-3 font-[700]">Особенности питомца (заболевания, ограничения):</p>
                <div className="rounded-[20px] p-[20px] min-h-[70px] flex items-start text-[#0F1B65] text-[16px] bg-white w-full mb-4">
                    {features}
                </div>
            </div>
        </div>
    )
}