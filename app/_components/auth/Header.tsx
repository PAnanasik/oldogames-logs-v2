import Image from "next/image";

type HeaderProps = {
  label: string;
};

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h2 className="text-xl font-semibold">Авторизация</h2>
      <p className="text-secondary">{label}</p>
    </div>
  );
};

export default Header;
