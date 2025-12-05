import CharacterCard from "./component/CharacterCard";
import characterImage from "../../assets/characters/maciline.jpg";
import juliusImage from "../../assets/characters/julius.png";

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
      <CharacterCard
        backgroundImage={characterImage}
        characterName="Marceline"
        animateFlip={true}
      />
      <CharacterCard
        backgroundImage={juliusImage}
        characterName="Julius"
        animateFlip={true}
      />
      <CharacterCard />
      <CharacterCard />
      <CharacterCard />
      <CharacterCard />
    </div>
  );
}
