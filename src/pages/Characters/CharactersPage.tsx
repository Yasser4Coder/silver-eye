import CharacterCard from "./component/CharacterCard";

export default function CharactersPage() {
  return (
    <div
      className="
        w-full h-full
        flex flex-wrap justify-center
        gap-6
        px-4 py-10
      "
    >
      <CharacterCard />
      <CharacterCard />
      <CharacterCard />
      <CharacterCard />
      <CharacterCard />
      <CharacterCard />
    </div>
  );
}
