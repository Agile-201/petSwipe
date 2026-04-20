"use client"

import { ChatWindow } from "@/widgets/chats"

export default function Chats() {

    return(
        <div
            className="flex flex-col items-center justify-center mb-20"
            style={{
                backgroundImage: "url('/PAWS_final.png')",
                backgroundRepeat: "repeat-y",
                backgroundSize: "contain",
                backgroundPosition: "top center",
            }}
        >
            <p className="text-center text-[#0F1B65] text-[35px] font-bold mr-auto ml-80 mb-8">
                Чаты
            </p>

            <ChatWindow/>
        </div>
    )
}