"use server";

import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";

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
    return { error: "Что-то пошло не так" };
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
    return { error: "Что-то пошло не так" };
  }
};
