import { t } from "@lingui/macro";
import useLocale from "../../../shared/hooks/useLocale";
import OrganizeYourTasks from "../../assets/images/intro/organize-your-tasks.svg";

import Onboarding from "../../components/Onboarding";

const ThirdOnboardingScreen: React.FC = () => {
  const { i18n } = useLocale();

  return (
    <Onboarding
      Image={OrganizeYourTasks}
      step={3}
      title={t(i18n)`Orgonaize your tasks`}
      description={t(
        i18n
      )`You can organize your daily tasks by adding your tasks into separate categories`}
    />
  );
};

export default ThirdOnboardingScreen;
