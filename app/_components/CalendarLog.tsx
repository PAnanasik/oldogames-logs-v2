import { Calendar } from "@/components/ui/calendar";
import React from "react";

type CalendarLogProps = {
  date: Date;
};

const CalendarLog = ({ date }: CalendarLogProps) => {
  return (
    <Calendar
      mode="single"
      selected={date}
      className="rounded-md border border-white border-opacity-[0.1]"
    />
  );
};

export default CalendarLog;
