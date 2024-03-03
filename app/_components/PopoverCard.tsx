import { Category, Gamemode } from "@prisma/client";
import { AlignLeft, Folder } from "lucide-react";
import ModalAdminItem from "./ModalAdminItem";

type PopoverDemoProps = {
  categories?: Category[];
  gamemodes?: Gamemode[];
  flag: boolean;
};
import React from "react";
import Adding from "./Adding";

const PopoverCard = ({ categories, gamemodes, flag }: PopoverDemoProps) => {
  return (
    <div className="grid gap-4">
      <div className="space-y-2 flex items-center justify-between">
        <div>
          <h4 className="font-medium leading-none text-link flex gap-x-1 items-center">
            {flag ? (
              <Folder className="h-4 w-4" />
            ) : (
              <AlignLeft className="h-4 w-4" />
            )}
            {flag ? "Режимы" : "Категории"}
          </h4>
          <p className="text-sm text-secondary">
            {flag ? "Манипулируйте режимами" : "Манипулируйте категориями"}
          </p>
        </div>
        <Adding flag={flag} />
      </div>
      <div className="grid gap-2 overflow-y-auto xs:h-[300px] h-[150px]">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-2 gap-4">
          {flag
            ? gamemodes?.map((gamemode) => (
                <ModalAdminItem
                  key={gamemode.id}
                  name={gamemode.name}
                  id={gamemode.id}
                  flag={flag}
                />
              ))
            : categories?.map((category) => (
                <ModalAdminItem
                  key={category.id}
                  name={category.name}
                  id={category.id}
                  flag={flag}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default PopoverCard;
