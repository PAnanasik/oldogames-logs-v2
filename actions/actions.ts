"use server";

import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deleteCategory = async (categoryId: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new Error("Category is not found");
    }

    const deletedCategory = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    revalidatePath("/", "page");

    return { data: deletedCategory };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: String(error) };
    }
  }
};

export const deleteGamemode = async (gamemodeId: string) => {
  try {
    const gamemode = await prisma.gamemode.findUnique({
      where: {
        id: gamemodeId,
      },
    });

    if (!gamemode) {
      throw new Error("Gamemode is not found");
    }

    const deletedGamemode = await prisma.gamemode.delete({
      where: {
        id: gamemodeId,
      },
    });

    revalidatePath("/", "page");

    return { data: deletedGamemode };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: String(error) }; // преобразуем в строку, если не является объектом ошибки
    }
  }
};

export const addCategory = async (formData: FormData) => {
  try {
    const schema = z.object({
      name: z.string().min(3).max(70),
    });
    const parse = schema.safeParse({
      name: formData.get("name"),
    });

    if (!parse.success) {
      throw new Error("Ошибка в добавлении категории");
    }

    const data = parse.data;

    const category = await prisma.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (category) {
      throw new Error("Категория уже существует");
    }

    const addedCategory = await prisma.category.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/", "page");

    return { data: addedCategory };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: String(error) }; // преобразуем в строку, если не является объектом ошибки
    }
  }
};

export const addGamemode = async (formData: FormData) => {
  try {
    const schema = z.object({
      name: z.string().min(3).max(70),
    });
    const parse = schema.safeParse({
      name: formData.get("name"),
    });

    if (!parse.success) {
      throw new Error("Ошибка в добавлении режима");
    }

    const data = parse.data;

    const gamemode = await prisma.gamemode.findFirst({
      where: {
        name: data.name,
      },
    });

    if (gamemode) {
      throw new Error("Режим уже существует");
    }

    const addedGamemode = await prisma.gamemode.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/", "page");

    return { data: addedGamemode };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: String(error) }; // преобразуем в строку, если не является объектом ошибки
    }
  }
};
