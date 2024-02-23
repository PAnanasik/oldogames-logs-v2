"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { GalleryVerticalEnd } from "lucide-react";

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

  const isSelected = currentGamemodeId === id;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          text: currentText,
          gamemodeId: isSelected ? null : id,
          categoryId: currentCategoryId,
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
        "py-3 px-2 text-sm border border-white border-opacity-[0.1] rounded-lg flex items-center gap-x-1 hover:bg-link/10 transition hover:text-link w-full",
        isSelected && "border-link bg-link/10 text-link font-medium"
      )}
      data-tooltip-content={`ID режима ${name.toLocaleLowerCase()}: ${id}`}
      data-tooltip-id="gamemode-tooltip"
      type="button"
    >
      <GalleryVerticalEnd className="h-4 w-4 mr-1" />
      <div className="truncate">{name}</div>
      <Tooltip id="gamemode-tooltip" />
    </button>
  );
};

export default GamemodeItem;
