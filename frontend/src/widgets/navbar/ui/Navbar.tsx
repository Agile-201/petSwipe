'use client'

import Link from "next/link"
import { Button } from "@/shared/ui/button"
import MsgIcon from '@/../public/msg.svg'
import { useRouter } from 'next/navigation';


export function Navbar(){
    const router = useRouter();

    return(
        <header className="bg-white h-auto min-h-[94px] flex items-center py-2">
            <div className="container mx-auto flex flex-wrap items-center justify-between px-0 md:px-6 lg:px-8">

                <div className="shrink-0">
                    <Link href="/">
                        <svg
                            viewBox="0 0 191 161"
                            className="w-[60px] h-[50px] sm:w-[83px] sm:h-[70px]"
                        >
                            <image href="/logo.png" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
                        </svg>
                    </Link>
                </div>

                <nav className="flex gap-2 sm:gap-6 md:gap-[70px] ml-3 md:ml-[40px]">
                    <Link
                        href="/pets"
                        className="text-base sm:text-lg md:text-[22px] font-light hover:text-[#387CCD] transition"
                    >
                        Питомцы
                    </Link>
                    <Link
                        href="/about"
                        className="text-base sm:text-lg md:text-[22px] font-light hover:text-[#387CCD] transition"
                    >
                        О нас
                    </Link>
                </nav>

                <div className="flex items-center gap-0 sm:gap-3 ml-auto">
                    <button
                        onClick={() => router.push('/chats')}
                        className="p-1 rounded-full hover:bg-gray-100 transition"
                        aria-label="Чаты"
                    >
                        <MsgIcon
                            width="39"
                            height="33"
                            fill="#387CCD"
                            strokeWidth={6}
                            className="w-[32px] h-[28px] sm:w-[39px] sm:h-[33px]"
                        />
                    </button>

                    <Button
                        className="bg-[#387CCD] h-[44px] rounded-[20px] px-4 sm:px-6 w-auto min-w-[120px] sm:min-w-[180px] md:w-[242px] 
                                font-normal text-sm sm:text-base hover:bg-[#0F1B65] transition whitespace-nowrap"
                        onClick={() => router.push('/auth')}
                    >
                        <span className="hidden sm:inline">
                            Зарегистрироваться
                        </span>
                        <span className="sm:hidden">
                            Войти
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    )
}