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
    <div className="flex flex-col w-full overflow-x-hidden px-4 bg-[url('/PAWS_final.png')]
      bg-repeat-y bg-top bg-[length:100%_auto]">
      <div className="px-2 w-full">
        <div className={`w-full max-w-[600px] mx-auto bg-[#D8ECFF] rounded-4xl flex flex-col shadow-md mb-8 md:mb-20`}>
          <p className="text-[37px] text-[#0F1B65] font-bold mt-10 text-center">
            Вход на платформу
          </p>

          <div className="flex justify-between items-center mt-4 px-6">
            <AuthSwitch isLogin={isLoginForm} onToggle={toggleAuthBtn} />
          </div>

          <div className="px-4 md:px-6 pb-2 md:pb-4 flex-1 flex flex-col">
            {isLoginForm ? (
              <LoginForm />
            ) : (  
              <RegisterForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}