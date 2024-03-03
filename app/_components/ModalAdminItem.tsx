"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Delete } from "lucide-react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteCategory, deleteGamemode } from "@/actions/actions";
import { toast } from "sonner";

type ModalAdminItem = {
  name: string;
  id: string;
  flag: boolean;
};

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Название обязательно",
    })
    .max(70),
});

const ModalAdminItem = ({ name, id, flag }: ModalAdminItem) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name },
  });

  const { isSubmitting, isValid } = form.formState;

  async function handleDeleteCategory() {
    const response = await deleteCategory(id);
    if (response && "error" in response && response.error) {
      toast.error(response.error);
    } else {
      toast.success("Категория удалена");
    }
  }

  async function handleDeleteGamemode() {
    const response = await deleteGamemode(id);
    if (response && "error" in response && response.error) {
      toast.error(response.error);
    } else {
      toast.success("Режим удален");
    }
  }

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div key={id} className="flex flex-col gap-y-2">
                  <Label htmlFor="width" className="truncate flex gap-x-1">
                    {name}
                  </Label>
                  <div className="flex gap-x-1 items-center">
                    <Input
                      defaultValue={name}
                      id="width"
                      className="col-span-2 w-full h-8 bg-primary text-white"
                      disabled
                      {...field}
                    />
                    <div className="flex h-full items-center gap-x-1">
                      <Button
                        className="h-full bg-primary text-secondary"
                        onClick={
                          flag ? handleDeleteGamemode : handleDeleteCategory
                        }
                        disabled={isSubmitting && isValid}
                        type="button"
                      >
                        <Delete className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ModalAdminItem;
