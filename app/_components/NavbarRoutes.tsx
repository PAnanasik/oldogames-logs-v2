"use client";

import { cn } from "@/lib/utils";
import { Box, Info, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Modal from "./Modal";
import ModalAdmin from "./ModalAdmin";
import { Category, Gamemode } from "@prisma/client";
import ModalInfo from "./ModalInfo";

type NavbarRoutesProps = {
  categories: Category[];
  gamemodes: Gamemode[];
};

const NavbarRoutes = ({ categories, gamemodes }: NavbarRoutesProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  });

  const currentLogs =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("logs") || "[]")
      : [];

  return (
    <nav className="w-full h-full text-white bg-primary flex items-center justify-between gap-x-4">
      <div className="md:pl-96 w-full">
        <SearchInput />
      </div>
      <div className="cursor-pointer hover:bg-secondary/15 rounded-full ease duration-300 flex items-center w-auto">
        <ModalInfo />
        <p className="text-secondary sr-only">Информация</p>
      </div>
      <div className="cursor-pointer hover:bg-secondary/15 rounded-full ease duration-300 flex items-center w-auto">
        <ModalAdmin categories={categories} gamemodes={gamemodes} />
        <p className="text-secondary sr-only">Режим админа</p>
      </div>
      <div
        className="cursor-pointer hover:bg-secondary/15 rounded-full ease duration-300"
        onClick={() => setShowModal(!showModal)}
      >
        <Box className={cn("h-9 w-9 p-2", showModal && "text-link")} />
        <p className="text-secondary sr-only">Хранилище логов</p>
      </div>

      {showModal && <Modal currentLogs={currentLogs} />}
    </nav>
  );
};

export default NavbarRoutes;
