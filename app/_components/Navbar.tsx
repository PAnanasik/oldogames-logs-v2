import { Search } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div
      className="h-[60px] w-full fixed top-0 bg-primary
  border-b border-white border-opacity-[0.05] ml-[300px] px-8 text-white flex items-center"
    >
      <div className="relative">
        <Search className="h-4 w-4 absolute top-4 left-3 text-border" />
        <input
          type="text"
          name=""
          id=""
          placeholder="Поиск по тексту..."
          className="w-full md:w-[300px] pl-9 rounded-md bg-background h-12 outline-none focus:outline-link"
        />
      </div>
    </div>
  );
};

export default Navbar;
