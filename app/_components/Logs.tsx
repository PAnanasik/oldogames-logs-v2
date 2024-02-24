import LogItem from "./LogItem";
import { Log } from "@prisma/client";
import Image from "next/image";

type LogsProps = {
  logs: Log[];
};

const Logs = ({ logs }: LogsProps) => {
  return (
    <div className="md:pl-96 [&>*:last-child]:border-b-transparent [&>*:first-child]:border-t-transparent">
      {logs?.map((log) => (
        <LogItem
          key={log.id}
          text={log.text}
          date={log.createdAt}
          copy={false}
        />
      ))}
      {logs.length === 0 && (
        <div className="w-full h-full absolute inset-0 md:pl-96 flex justify-center items-center flex-col space-y-4 z-[-1]">
          <Image
            width={200}
            height={200}
            src={"/logs-not-found.jpg"}
            alt="image of crying cat"
            quality={30}
            className="w-[200px] h-[130px] rounded-md"
          />
          <p className="text-lg text-secondary font-medium">
            Ни одного лога не найдено...
          </p>
        </div>
      )}
    </div>
  );
};

export default Logs;
