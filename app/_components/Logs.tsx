"use client";

import LogItem from "./LogItem";
import { Log } from "@prisma/client";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";

type LogsProps = {
  logs: Log[];
};

const Logs = ({ logs }: LogsProps) => {
  const LogsPerPage = 100;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategoryId = searchParams?.get("categoryId");
  const currentGamemodeId = searchParams?.get("gamemodeId");
  const currentText = searchParams?.get("text");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const url = queryString.stringifyUrl(
      {
        url: pathname || "",
        query: {
          text: currentText,
          categoryId: currentCategoryId,
          gamemodeId: currentGamemodeId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    if (url && url.length > 0) {
      setCurrentPage(1);
    }
  }, [pathname, currentCategoryId, currentGamemodeId, currentText]);

  const renderLogs = () => {
    const startIndex = (currentPage - 1) * LogsPerPage;
    const endIndex = startIndex + LogsPerPage;
    return logs
      .slice(startIndex, endIndex)
      .map((log) => (
        <LogItem
          key={log.id}
          id={log.id}
          text={log.text}
          date={log.createdAt}
          copy={false}
        />
      ));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="md:pl-96 [&>*:last-child]:border-b-transparent [&>*:first-child]:border-t-transparent pb-[50px]">
      {renderLogs()}
      {/* <Pagination>
        <PaginationContent>
          <PaginationItem
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          >
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {currentPage > 4 && (
            <>
              <PaginationItem>
                <PaginationLink href="#" onClick={() => handlePageChange(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              {currentPage > 5 && <PaginationEllipsis>...</PaginationEllipsis>}
            </>
          )}
          {Array.from({
            length: Math.min(
              Math.ceil(logs.length / LogsPerPage) - currentPage + 1,
              3
            ),
          }).map((_, index) => {
            const pageNumber = currentPage + index;
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(pageNumber)}
                  className={cn(
                    currentPage === pageNumber && "text-link bg-link/10"
                  )}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {currentPage < Math.ceil(logs.length / LogsPerPage) - 4 && (
            <>
              {currentPage < Math.ceil(logs.length / LogsPerPage) - 5 && (
                <PaginationEllipsis>...</PaginationEllipsis>
              )}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() =>
                    handlePageChange(Math.ceil(logs.length / LogsPerPage))
                  }
                >
                  {Math.ceil(logs.length / LogsPerPage)}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage >= Math.ceil(logs.length / LogsPerPage)
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}

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
