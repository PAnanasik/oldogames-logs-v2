import React from "react";

type LogItemProps = {
  category: string;
  text: string;
  date: Date;
};

const LogItem = ({ category, text, date }: LogItemProps) => {
  const formattedDate =
    date.toLocaleString("en-US", { month: "short", day: "numeric" }) +
    ", " +
    date.toLocaleTimeString("ru-RU", { hour: "numeric", minute: "2-digit" });

  return (
    <div
      className="w-full h-[55px] border-t border-white border-opacity-[0.09] text-white 
        flex items-center py-2 px-4 text-lg"
    >
      <p>
        <span className="text-secondary">{formattedDate}</span>{" "}
        <span className="text-link font-semibold">{text}</span>
      </p>
    </div>
  );
};

export default LogItem;
