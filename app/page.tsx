import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
import Logs from "./_components/Logs";

import prisma from "@/app/libs/prismadb";
import { Toaster } from "sonner";
import { getLogs } from "./actions/getLogs";
import { redirect } from "next/navigation";
import isValidSteamId from "@/utils/steamId";

type SearchPageProps = {
  searchParams: {
    text: string;
    categoryId: string;
    gamemodeId: string;
    [key: string]: string | string[] | undefined;
    steamId?: string;
  };
};

async function getPlayerData(steamId: string) {
  const response = await fetch(
    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch player data");
  }

  const data = await response.json();

  return data.response.players[0];
}

export default async function Home({ searchParams }: SearchPageProps) {
  const steamId = searchParams?.steamId;
  const page = searchParams["page"] ?? "1";
  const limit = searchParams["limit"] ?? "100";

  const { logs, metadata } = await getLogs({
    query: searchParams,
    page: Number(page),
    limit: Number(limit),
  });

  const gamemodes = await prisma.gamemode.findMany();
  const categories = await prisma.category.findMany();

  if (
    !logs ||
    !categories ||
    !gamemodes ||
    !metadata ||
    // !steamId ||
    !isValidSteamId(steamId!)
  ) {
    return redirect("/login");
  }

  const accountData = await getPlayerData(steamId!);

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

          <Sidebar
            categories={categories}
            gamemodes={gamemodes}
            user={accountData}
          />

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
