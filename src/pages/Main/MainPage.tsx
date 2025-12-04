import { useState } from "react";
import MainStepOne from "./MainStepOne";
import MainStepTwo from "./MainStepTwo";
import MainStepThree from "./MainStepThree";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
   const navigate = useNavigate();

  const finish = () => {
    navigate("/chapters");
  };
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <div
      className="
        h-[calc(100vh-90px)]   
        w-full
        flex items-center justify-center
        overflow-y-auto
        p-6 md:p-10
      "
    >
      <div className="w-full max-w-3xl">
        {step === 1 && <MainStepOne next={next} />}
        {step === 2 && <MainStepTwo next={next} back={back} />}
        {step === 3 && <MainStepThree back={back} finish={finish} />}
      </div>
    </div>
  );
}
