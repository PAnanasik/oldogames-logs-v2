import Image from "next/image";
import Sidebar from "./_components/Sidebar";
import LogItem from "./_components/LogItem";
import Navbar from "./_components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Sidebar />
      <Navbar />
      <div className="ml-[300px] [&>*:last-child]:border-b-transparent">
        <LogItem />
        <LogItem />
        <LogItem />
        <LogItem />
        <LogItem />
      </div>
    </main>
  );
}
