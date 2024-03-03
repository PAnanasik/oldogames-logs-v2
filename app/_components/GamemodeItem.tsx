"use client";

import { useSearchParams } from "next/navigation";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type GamemodeItemProps = {
  id: string;
  name: string;
};

const GamemodeItem = ({ id, name }: GamemodeItemProps) => {
  const searchParams = useSearchParams();

  const currentGamemodeId = searchParams?.get("gamemodeId");

  const isSelected = currentGamemodeId === id;

  const handleCopy = async (id: string) => {
    try {
      await navigator.clipboard.writeText(`${id}`);

      toast.success("ID режима скопирован в буфер обмена");
    } catch (error) {
      toast.error("Не удалось скопировать ID");
    }
  };

  return (
    <button
      onClick={() => handleCopy(id)}
      className={cn(
        "py-3 px-3 text-sm border border-white border-opacity-[0.1] rounded-lg flex items-center gap-x-1 hover:bg-link/10 transition hover:text-link w-full",
        isSelected && "border-link bg-link/10 text-link font-medium"
      )}
      data-tooltip-content={`${name}`}
      data-tooltip-id="gamemode-tooltip"
      type="button"
    >
      <div className="truncate">{name}</div>
      <Tooltip id="gamemode-tooltip" className="md:block hidden" />
    </button>
  );
};

export default GamemodeItem;
