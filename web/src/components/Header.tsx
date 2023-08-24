import { Plural } from "@lingui/macro";

import LocaleSwitcher from "./LocaleSwitcher";

const Header = () => {
  return (
    <header>
      <h1>
        <Plural value={1} one="# cat" few="# cats" other="# cats" />
      </h1>
      <h1>
        <Plural value={3} one="# cat" few="# cats" other="# cats" />
      </h1>
      <h1>
        <Plural value={5} one="# cat" few="# cats" other="# cats" />
      </h1>
      <LocaleSwitcher />
    </header>
  );
};

export default Header;
