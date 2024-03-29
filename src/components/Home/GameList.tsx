import React, { useEffect, useState } from "react";
import { GameListData } from "./../../shared";

export interface GameListProps {
  onGamePress: (gameName: string) => void;
}

export const GameList: React.FC<GameListProps> = ({ onGamePress }) => {
  return (
    <div
      className="grid grid-cols-3 sm:grid-cols-4
    md:grid-cols-5 lg:grid-cols-7 mt-4"
    >
      {GameListData?.map((item) => (
        <div
          key={item.id}
          onClick={() => onGamePress(item.name)}
          className="flex flex-col 
            items-center cursor-pointer
            "
        >
          <img
            src={item.image}
            width={45}
            height={45}
            className="hover:animate-bounce transition-all 
                duration-150"
          />
          <h2 className="text-[14px] text-center">{item.name}</h2>
        </div>
      ))}
    </div>
  );
};
