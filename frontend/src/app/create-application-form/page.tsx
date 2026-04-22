"use client"

import { ApplicationForm } from "@/widgets/applicationForm"

export default function CreateApplicationForm() {

  return (
    <div className="flex items-center flex-col min-h-screen bg-[url('/PAWS_final.png')]
      bg-repeat-y bg-top bg-[length:100%_auto] w-full overflow-x-hidden">

      <p className="pl-1 sm:pl-40 text-left w-full text-[#0F1B65] text-[35px] font-bold mt-4 md:mt-0 md:ml-80 mb-8">
        Анкета питомца
      </p>

      <ApplicationForm/>
    </div>
  );
}