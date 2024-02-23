import React from "react";
import NavbarRoutes from "./NavbarRoutes";
import MobileSidebar from "./MobileSidebar";
import { Category } from "@prisma/client";

type NavbarProps = {
  categories: Category[];
};

const Navbar = ({ categories }: NavbarProps) => {
  return (
    <div
      className="h-[60px] px-4 border-b border-white border-opacity-[0.05] flex items-center
      bg-primary shadow-sm transition-all duration-300"
    >
      <MobileSidebar categories={categories} />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
