"use client";

import { BsSteam } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Social = () => {
  const router = useRouter();

  const onClick = () => {
    return router.push("/auth/steam");
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick()}
      >
        <BsSteam className="h-5 w-5 mr-2" />
      </Button>
    </div>
  );
};

export default Social;
