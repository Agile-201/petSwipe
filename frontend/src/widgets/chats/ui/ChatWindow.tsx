"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { ChevronLeft } from "lucide-react";

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
  {
    id: "5",
    name: "Михаил",
    avatar: "/noProfile.png",
    lastMessage: "Спасибо!",
  },
  {
    id: "6",
    name: "Ольга",
    avatar: "/mockProf1.png",
    lastMessage: "Спасибо!",
  },
  {
    id: "7",
    name: "Дмитрий",
    avatar: "/noProfile.png",
    lastMessage: "Спасибо!",
  },
  {
    id: "8",
    name: "Олег",
    avatar: "/noProfile.png",
    lastMessage: "Спасибо!",
  },
];

export function ChatWindow() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    contacts[0]?.id || null
  );
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [newMessage, setNewMessage] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "chat">("chat");

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

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
    setMobileView("chat");
  };

  const handleBackToList = () => {
    setMobileView("list");
  };

  return (
    <div className="w-full md:max-w-[1000px] md:mx-auto h-[700px] sm:h-[535px] flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 h-full min-h-0">
        <div
          className={`
            w-full md:w-[300px] bg-[#ebf5ff] rounded-2xl md:rounded-l-[30px] md:rounded-r-none
            flex flex-col p-4 shadow-md
            ${mobileView === "chat" ? "hidden md:flex" : "flex"}
            h-full min-h-0
          `}
        >
          <Input
            type="text"
            placeholder="Найти чат"
            className="rounded-[20px] h-[44px] p-[20px] text-[#0F1B65] text-[16px] bg-white w-full border-none
            outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
            focus-visible:outline-none focus-visible:ring-0
            active:outline-none active:ring-0 hover:outline-none hover:ring-0
            [&:focus]:border-none [&:focus]:shadow-none placeholder:text-[#0F1B65] mb-4"
          />
          <div className="flex-1 overflow-y-auto space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleSelectContact(contact.id)}
                className={`flex items-center justify-start gap-5 h-[75px] rounded-[20px] mb-3 px-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedContactId === contact.id
                    ? "bg-[#387CCD] text-white"
                    : "bg-white text-[#0F1B65]"
                }`}
              >
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="object-cover w-13 h-13 rounded-full"
                />
                <div className="overflow-hidden">
                  <p className="font-bold">{contact.name}</p>
                  <p className="font-light text-sm truncate">
                    {contact.lastMessage || "Нет сообщений"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`
            flex-1 bg-[#ebf5ff] rounded-2xl md:rounded-r-[30px] md:rounded-l-none
            flex flex-col shadow-md h-full min-h-0
            ${mobileView === "list" ? "hidden md:flex" : "flex"}
          `}
        >
          {selectedContact ? (
            <>
              <div className="flex items-center gap-3 p-4 pl-4 md:pl-10 border-b border-gray-200 flex-shrink-0">
                <button
                  onClick={handleBackToList}
                  className="md:hidden p-1 rounded-full hover:bg-gray-200 transition"
                  aria-label="Назад к списку"
                >
                  <ChevronLeft size={24} />
                </button>
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
                className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
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

              <div className="p-4 flex flex-col gap-2 flex-shrink-0">
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
                  placeholder:text-[#0F1B65]"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#387CCD] h-[40px] rounded-[20px] w-full md:w-[202px] font-normal hover:bg-[#0F1B65] self-end"
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
    </div>
  );
}