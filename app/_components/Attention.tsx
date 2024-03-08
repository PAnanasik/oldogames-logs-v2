import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import React from "react";

const Attention = ({ text, centered }: { text: string; centered: boolean }) => {
  return (
    <div className="flex gap-x-2 p-2 border border-white border-opacity-[0.1] rounded-md">
      <AlertTriangle className="h-6 w-6 text-secondary" />

      <p className={cn("text-sm text-secondary", centered && "text-center")}>
        {text}
      </p>
    </div>
  );
};

export default Attention;
