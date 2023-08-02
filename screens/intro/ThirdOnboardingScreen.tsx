import OrganizeYourTasks from "../../assets/images/intro/organize-your-tasks.svg";

import Onboarding from "../../components/Onboarding";

const FirstOnboardingScreen: React.FC = () => {
  return (
    <Onboarding
      Image={OrganizeYourTasks}
      step={3}
      title="Orgonaize your tasks"
      description="You can organize your daily tasks by adding your tasks into separate categories"
    />
  );
};

export default FirstOnboardingScreen;
