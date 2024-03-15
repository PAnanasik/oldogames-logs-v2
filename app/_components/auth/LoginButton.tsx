"use client";

import { useRouter } from "next/navigation";

type LoginButtonProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/steam");
  };

  if (mode === "modal") {
    return <div>LoginButton</div>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
