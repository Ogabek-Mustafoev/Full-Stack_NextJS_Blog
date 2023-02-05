import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "../services";
import DarkModeToggle from "react-dark-mode-toggle";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  function themeCheck() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function switchTheme() {
    console.log(1);
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }

  useEffect(() => {
    themeCheck();
    getCategories()
      .then(res => setCategories(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900 shadow-md w-full fixed top-0 z-50">
      <div className="container relative mx-auto ">
        <div className="md:flex items-center justify-between dark:bg-zinc-900 bg-white py-4 md:px-10 lg:px-7 px-3">
          <div className="flex items-center">
            <Link href={'/'}>
              <span className="cursor-pointer font-bold lg:text-4xl md:text-3xl text-2xl dark:text-white text-black">BLOG</span>
            </Link>
          </div>
          <div id="toggle" onClick={() => setActive(!active)}
            className={`icon absolute lg:right-8 right-4 top-6 cursor-pointer ${active && 'active'}`}>
            <div className="line line0 bg-black dark:bg-white"></div>
            <div className="line line1 bg-black dark:bg-white"></div>
            <div className="line line2 bg-black dark:bg-white"></div>
          </div>
          <DarkModeToggle
            className="absolute lg:right-8 right-14 md:right-4 top-6 cursor-pointer"
            onChange={switchTheme}
            checked={isDarkMode}
            size={50}
          />
          <div className={`md:flex dark:bg-zinc-900 md:items-center md:pb-0 pb-6 absolute 
        md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto lg:mr-16
        md:pl-0 pl-9 sm:pl-3 mr-10 transition-all duration-500 ease-in ${active ? 'top-16' : 'top-[-490px]'}`}>
            {categories.map(category => (
              <Link
                key={category.slug} href={`/category/${category.slug}`}
                className="md:ml-5 ml-0 text-lg md:my-0 my-7 flex"
              >
                <span className="hover:text-gray-400 dark:text-white text-black duration-300">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
