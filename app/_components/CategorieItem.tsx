"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "react-tooltip/dist/react-tooltip.css";
import qs from "query-string";
import { cn } from "@/lib/utils";

type CategorieItemProps = {
  id: string;
  name: string;
};

const CategorieItem = ({ id, name }: CategorieItemProps) => {
  const pathname = usePathname();

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams?.get("categoryId");
  const currentGamemodeId = searchParams?.get("gamemodeId");
  const currentText = searchParams?.get("text");
  const currentPage = searchParams?.get("page");

  const isSelected = currentCategoryId === id;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          text: currentText,
          gamemodeId: currentGamemodeId,
          categoryId: isSelected ? null : id,
          page: currentPage,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-white border-opacity-[0.1] rounded-full flex items-center gap-x-1 hover:bg-link/10 transition hover:text-link",
        isSelected && "border-link bg-link/10 text-link font-medium"
      )}
      type="button"
    >
      <div className="truncate">{name}</div>
    </button>
  );
};

export default CategorieItem;
