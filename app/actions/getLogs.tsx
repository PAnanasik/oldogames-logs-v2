import prisma from "@/app/libs/prismadb";

export const getLogs = async ({
  query,
  page = 1,
  limit = 10,
}: {
  query: {
    text?: string;
    categoryId?: string;
    gamemodeId?: string;
  };
  page: number;
  limit: number;
}) => {
  const skip = (Number(page) - 1) * Number(limit);

  const totalCount = await prisma.log.count({
    where: {
      text: {
        contains: query.text,
      },
      categoryId: query.categoryId,
      gamemodeId: query.gamemodeId,
    },
  });

  const logs = await prisma.log.findMany({
    where: {
      text: {
        contains: query.text,
      },
      categoryId: query.categoryId,
      gamemodeId: query.gamemodeId,
    },
    include: {
      Category: true,
      Gamemode: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: Number(limit),
    skip: skip,
  });

  return {
    logs: logs,
    metadata: {
      hasNextPage: skip + limit < totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
};
