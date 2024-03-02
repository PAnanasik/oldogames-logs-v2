import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Category, Gamemode } from "@prisma/client";

type PopoverDemoProps = {
  categories: Category[];
  gamemodes: Gamemode[];
};

export function PopoverDemo({ categories, gamemodes }: PopoverDemoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Открыть режимы</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-secondary">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              {categories.map((category) => (
                <>
                  <Label htmlFor="width">{category.name}</Label>
                  <Input
                    id="width"
                    defaultValue="100%"
                    className="col-span-2 h-8 bg-background text-white"
                  />
                </>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
