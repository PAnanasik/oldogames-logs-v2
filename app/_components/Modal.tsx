import React from "react";
import LogItem from "./LogItem";
import { cn } from "@/lib/utils";
import BoxPanel from "./BoxPanel";

type ModalProps = {
  currentLogs: Array<{ formattedDateLogs: string; text: string }>;
};

type Log = {
  formattedDateLogs: string;
  text: string;
};

const Modal = ({ currentLogs }: ModalProps) => {
  return (
    <div
      className="fixed md:right-[10px] md:left-auto left-0 right-0 mx-auto top-[75px] md:w-[470px] 
    w-[98%] min-h-[300px] rounded-md bg-primary
  border border-white border-opacity-[0.05]"
    >
      <div
        className={cn(
          "h-[250px] [&>*:first-child]:border-t-transparent",
          currentLogs.length > 0 && "overflow-y-auto "
        )}
        id="box-modal"
      >
        {currentLogs.map((log: Log, index) => (
          <LogItem
            key={index}
            text={log.text}
            date={new Date(log.formattedDateLogs)}
            copy
          />
        ))}
        {currentLogs.length === 0 && (
          <div className="w-full min-h-[300px] flex justify-center items-center flex-col">
            <h2 className="text-lg font-medium text-secondary">
              Пока здесь пусто...
            </h2>
            <p className="text-secondary">Здесь будут добавленные логи</p>
          </div>
        )}
      </div>
      {currentLogs.length > 0 && <BoxPanel />}
    </div>
  );
};

export default Modal;
