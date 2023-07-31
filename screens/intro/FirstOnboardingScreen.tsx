import React from "react";

import ManageYourTasksImage from "../../assets/intro/manage-your-tasks.svg";

import Onboarding from "../../components/Onboarding";

const FirstOnboardingScreen: React.FC = () => {
  return <Onboarding image={<ManageYourTasksImage />} step={1} />;
};

export default FirstOnboardingScreen;
