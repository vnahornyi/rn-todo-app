import useLocale from "../../../shared/hooks/useLocale";

const LocaleSwitcher: React.FC = () => {
  const { currentLocale, selectLocale } = useLocale();

  const handleChangeLocale = (event: React.FormEvent<HTMLSelectElement>) => {
    selectLocale(event.currentTarget.value);
  };

  return (
    <select value={currentLocale} onChange={handleChangeLocale}>
      <option value="en">EN</option>
      <option value="uk">UK</option>
    </select>
  );
};

export default LocaleSwitcher;
