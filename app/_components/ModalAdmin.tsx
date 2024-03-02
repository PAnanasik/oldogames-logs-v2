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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Category, Gamemode } from "@prisma/client";
import { Shield } from "lucide-react";
import { PopoverDemo } from "./Popover";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Режим администратора</DialogTitle>
          <DialogDescription>
            Здесь вы можете добавлять новые категории и фильтры
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value="Pedro Duarte"
              className="col-span-3 bg-background text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value="@peduarte"
              className="col-span-3 bg-background text-white"
            />
          </div>
          <PopoverDemo categories={categories} gamemodes={gamemodes} />
        </div>
        <DialogFooter>
          <Button type="submit" className="text-white">
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAdmin;
