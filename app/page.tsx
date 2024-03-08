import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
import Logs from "./_components/Logs";

import prisma from "@/app/libs/prismadb";
import { Toaster } from "sonner";
import { getLogs } from "./actions/getLogs";
import { currentUser } from "@/lib/auth";

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
  const user = await currentUser();

  const { logs, metadata } = await getLogs({
    query: searchParams,
    page: Number(page),
    limit: Number(limit),
  });

  const gamemodes = await prisma.gamemode.findMany();
  const categories = await prisma.category.findMany();

  if (!logs || !categories || !gamemodes || !metadata) {
    return null;
  }

  return (
    <>
      <main className="h-full">
        <div className="h-[50px]">
          {/* <ClientOnly> */}

          <Navbar categories={categories} gamemodes={gamemodes} />

          {/* </ClientOnly> */}
        </div>
        <div className="hidden md:flex h-full w-96 flex-col fixed inset-y-0 z-50">
          {/* <ClientOnly> */}

          <Sidebar categories={categories} gamemodes={gamemodes} user={user} />

          {/* </ClientOnly> */}
        </div>
        {/* <ClientOnly> */}

        <Logs logs={logs} page={Number(page)} {...metadata} />

        {/* </ClientOnly> */}
      </main>
      <Toaster
        toastOptions={{
          style: {
            background: "hsl(var(--primary))",
            border: "1px rgba(255, 255, 255, 0.1) solid",
            color: "hsl(var(--link))",
          },
        }}
        duration={3000}
        visibleToasts={3}
      />
    </>
  );
}
