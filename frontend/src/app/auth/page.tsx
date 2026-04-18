'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthSwitch } from '@/features/auth/index';
import { LoginForm } from '@/widgets/login/index'
import { RegisterForm } from '@/widgets/register/index'


export default function AuthPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-72px)] overflow-hidden p-4 bg-gradient-to-bl from-blue-500 via-blue-600 to-blue-700">
        <div
          className={`
            bg-gray-200 border-none
            w-[360px] 
            ${isLoginForm ? 'h-[506px]' : 'h-[556px]'}
            overflow-hidden
            p-0 rounded-xl
            flex flex-col
          `}
        >
            <div className="mb-[25px]">
              <div className="flex justify-between items-center mt-4 px-6">
                <div className="flex-1"></div>
                <div className="flex-1 flex justify-center">
                  <AuthSwitch isLogin={isLoginForm} onToggle={setIsLoginForm} />
                </div>
                <div className="flex-1 flex justify-end"></div>
              </div>
            </div>

            <div className="px-6 pb-4 flex-1 flex flex-col">
              {isLoginForm ? (
                <>
                  <LoginForm />
                </>
              ) : (
                <>
                  <RegisterForm />
                </>
              )}
            </div>
        </div>
    </div>
  );
}