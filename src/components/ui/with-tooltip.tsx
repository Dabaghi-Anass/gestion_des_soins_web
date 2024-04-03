import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

type Props = {
  description: string;
}

const WithToolTip = ({ children, description }: React.PropsWithChildren<Props>) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className='bg-secondary-foreground'>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  );
};

export default WithToolTip;