export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <img src="/logo.svg" alt="logo" className="w-8 h-8" />
      <span className="font-bold text-lg text-slate-500">App Name</span>
    </div>
  );
}