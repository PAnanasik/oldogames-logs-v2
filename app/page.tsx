import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
import Logs from "./_components/Logs";
import prisma from "@/app/libs/prismadb";
import { Toaster } from "sonner";
import { getLogs } from "./actions/getLogs";

type SearchPageProps = {
  searchParams: {
    text: string;
    categoryId: string;
    gamemodeId: string;
    [key: string]: string | string[] | undefined;
  };
};

export default async function Home({ searchParams }: SearchPageProps) {
  const page = searchParams["page"] ?? "1";
  const limit = searchParams["limit"] ?? "100";

  const { logs, metadata } = await getLogs({
    query: searchParams,
    page: Number(page),
    limit: Number(limit),
  });

  console.log(logs);

  const gamemodes = await prisma.gamemode.findMany();
  const categories = await prisma.category.findMany();

  if (!logs || !categories) {
    return null;
  }

  return (
    <>
      <main className="h-full">
        <div className="h-[50px]">
          <Navbar categories={categories} gamemodes={gamemodes} />
        </div>
        <div className="hidden md:flex h-full w-96 flex-col fixed inset-y-0 z-50">
          <Sidebar categories={categories} gamemodes={gamemodes} />
        </div>
        <Logs logs={logs} page={Number(page)} {...metadata} />
      </main>
      <Toaster
        toastOptions={{
          style: {
            background: "hsl(var(--primary))",
            border: "1px rgba(255, 255, 255, 0.1) solid",
            color: "hsl(var(--link))",
          },
        }}
        duration={1000}
        visibleToasts={3}
      />
    </>
  );
}
