import { Trans } from "@lingui/macro";

import LocaleSwitcher from "./LocaleSwitcher";

const Header = () => {
  return (
    <header>
      <h1>
        <Trans>Cats</Trans>
      </h1>
      <LocaleSwitcher />
    </header>
  );
};

export default Header;
