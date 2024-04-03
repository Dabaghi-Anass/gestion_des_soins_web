import { cn } from "@/lib/utils";
export function AppLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img src="/logo.svg" alt="logo" className="w-8 h-8" />
      {/* <span className="font-bold text-xl text-slate-500">Soins</span> */}
    </div>
  );
}