import { IoMoon } from "react-icons/io5";
import { GoSun } from "react-icons/go";
import { useTheme } from "../hooks/useTheme.jsx";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? <IoMoon /> : <GoSun />;
  const themeText = theme === "light" ? "Dark Mode" : "Light Mode";
  return (
    <header className={`section-header`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>

        <div className="theme-changer" onClick={toggleTheme}>
          <p>
            {themeIcon}
            &nbsp;{themeText}
          </p>
        </div>
      </div>
    </header>
  );
}
export default Header;
