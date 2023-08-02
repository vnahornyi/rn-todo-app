import ManageYourTasksImage from "../../assets/images/intro/manage-your-tasks.svg";

import Onboarding from "../../components/Onboarding";

const FirstOnboardingScreen: React.FC = () => {
  return (
    <Onboarding
      Image={ManageYourTasksImage}
      step={1}
      title="Manage your tasks"
      description="You can easily manage all of your daily tasks in DoMe for free"
    />
  );
};

export default FirstOnboardingScreen;
