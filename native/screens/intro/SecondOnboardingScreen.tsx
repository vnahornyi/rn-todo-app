import { t } from "@lingui/macro";
import useLocale from "../../../shared/hooks/useLocale";
import CreateDailyRoutine from "../../assets/images/intro/create-daily-routine.svg";

import Onboarding from "../../components/Onboarding";

const SecondOnboardingScreen: React.FC = () => {
  const { i18n } = useLocale();

  return (
    <Onboarding
      Image={CreateDailyRoutine}
      step={2}
      title={t(i18n)`Create daily routine`}
      description={t(
        i18n
      )`In Uptodo you can create your personalized routine to stay productive`}
    />
  );
};

export default SecondOnboardingScreen;
