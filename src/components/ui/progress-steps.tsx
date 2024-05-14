"use client"
import { Progress } from '@/components/ui/progress';
type Props = {
  currentStep: number;
  stepsCount: number;
}
export function StepProgress({ currentStep, stepsCount, ...rest }: Props) {
  return (
    <div className="flex gap-4 py-4 px-2 w-full progress-bar-container items-center"  {...rest}>
      <Progress className="md:ml-[50px]" value={(currentStep / stepsCount) * 100} />
      <span className="w-[50px] font-bold">{currentStep} / {stepsCount}</span>
    </div>
  );
}