"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type GamemodeItemProps = {
  id: string;
  name: string;
};

const GamemodeItem = ({ id, name }: GamemodeItemProps) => {
  const pathname = usePathname();

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGamemodeId = searchParams?.get("gamemodeId");
  const currentCategoryId = searchParams?.get("categoryId");
  const currentText = searchParams?.get("text");
  const currentPage = searchParams?.get("page");

  const isSelected = currentGamemodeId === id;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          text: currentText,
          gamemodeId: isSelected ? null : id,
          categoryId: currentCategoryId,
          page: currentPage,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
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
