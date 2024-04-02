const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const data = Array.from({ length: 100 }).map(() => ({
  text: `[Игрок 1|"var1": "somevar", "var2": 123] убил [Игрок 2|"var1": "somevar", "var2": 123]`,
  categoryId: "52ec9ada-23f2-4e7e-9bb8-cab987bde357",
  gamemodeId: "ac12ba4f-6dd1-4b77-a540-2b617230e161",
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
