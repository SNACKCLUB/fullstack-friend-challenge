"use client";

import {
  PopoverContent,
  Popover as PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover/primitive";

import { ReactNode } from "react";

type PopoverProps = {
  children: ReactNode;
  trigger: ReactNode;
};

export const Popover = ({ children, trigger }: PopoverProps) => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="bg-gray-800 text-gray-200 border-none">
        {children}
      </PopoverContent>
    </PopoverRoot>
  );
};
