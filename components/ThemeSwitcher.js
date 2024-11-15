"use client";
import { useTheme } from "@/contexts/ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1 rounded-2xl">
        Theme
        <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
      >
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Business"
            value="business"
            checked={theme === "business"}
            onChange={(e) => changeTheme(e.target.value)}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Corporate"
            value="corporate"
            checked={theme === "corporate"}
            onChange={(e) => changeTheme(e.target.value)}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Dark"
            value="dark"
            checked={theme === "dark"}
            onChange={(e) => changeTheme(e.target.value)}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Light"
            value="light"
            checked={theme === "light"}
            onChange={(e) => changeTheme(e.target.value)}
          />
        </li>
      </ul>
    </div>
  );
}
