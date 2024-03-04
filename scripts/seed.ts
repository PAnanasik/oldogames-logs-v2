const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const data = Array.from({ length: 100 }).map(() => ({
  text: `[Игрок 1|"var1": "somevar", "var2": 123] убил [Игрок 2|"var1": "somevar", "var2": 123]`,
  categoryId: "1", // Предполагается, что categoryId является строкой
  gamemodeId: "0736a389-7f2b-4d08-a729-5e37eb0b95db",
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
