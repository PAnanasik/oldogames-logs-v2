"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Category, Gamemode } from "@prisma/client";
import { Shield } from "lucide-react";
import PopoverCard from "./PopoverCard";

type ModalAdminProps = {
  categories: Category[];
  gamemodes: Gamemode[];
};

const ModalAdmin = ({ categories, gamemodes }: ModalAdminProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Shield className={cn("h-9 w-9 p-2")} />
      </DialogTrigger>
      <DialogContent className="min-w-[90%]">
        <DialogHeader>
          <DialogTitle className="flex gap-x-2 items-center">
            <Shield className="h-10 w-10 bg-link/20 p-2 rounded-full" />
            Режим администратора
          </DialogTitle>
          <DialogDescription>
            Здесь вы можете добавлять новые категории и фильтры
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <PopoverCard gamemodes={gamemodes} flag />
          <PopoverCard categories={categories} flag={false} />
        </div>
        <DialogFooter>
          <p className="text-secondary">made by PAnanasik, 2024</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAdmin;
