"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  gameName: z
    .string()
    .min(3, {
      message: "Название обязательно",
    })
    .max(70),
});

type AddingProps = {
  flag: boolean;
};

const Adding = ({ flag }: AddingProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="flex gap-x-2 items-end">
      {isAdding && (
        <>
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="gameName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center flex-row-reverse gap-x-2">
                        <Button
                          className="w-max h-full bg-transparent flex flex-col gap-y-2 text-secondary"
                          onClick={() => setIsAdding(!isAdding)}
                          disabled={!isValid || isSubmitting}
                        >
                          <Check className="h-4 w-4" />
                        </Button>

                        {flag ? (
                          <Input
                            className="col-span-2 w-max h-8 bg-primary text-white"
                            id="gamename"
                            placeholder="Например, Slasher"
                            {...field}
                          />
                        ) : (
                          <Input
                            className="col-span-2 w-max h-8 bg-primary text-white"
                            id="categoryname"
                            placeholder="Например, Смерть"
                            {...field}
                          />
                        )}
                        {flag ? (
                          <Label
                            htmlFor="gamename"
                            className="truncate flex gap-x-1"
                          >
                            Название режима:
                          </Label>
                        ) : (
                          <Label
                            htmlFor="categoryname"
                            className="truncate flex gap-x-1"
                          >
                            Название категории:
                          </Label>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </>
      )}
      <Button
        className="w-max h-auto bg-transparent flex flex-row-reverse gap-y-2 text-secondary"
        onClick={() => setIsAdding(!isAdding)}
      >
        {!isAdding ? (
          <PlusCircle className="h-4 w-4" />
        ) : (
          <X className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default Adding;
