import React from "react";

export interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <div className="text-center">
      <h1 className="text-[35px] font-extrabold text-center">
        Find & Discover Players
        <br></br>
        <span className="text-blue-500">Near You</span>
      </h1>

      <h2 className="text-gray-500 px-8 md:px-16">
        Best Free Website to find and Discover game partner/player near you for
        your fav game
      </h2>
    </div>
  );
};
