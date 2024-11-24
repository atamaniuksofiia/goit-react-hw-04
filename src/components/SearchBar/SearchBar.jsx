import { useState } from "react";
import toast from "react-hot-toast";
import s from "./SearchBar.module.css";
const SearchBar = ({ onChangeQuery }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Будь ласка, введіть текст для пошуку!");
      return;
    }
    onChangeQuery(inputValue.trim());
    setInputValue("");
  };

  return (
    <header className={s.header}>
      <form className={s.search} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
export default SearchBar;
