import NavbarRoutes from "./NavbarRoutes";
import MobileSidebar from "./MobileSidebar";
import { Category, Gamemode } from "@prisma/client";

type NavbarProps = {
  categories: Category[];
  gamemodes: Gamemode[];
  user: {
    personaname: string;
    steamid: string;
    avatarfull: string;
  };
  qadmin: {
    steamid: string;
    rank: string;
  };
};

const Navbar = ({ categories, gamemodes, user, qadmin }: NavbarProps) => {
  return (
    <div
      className="h-[50px] px-4 border-b border-white border-opacity-[0.05] flex items-center
      bg-primary shadow-sm transition-all duration-300 fixed top-0 w-full z-50"
    >
      <MobileSidebar
        categories={categories}
        gamemodes={gamemodes}
        user={user}
        qadmin={qadmin}
      />
      <NavbarRoutes categories={categories} gamemodes={gamemodes} />
    </div>
  );
};

export default Navbar;
