import React from "react";
import LogItem from "./LogItem";
import { Log } from "@prisma/client";

type LogsProps = {
  logs: Log[];
};

const Logs = ({ logs }: LogsProps) => {
  return (
    <div className="md:pl-96 [&>*:last-child]:border-b-transparent">
      {logs?.map((log) => (
        <LogItem
          key={log.id}
          category={log.categoryId}
          text={log.text}
          date={log.createdAt}
        />
      ))}
    </div>
  );
};

export default Logs;
