const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const data = Array.from({ length: 100 }).map(() => ({
  text: ` `,
  categoryId: "52ec9ada-23f2-4e7e-9bb8-cab987bde357",
  gamemodeId: "ebf9311a-5839-4cd6-b209-f15fc1430f53",
}));

async function main() {
  try {
    for (const logData of data) {
      await db.log.create({
        data: logData,
      });
    }

    console.log("success");
  } catch (error) {
    console.log("Error sending the database logs", error);
  } finally {
    await db.$disconnect();
  }
}

main();
