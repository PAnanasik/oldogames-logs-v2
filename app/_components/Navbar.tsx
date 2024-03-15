import NavbarRoutes from "./NavbarRoutes";
import MobileSidebar from "./MobileSidebar";
import { Category, Gamemode } from "@prisma/client";

type NavbarProps = {
  categories: Category[];
  gamemodes: Gamemode[];
  steamId?: string;
  user: {
    personaname: string;
    steamid: string;
    avatarfull: string;
  };
};

const Navbar = ({ categories, gamemodes, steamId, user }: NavbarProps) => {
  return (
    <div
      className="h-[50px] px-4 border-b border-white border-opacity-[0.05] flex items-center
      bg-primary shadow-sm transition-all duration-300 fixed top-0 w-full z-50"
    >
      <MobileSidebar
        categories={categories}
        gamemodes={gamemodes}
        steamId={steamId}
        user={user}
      />
      <NavbarRoutes
        categories={categories}
        gamemodes={gamemodes}
        steamId={steamId}
      />
    </div>
  );
};

export default Navbar;
