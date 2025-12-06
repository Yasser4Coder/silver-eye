import { useState, useEffect, useMemo } from "react";
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
import williamImage from "../../assets/characters/william.png";
import williamModalImage from "../../assets/characters/williambs.png";
import mrJImage from "../../assets/characters/mrj.jpg";
import mrJModalImage from "../../assets/characters/mrjbs.png";

export default function CharactersPage() {
  const [isMarcelineModalOpen, setIsMarcelineModalOpen] = useState(false);
  const [isJuliusModalOpen, setIsJuliusModalOpen] = useState(false);
  const [isWolfModalOpen, setIsWolfModalOpen] = useState(false);
  const [isJudithModalOpen, setIsJudithModalOpen] = useState(false);
  const [isJohnModalOpen, setIsJohnModalOpen] = useState(false);
  const [isWilliamModalOpen, setIsWilliamModalOpen] = useState(false);
  const [isSeventhCardModalOpen, setIsSeventhCardModalOpen] = useState(false);
  const [isMrJModalOpen, setIsMrJModalOpen] = useState(false);

  // Animation sequence state
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [animatingCardIndex, setAnimatingCardIndex] = useState<number | null>(
    null
  );
  const [glowingCardIndex, setGlowingCardIndex] = useState<number | null>(null);
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set()); // Cards that have been revealed (show character bg)
  const [scatteringCards, setScatteringCards] = useState<
    Map<number, "left" | "right">
  >(new Map()); // Cards that are scattering
  const [showSeventhCard, setShowSeventhCard] = useState(false);

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

  const williamBackstory = `do this text right now then i change it later`;

  const mrJBackstory = `J" Jerov had never been anything more than a child born in a small Russian village buried under snow for nine months of the year. His father died in a war he never truly understood, and his mother later took her own life, collapsing under the weight of poverty, cold, and loneliness.

By the age of ten, Jerov learned that the world was colder than the frost clinging to the village windows… and that mercy was nothing but a myth.

At sixteen, he was forcibly conscripted into the Spetsnaz, Russia's special forces.

And there… the creation of the monster began.

Jerov became an exceptional soldier by every measure:

A massive build, deadly discipline, sharp intelligence, and a heart forced to turn into stone just to survive.

But his excellence made him seen as a tool—never a human.

The Mission That Changed Him Forever

During a secret operation in Siberia, his unit was sent to raid an underground facility with zero details.

Their commanders told them:

"You see nothing… you know nothing… you hear nothing. Whoever asks, dies."

But Jerov did see.

He opened a door he was never supposed to open—

and found himself staring at glass rooms where experiments were being conducted on humans.

Men… women… children.

Eyes open, but their consciousness stolen.

Bodies injected with nameless substances.

Wires entering their skulls and leaving through their limbs.

It was a facility for manufacturing the "perfect soldier"…

by destroying the human inside.

And then, on a dimly lit screen, he found something else:

A blacklist containing names of Spetsnaz soldiers scheduled to be "recycled" after their usefulness ended.

His name was third.

At that moment…

he did not feel fear.

He felt something completely empty: nothingness.

His superior officer caught him.

An immediate kill order was issued.

The State Hunting the Man Who No Longer Belonged to It

Within minutes, the facility turned into a killing ground.

Comrades from yesterday became hunters today.

Jerov fled through the tunnels—wounded, half-dead, chased mercilessly by the very unit he once served with.

He collapsed in the frozen forest, his blood freezing before it touched the ground.

Had fate not intervened, he would have died there.

His Savior… Was the Silver Eye Himself

A single man appeared in the snow.

His face hidden behind a mask…

His eyes dead in the Siberian darkness.

He carried Jerov away without speaking a word.

Treated his wounds.

Pulled him back from the edge of death.

And as Jerov awakened, the man spoke in a calm, terrifying voice:

"You are now dead to Russia…

So be alive only for me."

Jerov had nothing left—

No family, no homeland, no identity.

Everything had been stolen.

The Silver Eye gave him one thing back: purpose.

From that moment, he became Mr. J—

The black shadow of the Silver Eye,

his right hand,

his guardian,

the blade that never hesitates.

Why did Mr. J kill himself on the rooftop?

Because Russia would have turned him into a tortured corpse.

Interrogation would have branded him a traitor in the eyes of the Silver Eye.

And living without his "savior" meant returning to the void he had carried since childhood.

For him, death was—

a choice,

a freedom,

and the ultimate act of loyalty.`;

  const seventhCardBackstory = `SILVER EYE`;

  // Define cards array for easier management (memoized to prevent re-creation)
  const cards = useMemo(
    () => [
      {
        backgroundImage: characterImage,
        characterName: "Marceline",
        setModalState: setIsMarcelineModalOpen,
      },
      {
        backgroundImage: juliusImage,
        characterName: "Julius",
        setModalState: setIsJuliusModalOpen,
      },
      {
        backgroundImage: wolfImage,
        characterName: "Wolf",
        setModalState: setIsWolfModalOpen,
      },
      {
        backgroundImage: judithImage,
        characterName: "Judith",
        setModalState: setIsJudithModalOpen,
      },
      {
        backgroundImage: johnImage,
        characterName: "John",
        setModalState: setIsJohnModalOpen,
      },
      {
        backgroundImage: mrJImage,
        characterName: "Mr. J",
        setModalState: setIsMrJModalOpen,
      },
    ],
    []
  );

  // Prevent body scroll during scatter animation
  useEffect(() => {
    // Prevent scrolling when cards are scattering
    if (scatteringCards.size > 0) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [scatteringCards.size]);

  // Sequential animation logic: flip → glow (3s) → next card
  useEffect(() => {
    // Start animation sequence
    const startAnimationSequence = () => {
      cards.forEach((_, index) => {
        // Delay for each card: (flip time 3s + glow time 1.2s) * index
        const flipDelay = index * 4200; // 4.2 seconds per card (3s flip + 1.2s glow)

        // Trigger flip animation
        setTimeout(() => {
          setAnimatingCardIndex(index);

          // After flip completes (3s), mark as flipped and start glow
          setTimeout(() => {
            setFlippedCards((prev) => new Set([...prev, index]));
            setAnimatingCardIndex(null);
            // Reveal character background when glow starts
            setRevealedCards((prev) => new Set([...prev, index]));
            setGlowingCardIndex(index);

            // After 1.2 seconds, stop glow and move to next card
            setTimeout(() => {
              setGlowingCardIndex(null);

              // If this is the 6th card (index 5), trigger scatter animation
              if (index === 5) {
                // Wait a moment, then scatter the first 6 cards
                setTimeout(() => {
                  const scatterMap = new Map<number, "left" | "right">();
                  // Cards 0, 1, 2 go left
                  scatterMap.set(0, "left");
                  scatterMap.set(1, "left");
                  scatterMap.set(2, "left");
                  // Cards 3, 4, 5 go right
                  scatterMap.set(3, "right");
                  scatterMap.set(4, "right");
                  scatterMap.set(5, "right");
                  setScatteringCards(scatterMap);

                  // After scatter animation (4s), show 7th card
                  setTimeout(() => {
                    setShowSeventhCard(true);
                    // Start 7th card animation (6 flips in 6 seconds)
                    setAnimatingCardIndex(6);

                    // After 6 seconds, mark as flipped and start glow
                    setTimeout(() => {
                      setFlippedCards((prev) => new Set([...prev, 6]));
                      setAnimatingCardIndex(null);
                      setRevealedCards((prev) => new Set([...prev, 6]));
                      setGlowingCardIndex(6);

                      // After 1.2 seconds, stop glow
                      setTimeout(() => {
                        setGlowingCardIndex(null);
                      }, 1200);
                    }, 6000);
                  }, 1000);
                }, 500);
              }
            }, 1200);
          }, 3000);
        }, flipDelay);
      });
    };

    startAnimationSequence();
  }, [cards]); // Include cards in dependencies

  return (
    <div className="w-full h-full overflow-hidden">
      <div
        className="
        w-full h-full
        flex flex-wrap justify-center
        gap-6
        px-4 py-10
        overflow-hidden
        relative
      "
      >
        {cards.map((card, index) => {
          const isFlipped =
            flippedCards.has(index) || animatingCardIndex === index;
          const shouldAnimate = animatingCardIndex === index; // Only animate when currently flipping
          const showCharacterBg =
            revealedCards.has(index) || glowingCardIndex === index; // Show character bg during/after glow
          const scatterDirection = scatteringCards.get(index) || null;

          return (
            <CharacterCard
              key={index}
              backgroundImage={card.backgroundImage}
              characterName={card.characterName}
              animateFlip={isFlipped}
              shouldAnimate={shouldAnimate}
              isGlowing={glowingCardIndex === index}
              showCharacterBg={showCharacterBg}
              scatterDirection={scatterDirection}
              numberOfFlips={3}
              flipDuration={3}
              onClick={() => card.setModalState(true)}
            />
          );
        })}
      </div>

      {/* 7th Card - Centered */}
      {showSeventhCard && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <CharacterCard
            backgroundImage={williamImage}
            characterName="William"
            animateFlip={flippedCards.has(6) || animatingCardIndex === 6}
            shouldAnimate={animatingCardIndex === 6}
            isGlowing={glowingCardIndex === 6}
            showCharacterBg={revealedCards.has(6) || glowingCardIndex === 6}
            numberOfFlips={6}
            flipDuration={6}
            onClick={() => setIsSeventhCardModalOpen(true)}
          />
        </div>
      )}

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

      {/* William Character Modal */}
      <CharacterModal
        isOpen={isWilliamModalOpen}
        onClose={() => setIsWilliamModalOpen(false)}
        characterName="William"
        imageUrl={williamModalImage}
        backstory={williamBackstory}
      />

      {/* Mr. J Character Modal */}
      <CharacterModal
        isOpen={isMrJModalOpen}
        onClose={() => setIsMrJModalOpen(false)}
        characterName="Mr. J"
        imageUrl={mrJModalImage}
        backstory={mrJBackstory}
      />

      {/* 7th Card (William) Character Modal */}
      <CharacterModal
        isOpen={isSeventhCardModalOpen}
        onClose={() => setIsSeventhCardModalOpen(false)}
        characterName="William"
        imageUrl={williamModalImage}
        backstory={seventhCardBackstory}
      />
    </div>
  );
}
