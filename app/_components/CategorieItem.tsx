"use client";

import { useSearchParams } from "next/navigation";
import "react-tooltip/dist/react-tooltip.css";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CategorieItemProps = {
  id: string;
  name: string;
};

const CategorieItem = ({ id, name }: CategorieItemProps) => {
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams?.get("categoryId");

  const isSelected = currentCategoryId === id;

  const handleCopy = async (id: string) => {
    try {
      await navigator.clipboard.writeText(`${id}`);

      toast.success("ID категории скопирован в буфер обмена");
    } catch (error) {
      toast.error("Не удалось скопировать ID");
    }
  };

  return (
    <button
      onClick={() => handleCopy(id)}
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
