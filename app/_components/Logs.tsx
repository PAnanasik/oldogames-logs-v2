import { Log } from "@prisma/client";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { LogItem } from "./LogItem";
import ClientOnly from "./ClientOnly";

type LogsProps = {
  logs: Log[];
  page: number;
  hasNextPage: boolean;
  totalPages: number;
  steamId?: string;
};

const Logs = ({ logs, page, hasNextPage, totalPages, steamId }: LogsProps) => {
  const isActive = (pageNumber: number) => pageNumber === page;

  return (
    <div className="md:pl-96 [&>*:last-child]:border-b-transparent [&>*:first-child]:border-t-transparent pb-[50px]">
      <ClientOnly>
        {logs?.map((log) => (
          <LogItem
            key={log.id}
            id={log.id}
            text={log.text}
            date={log.createdAt}
            copy={false}
          />
        ))}
      </ClientOnly>
      <ClientOnly>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href={`?steamId=${steamId}&page=1`}
                className={cn(page === 1 && "pointer-events-none opacity-50")}
              >
                <ChevronsLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                href={`?steamId=${steamId}&page=${page - 1}`}
                className={cn(page === 1 && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(totalPages, 3) }).map((_, index) => {
              const displayedPage = Math.min(
                totalPages - Math.max(2, totalPages - page + 1) + index,
                totalPages
              );
              if (displayedPage <= 0) return null;
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={`?steamId=${steamId}&page=${displayedPage}`}
                    isActive={isActive(displayedPage)}
                    className={cn(
                      isActive(displayedPage) && "bg-link/10 text-link"
                    )}
                  >
                    {displayedPage}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                href={`?steamId=${steamId}&page=${page + 1}`}
                className={cn(!hasNextPage && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`?steamId=${steamId}&page=${totalPages}`}
                className={cn(!hasNextPage && "pointer-events-none opacity-50")}
              >
                <ChevronsRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ClientOnly>

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
