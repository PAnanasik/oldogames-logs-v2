import Image from "next/image";
import Sidebar from "./_components/Sidebar";
import LogItem from "./_components/LogItem";
import Navbar from "./_components/Navbar";
import Logs from "./_components/Logs";
import prisma from "@/app/libs/prismadb";

export default async function Home() {
  const users = await prisma.qadmin_players.findMany();
  const logs = await prisma.log.findMany();
  const categories = await prisma.category.findMany();

  return (
    <main className="h-full">
      <div className="h-[60px]">
        <Navbar categories={categories} />
      </div>
      <div className="hidden md:flex h-full w-96 flex-col fixed inset-y-0 z-50">
        <Sidebar categories={categories} />
      </div>
      <Logs logs={logs} />
    </main>
  );
}
