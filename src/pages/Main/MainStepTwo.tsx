import MainStepContainer from "./components/MainStepContainer";
import Button from "../../components/ui/Button";

export default function MainStepTwo({
  next,
  back
}: {
  next: () => void;
  back: () => void;
}) {
  return (
    <div className="w-full flex flex-col items-center">


      <MainStepContainer>
        <div className="flex flex-col h-full">

          <div>
            <h1 className="text-red-600 font-[YouMurderer] text-5xl">
              THE STORY
            </h1>

            <p className="text-white font-[Yomogi] text-lg leading-loose tracking-wide mt-6">
              u will play against time and hard challenges but before that you have to
              choose your character in the team the system is activated discover the challenges waiting for you in the gates
              you will play against time and hard challenges but before that you have to
              choose your character in the team the system is activated discover the challenges waiting for you in the gates
              you will play against time and hard challenges but before that you have to
            </p>
          </div>

          <div className="mt-auto flex justify-between pt-10">
            <Button variant="secondary" onClick={back}>
              BACK
            </Button>

            <Button variant="primary" onClick={next}>
              NEXT
            </Button>
          </div>

        </div>
      </MainStepContainer>
    </div>
  );
}
