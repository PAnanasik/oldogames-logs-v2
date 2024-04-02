import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
import Logs from "./_components/Logs";

import prisma from "@/app/libs/prismadb";
import { Toaster } from "sonner";
import { getLogs } from "./actions/getLogs";
import { redirect } from "next/navigation";
import { getSession } from "@/lib";
import getSteamRelyingParty, {
  getSteamAuthenticationURL,
} from "@/utils/auth/steam";

type PageProps = {
  searchParams: {
    text?: string;
    categoryId?: string;
    gamemodeId?: string;
    [key: string]: string | string[] | undefined;
    steamId?: string;
  };
};

export default async function Home({ searchParams }: PageProps) {
  const session = await getSession();

  if (!session) {
    return redirect("/login");
  }

  const steamId = session.accountData.steamid;
  const qadmin = await prisma.qadmin_players.findUnique({
    where: {
      steamid: steamId,
    },
  });

  if (!qadmin) {
    return redirect("/login");
  }

  const page = searchParams["page"] ?? "1";
  const limit = searchParams["limit"] ?? "100";

  const { logs, metadata } = await getLogs({
    query: searchParams,
    page: Number(page),
    limit: Number(limit),
  });

  const gamemodes = await prisma.gamemode.findMany();
  const categories = await prisma.category.findMany();

  return (
    <>
      <main className="h-full">
        <div className="h-[50px]">
          {/* <ClientOnly> */}
          <Navbar
            categories={categories}
            gamemodes={gamemodes}
            user={session.accountData}
            qadmin={qadmin}
          />
          {/* </ClientOnly> */}
        </div>
        <div className="hidden md:flex h-full w-96 flex-col fixed inset-y-0 z-50">
          {/* <ClientOnly> */}
          <Sidebar
            categories={categories}
            gamemodes={gamemodes}
            user={session.accountData}
            qadmin={qadmin}
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
