"use client";

import { signIn } from "next-auth/react";
import { BsDiscord } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = (provider: "discord") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("discord")}
      >
        <BsDiscord className="h-5 w-5 mr-2" />
      </Button>
    </div>
  );
};

export default Social;
