"use client"

import { ChatWindow } from "@/widgets/chats"

export default function Chats() {

    return(
        <div className="flex flex-col w-full overflow-x-hidden px-4">

            <p className="pl-1 sm:pl-50 text-left w-full text-[#0F1B65]
                text-[35px] font-bold mt-4 mb-8">
                Чаты
            </p>

            <div className="flex-1 min-h-0 mb-20">
                <ChatWindow />
            </div>
        </div>
    )
}