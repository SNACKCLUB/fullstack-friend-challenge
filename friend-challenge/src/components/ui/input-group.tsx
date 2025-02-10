import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type InputGroupProps = {
  children: ReactNode;
};

type InputGroupLabelProps = {
  children: ReactNode;
  htmlFor: string;
};

type InputGroupErrorLabelProps = {
  message?: string;
};

function InputGroup({ children }: InputGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        "[&_input]:h-[40px] [&_input]:px-4 [&_input]:rounded-md",
        "[&_input]:bg-gray-950/50 [&_input]:outline-none focus:[&_input]:outline-red-400"
      )}
    >
      {children}
    </div>
  );
}

function Label({ children, htmlFor }: InputGroupLabelProps) {
  return <label htmlFor={htmlFor}>{children}</label>;
}

function ErrorLabel({ message }: InputGroupErrorLabelProps) {
  return <span className="text-red-400 text-sm">{message}</span>;
}

InputGroup.Label = Label;
InputGroup.ErrorLabel = ErrorLabel;

export default InputGroup;
