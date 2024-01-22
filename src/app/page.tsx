import { GameList, Hero, Search } from "@/components";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center 
    justify-center mt-9"
    >
      <div className="w-[70%] md:w-[50%] lg:w-[55%]">
        <Hero />
        <Search />
        <GameList />
      </div>
    </main>
  );
}
