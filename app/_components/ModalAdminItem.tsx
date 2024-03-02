"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Pencil, Save } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ModalAdminItem = {
  name: string;
  id: string;
};

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Название обязательно",
    })
    .max(70),
});

const ModalAdminItem = ({ name, id }: ModalAdminItem) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name },
  });

  const { isSubmitting, isValid } = form.formState;

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
                    {isEditing && (
                      <FormMessage className="text-secondary text-xs text-opacity-[0.7] italic lowercase">
                        Максимум 70 символов
                      </FormMessage>
                    )}
                  </Label>
                  <div className="flex gap-x-1 items-center">
                    <Input
                      id="width"
                      defaultValue={name}
                      className="col-span-2 w-full h-8 bg-primary text-white"
                      disabled={!isEditing}
                    />
                    <div className="flex h-full items-center gap-x-1">
                      <Button
                        className="h-full bg-primary"
                        onClick={() => setIsEditing(!isEditing)}
                        type="button"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {isEditing && (
                        <Button className="h-full">
                          <Save className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
    // <div key={id} className="flex flex-col gap-y-2">
    //   <Label htmlFor="width" className="truncate">
    //     {name}
    //   </Label>
    //   <div className="flex gap-x-1 items-center">
    //     <Input
    //       id="width"
    //       defaultValue={name}
    //       className="col-span-2 w-full h-8 bg-primary text-white"
    //       disabled={!isEditing}
    //     />
    //     <Button
    //       className="h-full bg-primary"
    //       onClick={() => setIsEditing(!isEditing)}
    //     >
    //       <Edit className="h-4 w-4" />
    //     </Button>
    //     {isEditing && <Button className="h-full bg-primary">Сохранить</Button>}
    //   </div>
    // </div>
  );
};

export default ModalAdminItem;
