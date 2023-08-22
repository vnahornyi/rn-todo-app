import { t } from "@lingui/macro";
import ManageYourTasksImage from "../../assets/images/intro/manage-your-tasks.svg";

import Onboarding from "../../components/Onboarding";
import useLocale from "../../../shared/hooks/useLocale";

const FirstOnboardingScreen: React.FC = () => {
  const { i18n } = useLocale();

  return (
    <Onboarding
      Image={ManageYourTasksImage}
      step={1}
      title={t(i18n)`Manage your tasks`}
      description={t(
        i18n
      )`You can easily manage all of your daily tasks in DoMe for free`}
    />
  );
};

export default FirstOnboardingScreen;
