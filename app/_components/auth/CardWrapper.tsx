"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "./Header";
import Social from "./Social";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CardWrapperProps = {
  children: React.ReactNode;
  backButtonHref: string;
  headerLabel: string;
  showSocial?: boolean;
};

const CardWrapper = ({
  children,
  headerLabel,
  showSocial,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="w-full items-center justify-center">
        <Link
          href={backButtonHref}
          target="_blank"
          className="hover:underline hover:underline-offset-[3px]"
        >
          Возникла проблема?
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
