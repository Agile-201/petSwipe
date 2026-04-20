export default function NotFound() {
  return (
    <div className="flex items-center justify-center"
    style={{
        backgroundImage: "url('/PAWS_final.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
        backgroundPosition: "top",
      }}>
      <p className="font-bold text-[50px]">404 – Страница не найдена</p>
      <div className="h-124"/>
    </div>
  );
}