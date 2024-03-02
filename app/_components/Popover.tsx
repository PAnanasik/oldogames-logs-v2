import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Category, Gamemode } from "@prisma/client";
import {
  AlignLeft,
  Edit,
  Folder,
  GalleryVerticalEnd,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import ModalAdminItem from "./ModalAdminItem";

type PopoverDemoProps = {
  categories: Category[];
  gamemodes: Gamemode[];
  flag: boolean;
};

export function PopoverDemo({ categories, gamemodes, flag }: PopoverDemoProps) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none text-link flex gap-x-1 items-center">
          {flag ? (
            <Folder className="h-4 w-4" />
          ) : (
            <AlignLeft className="h-4 w-4" />
          )}
          {flag ? "Режимы" : "Категории"}
        </h4>
        <p className="text-sm text-secondary">
          {flag ? "Измените режимы" : "Измените категории"}
        </p>
      </div>
      <div className="grid gap-2 overflow-y-auto xs:h-[300px] h-[150px]">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 items-center md:gap-2 gap-4">
          {flag
            ? gamemodes?.map((gamemode) => (
                <ModalAdminItem
                  key={gamemode.id}
                  name={gamemode.name}
                  id={gamemode.id}
                />
              ))
            : categories?.map((category) => (
                <ModalAdminItem
                  key={category.id}
                  name={category.name}
                  id={category.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
