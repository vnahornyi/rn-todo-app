import CreateDailyRoutine from "../../assets/images/intro/create-daily-routine.svg";

import Onboarding from "../../components/Onboarding";

const SecondOnboardingScreen: React.FC = () => {
  return (
    <Onboarding
      Image={CreateDailyRoutine}
      step={2}
      title="Create daily routine"
      description="In Uptodo  you can create your personalized routine to stay productive"
    />
  );
};

export default SecondOnboardingScreen;
