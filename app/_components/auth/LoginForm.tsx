import Image from "next/image";
import CardWrapper from "./CardWrapper";
import { Info } from "lucide-react";
import Attention from "../Attention";

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Добро пожаловать!"
      backButtonHref="https://discord.gg/KSxjfTYyTe"
      showSocial
    >
      <div className="w-full rounded-md flex flex-col items-center justify-center select-none space-y-4">
        <div>
          <Attention
            text="Авторизуйтесь через steam, чтобы продолжить работу с логами"
            centered={false}
          />
        </div>
      </div>
    </CardWrapper>
  );
};

export default LoginForm;
