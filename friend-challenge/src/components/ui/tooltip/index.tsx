"use client";

import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip/primitive";

import { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  title: string | number | ReactNode;
};

export const Tooltip = ({ children, title }: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipRoot delayDuration={300}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};
