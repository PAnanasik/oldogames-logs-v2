"use client";

import { cn } from "@/lib/utils";
import { Copy, MinusCircle, Plus, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type LogItemProps = {
  text: string;
  date: Date;
  copy: Boolean;
};

const LogItem = ({ text, copy, date }: LogItemProps) => {
  const formattedDate =
    date.toLocaleString("en-US", { month: "short", day: "numeric" }) +
    ", " +
    date.toLocaleTimeString("ru-RU", {
      hour: "numeric",
      minute: "2-digit",
    });

  const formattedDateLogs =
    date.toLocaleString("en-US", { month: "short", day: "numeric" }) +
    ", " +
    date.toLocaleTimeString("ru-RU", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });

  const handleAddToLocalStorage = () => {
    const currentLogs =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("logs") || "[]")
        : [];
    const logExists = currentLogs.some(
      (log: any) =>
        log.formattedDateLogs === formattedDateLogs && log.text === text
    );
    if (!logExists) {
      currentLogs.push({ formattedDateLogs, text });
      localStorage.setItem("logs", JSON.stringify(currentLogs));
      setLogExists(true);
      toast.success("Лог успешно добавлен");
    }
  };

  const handleRemoveFromLocalStorage = () => {
    const currentLogs =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("logs") || "[]")
        : [];
    const updatedLogs = currentLogs.filter(
      (log: { formattedDateLogs: string; text: string }) =>
        !(log.formattedDateLogs === formattedDateLogs && log.text === text)
    );
    localStorage.setItem("logs", JSON.stringify(updatedLogs));
    setLogExists(false);
    toast.success("Лог успешно удален");
  };

  const [logExists, setLogExists] = useState(false);

  useEffect(() => {
    const currentLogs =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("logs") || "[]")
        : [];
    const exists = currentLogs.some(
      (log: { formattedDateLogs: string; text: string }) =>
        log.formattedDateLogs === formattedDateLogs && log.text === text
    );
    setLogExists(exists);
  }, [formattedDateLogs, text]);

  return (
    <div
      className={cn(
        `w-full h-[55px] border-t border-white border-opacity-[0.09] 
      text-white flex items-center py-2 px-4 text-lg`,
        logExists && !copy && "bg-link/10"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div>
          <span className="text-secondary mr-1 md:text-md text-sm">
            {formattedDate}
          </span>{" "}
          <span className="text-link font-semibold md:text-md text-sm">
            {text}
          </span>
        </div>
        {!logExists && !copy && (
          <button
            onClick={handleAddToLocalStorage}
            className="hover:bg-secondary/15 rounded-full ease duration-300"
          >
            <PlusCircle className="w-8 h-8 p-2 text-link" />
          </button>
        )}
        {logExists && !copy && (
          <button
            onClick={handleRemoveFromLocalStorage}
            className="hover:bg-secondary/15 rounded-full ease duration-300"
          >
            <MinusCircle className="w-8 h-8 p-2 text-link" />
          </button>
        )}
        {logExists && copy && (
          <button className="hover:bg-secondary/15 rounded-full ease duration-300">
            <Copy className="w-8 h-8 p-2 text-link" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LogItem;
