import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [theme, setTheme] = useState(() => {

    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <MyContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </MyContext.Provider>
  );
}
