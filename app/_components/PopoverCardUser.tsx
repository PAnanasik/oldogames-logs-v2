// import { CalendarDays } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";

// import React from "react";

// type PopoverCardProps = {
//   user: {
//     name: string;
//     variables: any;
//   };
//   formattedDate: string;
// };

// const PopoverCard = ({ user, formattedDate }: PopoverCardProps) => {
//   return (
//     <HoverCard>
//       <HoverCardTrigger asChild>
//         {/* <Button variant="link">@nextjs</Button> */}
//         <span
//           className="text-link font-semibold md:text-md text-sm
//             border border-white border-opacity-[0.1] p-1 rounded-md bg-primary cursor-pointer"
//         >
//           {user.name}
//         </span>
//       </HoverCardTrigger>
//       <HoverCardContent className="w-80">
//         <div className="flex justify-between space-x-4">
//           <div className="space-y-1">
//             <h4 className="text-sm text-link font-semibold truncate">
//               {user.name}
//             </h4>
//             <p className="text-sm break-all overflow-y-auto max-h-[40px]">
//               {JSON.stringify(user.variables)}
//             </p>
//             <div className="flex items-center pt-2">
//               <CalendarDays className="mr-2 h-4 w-4 text-secondary" />{" "}
//               <span className="text-xs text-secondary">{formattedDate}</span>
//             </div>
//           </div>
//         </div>
//       </HoverCardContent>
//     </HoverCard>
//   );
// };

// export default PopoverCard;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";

import React from "react";

type PopoverCardProps = {
  user: {
    name: string;
    variables: any;
  };
  formattedDate: string;
};

const PopoverCard = ({ user, formattedDate }: PopoverCardProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className="text-link font-semibold md:text-md text-sm
            border border-white border-opacity-[0.1] p-1 rounded-md bg-primary cursor-pointer w-max"
        >
          {user.name}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm text-link font-semibold truncate">
              {user.name}
            </h4>
            <div className="text-sm break-all overflow-y-auto max-h-[40px] text-white">
              {Object.entries(user.variables).map(([key, value]) => (
                <div key={key}>
                  {key} - {value as string}
                </div>
              ))}
            </div>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 text-secondary" />{" "}
              <span className="text-xs text-secondary">{formattedDate}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverCard;
