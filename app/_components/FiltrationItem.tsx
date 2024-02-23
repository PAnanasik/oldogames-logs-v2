"use client";

import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

type FiltrationItemProps = {
  id: number;
  name: string;
};

const FiltrationItem = ({ id, name }: FiltrationItemProps) => {
  return (
    <div className="flex items-center w-full gap-x-2 relative" key={id}>
      <input type="checkbox" name="option" id="" className="w-5 h-5" />
      <p className="text-md">
        Показывать категорию {" "}
        <span
          className="text-link font-medium cursor-pointer"
          data-tooltip-content={`ID категории ${name.toLocaleLowerCase()}: ${id}`}
          data-tooltip-id="category-tooltip"
        >
          {name.toLocaleLowerCase()}
        </span>
      </p>
      <Tooltip id="category-tooltip" />
    </div>
  );
};

export default FiltrationItem;
