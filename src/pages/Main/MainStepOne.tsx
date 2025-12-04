import MainStepContainer from "./components/MainStepContainer";
import Button from "../../components/ui/Button";

export default function MainStepOne({ next }: { next: () => void  }) {
  return (
    <MainStepContainer>
      <div className="flex flex-col h-full">

        {/* TEXT AREA — will scroll if needed */}
        <div>
          <h1 className="text-red-600 font-[YouMurderer] text-4xl md:text-5xl mb-6">
            WELCOME TO SILVER EYE
          </h1>

          <p className="text-white font-[Yomogi] text-xl leading-loose tracking-wide">
            u will play against time and hard challenges but before that you have to
            choose your character in the team the system is activated discover the
            challenges waiting for you in the gates you will play against time and
            hard challenges but before that you have to choose your character in the team
          </p>
        </div>

        {/* BUTTON STAYS AT THE BOTTOM */}
        <div className="mt-auto flex justify-end pt-10">
          <Button variant="primary" onClick={next} className="px-8 py-3">
            NEXT
          </Button>
        </div>

      </div>
    </MainStepContainer>
  );
}
