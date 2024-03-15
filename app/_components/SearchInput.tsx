"use client";

import { useDebounce } from "@/app/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

const SearchInput = ({ steamId }: { steamId?: string }) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams?.get("categoryId");
  const currentGamemodeId = searchParams?.get("gamemodeId");
  const currentPage = searchParams?.get("page");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          steamId: steamId,
          categoryId: currentCategoryId,
          gamemodeId: currentGamemodeId,
          text: debouncedValue,
          page: currentPage,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [
    debouncedValue,
    currentCategoryId,
    router,
    pathname,
    currentGamemodeId,
    currentPage,
    steamId,
  ]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-secondary" />
      <Input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        className="md:w-[300px] w-full pl-9 rounded-md bg-background"
        placeholder="Поиск по тексту.."
      />
    </div>
  );
};

export default SearchInput;
