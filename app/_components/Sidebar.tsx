import React from "react";

const Sidebar = () => {
  return (
    <div className="h-full fixed left-0 w-[300px] bg-primary border-r border-white border-opacity-[0.05]">
      <div
        className="border-b border-white border-opacity-[0.05] h-[60px] text-white flex items-center 
      justify-between p-2 px-4"
      >
        <p className="font-medium">qurs</p>
        <div className="h-[40px] w-[40px] rounded-full bg-background"></div>
      </div>
    </div>
  );
};

export default Sidebar;
