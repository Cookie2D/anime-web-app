"use client";

import React, { useLayoutEffect, useState } from "react";
import {
  PlayerNavigationCategory,
  PlayerNavigationItem,
} from "./types/Player.types";
import PlayerNavigationItemComponent from "./PlayerNavigationItem";
import { cn } from "@/utils/cn";

interface Props {
  data: PlayerNavigationCategory[];
  currentItem: PlayerNavigationItem;
  setCurrentItem: React.Dispatch<
    React.SetStateAction<PlayerNavigationItem | undefined>
  >;
}
const PlayerNavigation: React.FC<Props> = ({
  data,
  currentItem,
  setCurrentItem,
}) => {
  const [isCategoryOpened, setIsCategoryOpened] = useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<PlayerNavigationCategory>();

  useLayoutEffect(() => {
    setCurrentCategory(() => data?.[0]);
  }, [data]);

  return (
    <div className="w-full overflow-x-scroll flex items-center flex-nowrap leading-4">
      {data.map((category, idx) => {
        const isActive = currentCategory?.title === category.title;
        return (
          <PlayerNavigationItemComponent
            onClick={() => {
              setCurrentCategory(category);
              if (isActive || (!isActive && !isCategoryOpened)) {
                setIsCategoryOpened((prev) => !prev);
              }
            }}
            key={idx}
            label={category.title || ""}
            className="flex items-center flex-nowrap text-nowrap"
          >
            <div
              className={cn(
                "transition-all ease-out flex flex-nowrap items-center",
                !isActive && "w-0"
              )}
            >
              {isCategoryOpened &&
                isActive &&
                category.items.map((item) => {
                  const isActive = item.index === currentItem.index;
                  return (
                    <PlayerNavigationItemComponent
                      key={item.index}
                      onClick={() => setCurrentItem(item)}
                      className={cn(
                        "text-nowrap hover:bg-gray-300",
                        isActive && "bg-gray-200"
                      )}
                      label={item.label || ""}
                    />
                  );
                })}
            </div>
          </PlayerNavigationItemComponent>
        );
      })}
    </div>
  );
};

export default PlayerNavigation;
