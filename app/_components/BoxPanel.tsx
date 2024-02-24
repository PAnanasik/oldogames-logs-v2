import { Copy, Expand, Info, Trash } from "lucide-react";
import React from "react";
import { Tooltip } from "react-tooltip";

const BoxPanel = () => {
  const deleteTooltip = `Удалить все логи из хранилища`;
  const copyTooltip = `Скопировать все логи из хранилища`;
  const infoTooltip = `Все логи расположены в порядке добавления`;
  const fullscreenTooltip = `Сделать хранилище на весь экран`;

  return (
    <div className="bg-background w-full h-[50px] absolute bottom-0 rounded-b-md">
      <div className="flex items-center justify-around px-4 h-full w-full">
        <button
          className="hover:bg-secondary/15 rounded-full ease duration-300"
          data-tooltip-content={deleteTooltip}
          data-tooltip-id="delete-tooltip"
        >
          <Trash className="w-9 h-9 p-2 text-secondary" />
          <Tooltip id="delete-tooltip" />
        </button>
        <button
          className="hover:bg-secondary/15 rounded-full ease duration-300"
          data-tooltip-content={copyTooltip}
          data-tooltip-id="copy-tooltip"
        >
          <Copy className="w-9 h-9 p-2 text-secondary" />
          <Tooltip id="copy-tooltip" />
        </button>
        <button
          className="hover:bg-secondary/15 rounded-full ease duration-300"
          data-tooltip-content={fullscreenTooltip}
          data-tooltip-id="fullscreen-tooltip"
        >
          <Expand className="w-9 h-9 p-2 text-secondary" />
          <Tooltip id="fullscreen-tooltip" />
        </button>
        <button
          className="hover:bg-secondary/15 rounded-full ease duration-300"
          data-tooltip-content={infoTooltip}
          data-tooltip-id="info-tooltip"
        >
          <Info className="w-9 h-9 p-2 text-secondary" />
          <Tooltip id="info-tooltip" />
        </button>
      </div>
    </div>
  );
};

export default BoxPanel;
