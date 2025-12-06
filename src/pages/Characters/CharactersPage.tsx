import { useState } from "react";
import CharacterCard from "./component/CharacterCard";
import CharacterModal from "./component/CharacterModal";
import characterImage from "../../assets/characters/maciline.jpg";
import marcelinModalImage from "../../assets/characters/marcelinebs.png";
import juliusImage from "../../assets/characters/julius.png";
import juliusModalImage from "../../assets/characters/juliusbs.png";
import wolfImage from "../../assets/characters/wolf.jpg";
import wolfModalImage from "../../assets/characters/wolfbs.png";
import judithImage from "../../assets/characters/jodith.png";
import judithModalImage from "../../assets/characters/judithbs.png";
import johnImage from "../../assets/characters/john.jpg";
import johnModalImage from "../../assets/characters/johnbs.png";

export default function CharactersPage() {
  const [isMarcelineModalOpen, setIsMarcelineModalOpen] = useState(false);
  const [isJuliusModalOpen, setIsJuliusModalOpen] = useState(false);
  const [isWolfModalOpen, setIsWolfModalOpen] = useState(false);
  const [isJudithModalOpen, setIsJudithModalOpen] = useState(false);
  const [isJohnModalOpen, setIsJohnModalOpen] = useState(false);

  const marcelinBackstory = `Marceline was eight years old when she discovered that the world is not born fair, and that some souls are thrown into life the same way garbage is tossed into dark corners. She never knew what a home meant, nor what safety felt like; dumpsters were her roof, rain was her blanket, and the city—so cruel—became her only mother.

Her real mother sold what remained of her dignity just to provide scraps of life for her, while the father remained a faceless mystery… a mystery that never returned and never answered.

At fourteen, Marceline learned another lesson—one harsher, deadlier.

Her only friend, her tiny mirror in this empty world, was kidnapped from the same street that brought them together. Weeks later, they found her torn apart inside a rusty dumpster.

That day, Marceline understood that the city was not just a creature that devoured the poor… but a monster that disassembled them and traded their pain.

Then it was her turn.

She was placed in the "Red Room," and the scalpel slid across her body as if searching for something deeper than flesh… as if excavating her soul.

Strangely, she felt no fear, no pain.

She was so hollow that even pain couldn't find a place to settle within her.

And in the midst of that inner ruin, a sin was born—the sin of envy.

Not a shallow envy, but a bitter, philosophical one:

She envied those who sinned and were forgiven, those who cried and were heard, those who had a home that held their fragility instead of turning it into cruelty.

She envied even the children who ran from the rain into a mother's arms, while she ran into the shadow of a cold dumpster.

She envied anyone who lived a simple life without having their childhood stolen from them.

She envied them because she realized the greatest injustice in existence… is to be born in the wrong place.

A strange man eventually removed Marceline from the Red Room, stripped of any human nature.

She walked like a dark idea, like an existential question that had lost its answer.

She killed with coldness, sold the very organs they once tried to steal from her, as if taking revenge on a world that gave others everything… and took everything from her.

Her entire path echoed one truth:

Envy is not always a sin…

Sometimes it is the silent cry of a soul that believed justice is an illusion—

and that she was created only to witness its cruelty.`;

  const juliusBackstory = `Ulyss… the only child of parents who separated and left him to face the world with empty hands.

At fourteen, he found himself caught between the silence of cold houses and the noise of harsh streets, learning from life directly—without a teacher, without support.

Years passed, revealing a truth he was never prepared to hear:

his mother, the one he had always seen as his only source of safety, was drowning in her own suffering.

That discovery pierced his chest like heavy air, tightened his breath, and left him in an endless spiral of questions and pain.

He decided to leave school.

He could no longer pretend that everything was fine.

He chose the streets as his path, searching in them for meaning… or for a way to survive.

He learned to defend himself, not out of love for violence, but because life never gave him the luxury of being weak.

And with time, he began drifting toward dark paths that fixed nothing—only broke what was left.

It wasn't a fall into what's forbidden as much as it was an escape from pain… an escape toward desire in all its forms:

the desire for power, the desire to run away, the desire to feel alive even for a moment.

While drifting, he was being watched by someone who was more than just an unseen shadow.

And amid all this, there was one light that never dimmed: motorcycles.

They were his passion, his refuge, the only love that never betrayed him.

When he rode his bike, he felt as if the world grew wider, as if his soul escaped its cage.

In its speed, he found salvation; in the sound of its engine, he heard his heart beat again.

He loved every detail of it, big or small.

To him, it was more than a machine…

it was the freedom he was denied, the peace he had long searched for.

And so Ulyss lived—

between dark paths he tried to escape,

a pure passion trying to save him,

the sin of desire luring him toward ruin,

and a faint will guiding him toward a life worth living.`;

  const wolfBackstory = `Wolf carried within him a fierceness that knew no fear, as if the forest he grew up in had gifted him a heart that learned to swallow dangers instead of running from them. He was exiled to the outskirts of the city after his father's death— a man who betrayed a major gang and left behind a family paying the price for his sin. And at the age of five, when his mother thought she was protecting him by remarrying, she opened another door to torment.

Her new husband, an addict, distributed insults and beatings as if they were daily rituals. The child began swallowing this pain in silence, until his soul filled with a black hunger that could not be satisfied. And from that hunger, his sin was born: a craving for the feeling of control… a craving that drove him to kill small animals to fill a void he did not understand.

When his mother saw the spark before it became a fire, she enrolled him in school and took him to a therapist, trying to extinguish the monster the past had planted in his chest. Slowly, his path changed—not because he was completely healed, but because his life was forced into a new shape. Wolf grew up to become a nurse in a cancer clinic, carrying calm features that hid thousands of shadows. He treated others as if trying to quiet an old appetite—an appetite for pain that didn't die, but instead transformed into a need to save those who suffered as he once did.

Despite his apparent kindness, the question follows him like an open wound:

Did he become good because he overcame his sin… or because he found another hunger, a less dark one, to hide the first?

For some souls are never healed… they simply master the art of hiding.`;

  const judithBackstory = `Judith is a 24-year-old young woman, the adopted daughter of a psychiatrist.

A university student majoring in psychology, ambitious, wanting to be a continuation of her father's success— the man who gave her everything she once lacked. She was trying to repay life's debt… but deep inside, she was still that seven-year-old child who sat in the corners of the orphanage, staring silently at its walls, believing that freedom didn't lie in escaping the building but in escaping the memory.

A child who spoke only one word, heavy with meaning: "Hmm…"

On dark nights, the echo of a voice she knew too well returned— the voice of the orphanage worker, the nightmare that haunted her sleep:

"You little bastard… bring these bags!"

And she would reply in a hoarse, faint voice:

"Hmm…"

There were many sins in the orphanage, but the one that stayed carved into Judith's memory was the sin of laziness—

the laziness of the workers who dumped their responsibilities on the children,

the laziness of the administration that ignored the harm done to them,

the laziness of a world that never saved a child being crushed slowly.

That laziness was more dangerous than cruelty… because it allowed cruelty to grow unchecked.

She always heard:

"Leave her… she's useless… the girl doesn't even speak."

And because of that laziness, she was left alone in dark corners until she became a silence that walked.

He knocked on the orphanage door.

The receptionist greeted him:

"How may I help you, sir?"

He replied:

"I'm getting older… and I want to adopt a little girl I can care for and give a spark of life."

The receptionist answered with hesitation and a tone tinged with mockery:

"We have a girl… but she doesn't speak. I think she's autistic… I'll bring her."

When William met her, she was carrying a bag heavier than her age— a bag filled with what remained of her shattered childhood.

He approached her slowly, then knelt before her as if proposing to a broken angel, and asked softly:

"What's your name, little one?"

Her lifeless eyes flickered toward him, and she said:

"Hmm… My name? I'm a girl dead to the world."

He was stunned by her words. She continued in a pale voice:

"Everyone who takes me gives me a name and leaves me among the trash… turns me into a doll to empty their anger into. What's the point of a name if it's just an unseen shadow?"

He froze in place, and his heart spoke before his mouth:

"How can a child this young speak with such pain?"

Then he said:

"Judith…"

His eyes filled with burning tears as he added:

"Come with me."

She replied faintly:

"Hmm… so be it… my fate is like the passing days."

She lifted her eyes to the sky and murmured:

"I wonder… will I be a torture doll this time?"`;

  const johnBackstory = `He grew up in an old neighborhood in the heart of the city—

a place where a person's worth was measured by the color of their skin, not the depth of their heart.

He worked at a car wash, smiling at customers who looked at him with contempt, their quiet laughter reminding him of his place in their eyes.

He apologized even when he did nothing wrong, burying his anger beneath thick layers of patience.

Despite everything he lived through, he held on to a pure, difficult dream:

to one day own a large bar in the center of the neighborhood—

a place where people could meet without judgment,

where music rose above colors,

and stories were shared without fear.

But behind every dream lies a scar,

and his scar was an old wound formed on a dark night, leaving a mark on his heart and a deeper one on his soul.

Then came a stranger—a man no one knew—

who listened to him, saw what no one else had seen,

opened the bar for him, and gave him ownership of it as an opportunity he never believed would be given to him.

But amid this unexpected generosity, something else was born inside him…

the sin of greed.

It was no longer enough to be an owner;

he wanted respect, status, and recognition—

everything he had long been denied—

as if the world owed him a debt.

In that moment, he realized that mercy does not always come from what is white,

and slavery is not always the fate of what is black.

Not everything white is kind…

and not everything black is a slave.`;

  return (
    <>
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
          onClick={() => setIsMarcelineModalOpen(true)}
        />
        <CharacterCard
          backgroundImage={juliusImage}
          characterName="Julius"
          animateFlip={true}
          onClick={() => setIsJuliusModalOpen(true)}
        />
        <CharacterCard
          backgroundImage={wolfImage}
          characterName="Wolf"
          animateFlip={true}
          onClick={() => setIsWolfModalOpen(true)}
        />
        <CharacterCard
          backgroundImage={judithImage}
          characterName="Judith"
          animateFlip={true}
          onClick={() => setIsJudithModalOpen(true)}
        />
        <CharacterCard
          backgroundImage={johnImage}
          characterName="John"
          animateFlip={true}
          onClick={() => setIsJohnModalOpen(true)}
        />
        <CharacterCard />
      </div>

      {/* Marceline Character Modal */}
      <CharacterModal
        isOpen={isMarcelineModalOpen}
        onClose={() => setIsMarcelineModalOpen(false)}
        characterName="Marceline"
        imageUrl={marcelinModalImage}
        backstory={marcelinBackstory}
      />

      {/* Julius Character Modal */}
      <CharacterModal
        isOpen={isJuliusModalOpen}
        onClose={() => setIsJuliusModalOpen(false)}
        characterName="Julius"
        imageUrl={juliusModalImage}
        backstory={juliusBackstory}
      />

      {/* Wolf Character Modal */}
      <CharacterModal
        isOpen={isWolfModalOpen}
        onClose={() => setIsWolfModalOpen(false)}
        characterName="Wolf"
        imageUrl={wolfModalImage}
        backstory={wolfBackstory}
      />

      {/* Judith Character Modal */}
      <CharacterModal
        isOpen={isJudithModalOpen}
        onClose={() => setIsJudithModalOpen(false)}
        characterName="Judith"
        imageUrl={judithModalImage}
        backstory={judithBackstory}
      />

      {/* John Character Modal */}
      <CharacterModal
        isOpen={isJohnModalOpen}
        onClose={() => setIsJohnModalOpen(false)}
        characterName="John"
        imageUrl={johnModalImage}
        backstory={johnBackstory}
      />
    </>
  );
}
