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
import { toast } from "sonner";
import { addCategory, addGamemode } from "@/actions/actions";

const formSchema = z.object({
  name: z
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
    defaultValues: { name: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="flex gap-x-2 items-end">
      {isAdding && (
        <>
          <Form {...form}>
            <form
              action={async (formData) => {
                let response;
                if (flag) {
                  response = await addGamemode(formData);
                } else {
                  response = await addCategory(formData);
                }
                if (response && "error" in response && response.error) {
                  toast.error(response.error);
                } else {
                  toast.success("Успешно добавлено");
                  setIsAdding(false);
                  form.reset();
                }
              }}
            >
              {flag ? (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center flex-row-reverse gap-x-2">
                          <Button
                            className="w-max h-full bg-transparent flex flex-col gap-y-2 text-secondary"
                            disabled={!isValid || isSubmitting}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Input
                            className="col-span-2 w-max h-8 bg-primary text-white"
                            id={"gamename"}
                            placeholder={"Например, Slasher"}
                            disabled={isSubmitting}
                            {...field}
                          />
                          <Label
                            htmlFor="gamename"
                            className="truncate flex gap-x-1"
                          >
                            Название режима:
                          </Label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center flex-row-reverse gap-x-2">
                          <Button
                            className="w-max h-full bg-transparent flex flex-col gap-y-2 text-secondary"
                            disabled={!isValid || isSubmitting}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Input
                            className="col-span-2 w-max h-8 bg-primary text-white"
                            id={"categoryname"}
                            disabled={isSubmitting}
                            placeholder={"Например, Смерть"}
                            {...field}
                          />
                          <Label
                            htmlFor="categoryname"
                            className="truncate flex gap-x-1"
                          >
                            Название категории:
                          </Label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
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
