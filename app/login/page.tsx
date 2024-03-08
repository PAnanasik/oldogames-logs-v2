import LoginButton from "@/app/_components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col space-y-4 justify-center items-center">
      <h2 className="text-xl font-semibold tracking-tight">Логин</h2>
      <LoginButton>
        <Button size={"lg"}>Войти</Button>
      </LoginButton>
    </div>
  );
};

export default page;
