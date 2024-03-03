import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import React from "react";

type HoverCardUserProps = {
  user: {
    name: string;
    variables: any;
  };
  formattedDate: string;
};

const HoverCardUser = ({ user, formattedDate }: HoverCardUserProps) => {
  console.log(user.variables);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {/* <Button variant="link">@nextjs</Button> */}
        <span
          className="text-link font-semibold md:text-md text-sm
            border border-white border-opacity-[0.1] p-1 rounded-md bg-primary cursor-pointer"
        >
          {user.name}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm text-link font-semibold truncate">{user.name}</h4>
            <p className="text-sm break-all overflow-y-auto max-h-[40px]">{JSON.stringify(user.variables)}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 text-secondary" />{" "}
              <span className="text-xs text-secondary">{formattedDate}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardUser;
