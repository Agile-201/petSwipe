"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";


type Contact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
};

type Message = {
  id: string;
  text: string;
  sender: "me" | "them";
  timestamp: Date;
};


const contacts: Contact[] = [
  {
    id: "1",
    name: "Инокентий",
    avatar:
      "https://www.allianz.ie/blog/your-pet/pet-dental-care-is-vital/_jcr_content/root/stage/stageimage.img.82.3360.jpeg/1727883109843/cute-happy-pup.jpeg",
    lastMessage: "Скоро буду",
  },
  {
    id: "2",
    name: "Лиза",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/250px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    lastMessage: "Привет, как дела?",
  },
  {
    id: "3",
    name: "Андрей",
    avatar: "/noProfile.png",
    lastMessage: "Ок, договорились",
  },
  {
    id: "4",
    name: "Екатерина",
    avatar: "/mockProf1.png",
    lastMessage: "Спасибо!",
  },
];


export function ChatWindow() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    contacts[0]?.id || null
  );
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [newMessage, setNewMessage] = useState("");

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const selectedContact = contacts.find((c) => c.id === selectedContactId);
  const currentMessages = selectedContactId ? messages[selectedContactId] || [] : [];

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [currentMessages, selectedContactId]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContactId) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      timestamp: new Date(),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), message],
    }));
    setNewMessage("");

    // Имитация (жизни) ответа собеседника
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Позже с вами свяжусь",
        sender: "them",
        timestamp: new Date(),
      };
      setMessages((prev) => ({
        ...prev,
        [selectedContactId]: [...(prev[selectedContactId] || []), autoReply],
      }));
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-row w-[1000px] justify-center gap-1">
      <div className="bg-[#ebf5ff] h-[600px] w-[300px] rounded-l-[30px] shadow-[10px_-10px_15px_-3px_rgba(0,0,0,0.1),4px_-4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)] pt-4 px-3 overflow-y-auto">
        <Input
          type="text"
          placeholder="Найти чат"
          className="rounded-[20px] h-[44px] p-[20px] text-[#0F1B65] text-[16px] bg-white w-[280px] border-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 hover:outline-none hover:ring-0 [&:focus]:border-none [&:focus]:shadow-none placeholder:text-[#0F1B65] mb-4"
        />

        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setSelectedContactId(contact.id)}
            className={`flex items-center justify-start gap-5 bg-white h-[75px] rounded-[20px] mb-3 px-4 cursor-pointer transition-all hover:shadow-md ${
              selectedContactId === contact.id ? "ring-2 ring-blue-400" : ""
            }`}
          >
            <img
              src={contact.avatar}
              alt={contact.name}
              className="object-cover w-13 h-13 rounded-full"
            />
            <div className="overflow-hidden">
              <p className="font-bold">{contact.name}</p>
              <p className="font-light text-sm text-gray-500 truncate">
                {contact.lastMessage || "Нет сообщений"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#ebf5ff] h-[600px] w-[500px] rounded-r-[30px] shadow-[10px_-10px_15px_-3px_rgba(0,0,0,0.1),4px_-4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)] flex flex-col p-2">
        {selectedContact ? (
          <>
            <div className="flex items-center gap-3 p-4 pl-10">
              <img
                src={selectedContact.avatar}
                alt={selectedContact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{selectedContact.name}</p>
                <p className="text-xs text-gray-500">Онлайн</p>
              </div>
            </div>

            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {currentMessages.length === 0 ? (
                <p className="text-center text-gray-400 mt-10">
                  Напишите первое сообщение
                </p>
              ) : (
                currentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.sender === "me"
                          ? "bg-white text-gray-800 rounded-br-none"
                          : "bg-[#387CCD] text-white rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-[10px] opacity-70 text-right mt-1">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 flex flex-col gap-2">
              <Textarea
                placeholder="Напишите сообщение"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="rounded-[20px] p-[20px] resize-none h-[100px]
                text-[#0F1B65] text-[16px] bg-white w-full border-none
                outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                focus-visible:outline-none focus-visible:ring-0
                active:outline-none active:ring-0
                hover:outline-none hover:ring-0
                [&:focus]:border-none [&:focus]:shadow-none
                placeholder:text-[#0F1B65] mb-2"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-[#387CCD] h-[40px] rounded-[20px] w-[202px] font-normal hover:bg-[#0F1B65] self-end"
              >
                Отправить
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Выберите чат, чтобы начать общение
          </div>
        )}
      </div>
    </div>
  );
}