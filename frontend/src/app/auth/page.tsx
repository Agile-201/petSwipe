'use client';

import { useState } from 'react';
import { AuthSwitch } from '@/features/auth/index';
import { LoginForm } from '@/widgets/login/index'
import { RegisterForm } from '@/widgets/register/index'


export default function AuthPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleAuthBtn = () => {
    setIsLoginForm(!isLoginForm)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full"
    style={{
        backgroundImage: "url('/PAWS_final.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
        backgroundPosition: "top",
      }}>
      <div className={`bg-[#D8ECFF80] border-none w-[600px] 
      ${isLoginForm ? 'h-[560px]' : 'h-[730px]'}
      overflow-hidden p-0 rounded-4xl flex flex-col shadow-md mb-20`}>
        
        <p className="text-[37px] text-[#0F1B65] font-bold mt-10 text-center">
          Вход на платформу
        </p>

        <div className="flex justify-between items-center mt-4 px-6">
          <AuthSwitch isLogin={isLoginForm} onToggle={toggleAuthBtn} />
        </div>

        <div className="px-6 pb-4 flex-1 flex flex-col">
          {isLoginForm ? (
            <LoginForm />
          ) : (  
            <RegisterForm />
          )}
        </div>
      </div>
    </div>
  );
}