import React, { useEffect, useState } from "react";
// import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { FiSun } from "react-icons/fi";
import { BsFillMoonFill } from "react-icons/bs";
import { useTheme } from "next-themes";
export default function Navbar(): JSX.Element | null {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="w-full bg-gray-200 flex justify-between px-2 py-4 dark:bg-gray-800">
      <div className="font-bold">
        <span className="text-purple-800 dark:text-green-500 font-bold text-2xl">
          Calendar
        </span>{" "}
      </div>
      <div className="">
        <button className="mx-5 px-2 py-1 rounded-lg bg-green-500">
          Sign in
        </button>
        {currentTheme === "dark" ? (
          <button
            className="bg-black-700 hover:bg-black w-7 rounded-md border-purple-400 border-2 p-1"
            onClick={() => setTheme("light")}
          >
            {/* <SunIcon /> */}
            <FiSun />
          </button>
        ) : (
          <button
            className="bg-gray-100 w-7 rounded-md border-purple-400 border-2 p-1 hover:bg-gray-300"
            onClick={() => setTheme("dark")}
          >
            {/* <MoonIcon /> */}
            <BsFillMoonFill />
          </button>
        )}
      </div>
    </div>
  );
}
