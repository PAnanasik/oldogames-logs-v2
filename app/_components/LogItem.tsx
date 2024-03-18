"use client";

import { cn } from "@/lib/utils";
import { Calendar, Copy, MinusCircle, Plus, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import parseEventDescription from "../functions/playerData";
import PopoverCard from "./PopoverCardUser";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import CalendarLog from "./CalendarLog";

type LogItemProps = {
  text: string;
  date: Date;
  id: number;
  copy: boolean;
};

export const LogItem = ({ text, copy, date, id }: LogItemProps) => {
  const [calendar, setShowCalendar] = useState(false);

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

  const eventData = parseEventDescription(text);

  const copyTextToClipboard = async ({
    formattedDateLogs,
    text,
  }: {
    formattedDateLogs: string;
    text: string;
  }) => {
    try {
      const formattedLog = `\`\`\`js\n${formattedDateLogs} ${text}\n\`\`\``;
      await navigator.clipboard.writeText(formattedLog);

      toast.success("Лог скопирован в буфер обмена");
    } catch (error) {
      toast.error("Не удалось скопировать текст");
    }
  };

  const handleAddToLocalStorage = () => {
    const currentLogs =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("logs") || "[]")
        : [];
    const logExists = currentLogs.some(
      (log: {
        formattedDateLogs: string;
        text: string;
        id: number;
        date: Date;
      }) =>
        log.formattedDateLogs === formattedDateLogs &&
        log.text === text &&
        log.id === id &&
        log.date === date
    );
    if (!logExists) {
      currentLogs.push({ formattedDateLogs, text, id, date });
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
      (log: {
        formattedDateLogs: string;
        text: string;
        id: number;
        date: Date;
      }) =>
        !(
          log.formattedDateLogs === formattedDateLogs &&
          log.text === text &&
          log.id === id
        )
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
      (log: {
        formattedDateLogs: string;
        text: string;
        id: number;
        date: Date;
      }) =>
        log.formattedDateLogs === formattedDateLogs &&
        log.text === text &&
        log.id === id
    );
    setLogExists(exists);
  }, [formattedDateLogs, text, id]);

  function handleClick(e: any) {
    e.preventDefault();
    setShowCalendar(!calendar);
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <ScrollArea
          className={cn(
            `w-full min-h-[55px] border-t border-white border-opacity-[0.09] 
      text-white flex items-center py-2 px-4 text-lg whitespace-nowrap`,
            logExists && !copy && "bg-link/10"
          )}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <span className="text-secondary mr-1 md:text-md text-sm">
                {formattedDate}
              </span>
              <div className="flex items-center gap-x-1">
                {eventData.players.length > 0 ? (
                  <PopoverCard
                    user={eventData.players[0]}
                    formattedDate={new Date(date).toLocaleString()}
                  />
                ) : undefined}
                <span className="text-secondary text-white md:text-md text-sm ">
                  {eventData.action}
                </span>
                {eventData.players.length > 1 ? (
                  eventData.players.length > 1 ? (
                    <PopoverCard
                      user={eventData.players[1]}
                      formattedDate={new Date(date).toLocaleString()}
                    />
                  ) : undefined
                ) : undefined}
              </div>
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
              <button
                className="hover:bg-secondary/15 rounded-full ease duration-300"
                onClick={() => copyTextToClipboard({ formattedDateLogs, text })}
              >
                <Copy className="w-8 h-8 p-2 text-link" />
              </button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <ContextMenuContent className="w-72">
          <ContextMenuItem
            onClick={() => copyTextToClipboard({ formattedDateLogs, text })}
          >
            <Copy className="w-4 h-4 mr-2" />
            Скопировать
          </ContextMenuItem>
          <ContextMenuItem onClick={(e) => handleClick(e)}>
            <Calendar className="w-4 h-4 mr-2" />
            Посмотреть в календаре
          </ContextMenuItem>
          {calendar && <CalendarLog date={date} />}
        </ContextMenuContent>
      </ContextMenuTrigger>
    </ContextMenu>
  );
};
