'use client';

interface AuthSwitchProps {
  isLogin: boolean;
  onToggle: () => void;
}

export function AuthSwitch({ isLogin, onToggle }: AuthSwitchProps) {
  return (
    <div className="w-full p-1 flex rounded-lg gap-2">
      <button
        className={`flex-1 flex items-center justify-center duration-300 ease-in-out rounded-[30px] h-[50px] ${
		  isLogin ? 'bg-[#387CCD] text-white' : 'bg-[#A0CAF0CC] text-black'
        }`}
        onClick={onToggle}
      >
        <h3 className="text-[18px] font-light">Авторизация</h3>
      </button>
      <button
        className={`flex-1 flex items-center justify-center duration-300 ease-in-out rounded-[30px] h-[50px] ${
		  isLogin ? 'bg-[#A0CAF0CC] text-black' : 'bg-[#387CCD] text-white'
        }`}
        onClick={onToggle}
      >
        <h3 className="text-[18px] font-light">Регистрация</h3>
      </button>
    </div>
  );
}