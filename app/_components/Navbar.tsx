import NavbarRoutes from "./NavbarRoutes";
import MobileSidebar from "./MobileSidebar";
import { Category, Gamemode } from "@prisma/client";

type NavbarProps = {
  categories: Category[];
  gamemodes: Gamemode[];
};

const Navbar = ({ categories, gamemodes }: NavbarProps) => {
  return (
    <div
      className="h-[60px] px-4 border-b border-white border-opacity-[0.05] flex items-center
      bg-primary shadow-sm transition-all duration-300"
    >
      <MobileSidebar categories={categories} gamemodes={gamemodes} />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
