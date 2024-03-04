"use client";

import { cn } from "@/lib/utils";
import { Log } from "@prisma/client";

import { Copy, Expand, Info, Shrink, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";
import { toast } from "sonner";

const BoxPanel = ({
  setExpanded,
  expanded,
}: {
  setExpanded: (expanded: boolean) => void;
  expanded: boolean;
}) => {
  const router = useRouter();

  const currentLogs =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("logs") || "[]")
      : [];

  const handleExpandClick = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  const copyAllTextToClipboard = async (
    array: Array<{ formattedDateLogs: string; text: string; id: number }>
  ) => {
    try {
      const formattedLogs = array
        .map((log) => `${log.formattedDateLogs} ${log.text}`)
        .join("\n");
      await navigator.clipboard.writeText(`\`\`\`js\n${formattedLogs}\n\`\`\``);

      toast.success("Логи скопированы в буфер обмена");
    } catch (error) {
      toast.error("Не удалось скопировать текст");
    }
  };

  const handleDelete = () => {
    typeof window !== "undefined" ? localStorage.setItem("logs", "[]") : null;
    toast.success("Хранилище очищено");
    router.refresh();
    setTimeout(() => window.location.reload(), 1000);
  };

  const deleteTooltip = `Удалить все логи из хранилища`;
  const copyTooltip = `Скопировать все логи из хранилища`;
  const infoTooltip = `Все логи расположены в порядке добавления`;
  const fullscreenTooltip = `Увеличить размер хранилища`;
  const shrinkTooltip = `Уменьшить размер хранилища`;

  return (
    <div className="bg-background w-full h-[50px] absolute bottom-0 rounded-b-md z-30 opacity-100">
      <div className="flex items-center justify-around px-4 h-full w-full">
        <button
          className="hover:bg-secondary/15 rounded-full ease duration-300"
          data-tooltip-content={deleteTooltip}
          data-tooltip-id="delete-tooltip"
          onClick={handleDelete}
        >
          <Trash className="w-9 h-9 p-2 text-secondary" />
          <Tooltip id="delete-tooltip" />
        </button>
        <button
          className="hover:bg-secondary/15 rounded-full ease duration-300"
          data-tooltip-content={copyTooltip}
          data-tooltip-id="copy-tooltip"
          onClick={() => copyAllTextToClipboard(currentLogs)}
        >
          <Copy className="w-9 h-9 p-2 text-secondary" />
          <Tooltip id="copy-tooltip" />
        </button>
        <button
          className="hover:bg-secondary/15 rounded-full ease duration-300 xl:block hidden"
          data-tooltip-content={!expanded ? fullscreenTooltip : shrinkTooltip}
          data-tooltip-id="fullscreen-tooltip"
          onClick={handleExpandClick}
        >
          {!expanded && <Expand className={cn("w-9 h-9 p-2 text-secondary")} />}
          {expanded && <Shrink className={cn("w-9 h-9 p-2 text-link")} />}
          <Tooltip id="fullscreen-tooltip" />
        </button>
        <button
          className="hover:bg-secondary/15 rounded-full ease duration-300"
          data-tooltip-content={infoTooltip}
          data-tooltip-id="info-tooltip"
        >
          <Info className="w-9 h-9 p-2 text-secondary" />
          <Tooltip id="info-tooltip" />
        </button>
      </div>
    </div>
  );
};

export default BoxPanel;
