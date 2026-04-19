"use client"

import { ApplicationForm } from "@/widgets/applicationForm"

export default function CreateApplicationForm() {

  return (
    <div className="flex flex-col items-center justify-center"
    style={{
        backgroundImage: "url('/PAWS_final.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
        backgroundPosition: "top",
      }}>
      
      <p className="text-center text-[#0F1B65] text-[35px] font-bold mr-auto ml-80 mb-8">Анкета питомца</p>

      <ApplicationForm/>
    </div>
  );
}