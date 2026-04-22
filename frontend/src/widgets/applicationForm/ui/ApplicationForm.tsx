'use client'

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useRouter } from 'next/navigation';

export function ApplicationForm() {
    const router = useRouter();

    return (
        <div className="px-2 w-full">
            <form className="w-full max-w-[800px] mx-auto bg-[#D8ECFF] rounded-[30px] mb-15">
                <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 pt-6 md:pt-13 px-4 md:px-0">
                    <div className="flex flex-col items-center">
                        <img
                            src="loadImage.png"
                            className="w-full max-w-[300px] h-auto md:h-[330px] object-cover rounded-[30px] mb-5"
                            alt="loadImage"
                        />
                        <Button
                            onClick={() => router.push('/create-application-form')}
                            className="bg-[#D8ECFF] h-[50px] rounded-[20px] w-full max-w-[300px] font-normal
                            text-black border border-black border-2"
                        >
                            Загрузить фото
                        </Button>
                    </div>

                    <div className="flex flex-col text-[#0F1B65] w-full md:w-auto">
                        <p className="mb-2 font-[700]">Имя питомца:</p>
                        <Input
                            type="text"
                            placeholder="Например: Василий"
                            className="rounded-[20px] h-[44px] p-[20px]
                            text-[#0F1B65] text-[16px] bg-white w-full md:w-[400px] border-none
                            outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                            focus-visible:outline-none focus-visible:ring-0
                            active:outline-none active:ring-0
                            hover:outline-none hover:ring-0
                            [&:focus]:border-none [&:focus]:shadow-none
                            placeholder:text-[#0F1B65] mb-4"
                        />
                        <p className="mb-2 font-[700]">Категория питомца:</p>
                        <Input
                            type="text"
                            placeholder="Например: Кошка"
                            className="rounded-[20px] h-[44px] p-[20px]
                            text-[#0F1B65] text-[16px] bg-white w-full md:w-[400px] border-none
                            outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                            focus-visible:outline-none focus-visible:ring-0
                            active:outline-none active:ring-0
                            hover:outline-none hover:ring-0
                            [&:focus]:border-none [&:focus]:shadow-none
                            placeholder:text-[#0F1B65] mb-4"
                        />
                        <p className="mb-2 font-[700]">Возраст:</p>
                        <Input
                            type="text"
                            placeholder="Например: 15 лет"
                            className="rounded-[20px] h-[44px] p-[20px]
                            text-[#0F1B65] text-[16px] bg-white w-full md:w-[400px] border-none
                            outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                            focus-visible:outline-none focus-visible:ring-0
                            active:outline-none active:ring-0
                            hover:outline-none hover:ring-0
                            [&:focus]:border-none [&:focus]:shadow-none
                            placeholder:text-[#0F1B65] mb-4"
                        />
                        <p className="mb-2 font-[700]">Порода:</p>
                        <Input
                            type="text"
                            placeholder="Например: Шотландский вислоухий"
                            className="rounded-[20px] h-[44px] p-[20px]
                            text-[#0F1B65] text-[16px] bg-white w-full md:w-[400px] border-none
                            outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                            focus-visible:outline-none focus-visible:ring-0
                            active:outline-none active:ring-0
                            hover:outline-none hover:ring-0
                            [&:focus]:border-none [&:focus]:shadow-none
                            placeholder:text-[#0F1B65] mb-4"
                        />
                        <p className="mb-2 font-[700]">Описание питомца (внешность, характер):</p>
                        <Textarea
                            placeholder="Например: покладистый, шкодливый, пушистый, спокойный, игривый."
                            className="rounded-[20px] p-[20px] resize-none h-[100px]
                                    text-[#0F1B65] text-[16px] bg-white w-full md:w-[400px] border-none
                                    outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                                    focus-visible:outline-none focus-visible:ring-0
                                    active:outline-none active:ring-0
                                    hover:outline-none hover:ring-0
                                    [&:focus]:border-none [&:focus]:shadow-none
                                    placeholder:text-[#0F1B65] mb-4"
                        />
                        <p className="mb-2 font-[700]">Особенности питомца (заболевания, ограничения):</p>
                        <Textarea
                            placeholder="Например: стоматит"
                            className="rounded-[20px] p-[20px] resize-none h-[100px]
                                    text-[#0F1B65] text-[16px] bg-white w-full md:w-[400px] border-none
                                    outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                                    focus-visible:outline-none focus-visible:ring-0
                                    active:outline-none active:ring-0
                                    hover:outline-none hover:ring-0
                                    [&:focus]:border-none [&:focus]:shadow-none
                                    placeholder:text-[#0F1B65] mb-4"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-60 pb-8 px-4">
                    <Button
                        onClick={() => router.push('/pets')}
                        className="bg-[#D8ECFF] h-[50px] rounded-[20px] w-full md:w-[200px] font-normal
                        text-black border border-black border-2"
                    >
                        Удалить анкету
                    </Button>
                    <Button
                        className="bg-[#387CCD] h-[50px] rounded-[20px] w-full md:w-[250px] font-normal hover:bg-[#0F1B65]"
                    >
                        Сохранить анкету
                    </Button>
                </div>
            </form>
        </div>
    );
}