"use client";

import { cn } from "@/lib/utils";
import { Box, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";

const NavbarRoutes = () => {
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

  return (
    <nav className="w-full h-full text-white bg-primary flex items-center justify-between px-4 gap-x-8">
      <div className="md:pl-96 w-full">
        <SearchInput />
      </div>
      <div className="cursor-pointer" onClick={() => setShowModal(!showModal)}>
        <Box className={cn("h-6 w-6", showModal && "text-link")} />
      </div>
      {showModal && (
        <div
          className="fixed md:right-[10px] md:left-auto left-0 right-0 mx-auto top-[75px] md:w-[470px] w-[98%] h-[300px] rounded-md bg-primary
        border border-white border-opacity-[0.05]"
          id="modal"
        >
          <div className="w-full h-full flex justify-center items-center flex-col">
            <h2 className="text-lg font-medium text-secondary">
              Пока здесь пусто...
            </h2>
            <p className="text-secondary">Здесь будут добавленные логи</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarRoutes;