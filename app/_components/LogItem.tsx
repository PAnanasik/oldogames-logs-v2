import React from "react";

const LogItem = () => {
  return (
    <div
      className="w-full h-[55px] border-t border-white border-opacity-[0.09] text-white 
        flex items-center py-2 px-4 text-lg"
    >
      <p>
        <span className="text-secondary">13 Feb, 18:41</span>{" "}
        <span className="text-link font-semibold">Феликс</span> упал с лестницы
        и пернул
      </p>
    </div>
  );
};

export default LogItem;
