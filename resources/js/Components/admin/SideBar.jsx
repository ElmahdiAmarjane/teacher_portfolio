import { useState, useEffect } from "react";
import logo from "@/assets/images/logo.png";
import { LayoutDashboard as DashIcon, MenuIcon, X } from "lucide-react";
import { Layers as PubsIcon } from "lucide-react";
import { Users as UsersIcon } from "lucide-react";
import { LucideNewspaper as BlogIcon } from "lucide-react";
import { Link } from "@inertiajs/react";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [mobileScreen, setMobileScreen] = useState(false);

  const Menus = [
    { title: "Dashboard", src: <DashIcon className="w-6 h-6" /> , path:"/admin" },
    { title: "Publications", src: <PubsIcon className="w-6 h-6" /> , path:"/admin/pubs" },
    { title: "Users", src: <UsersIcon className="w-6 h-6" /> , path:"/admin/users"},
    { title: "Blog", src: <BlogIcon className="w-6 h-6" />, path:"/admin/blog" },
  ];

  // Close sidebar when clicking outside of it on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileScreen && !event.target.closest(".sidebar")) {
        setMobileScreen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileScreen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`${open ? "w-72" : "w-20"} p-5 pt-6 duration-300 h-screen bg-primary sticky left-0 top-0 hidden sm:block sidebar`}
      >
        <svg
          onClick={() => setOpen(!open)}
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 absolute cursor-pointer -right-3 top-9 ${!open && "rotate-180"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <div className="flex items-center gap-x-4">
          <img
            src={logo}
            alt=""
            className={`w-12 duration-500 cursor-pointer ${open && "rotate-[360deg]"}`}
          />
          <h1 className={`text-white origin-left font-medium text-xl ${!open && "scale-0"}`}>
            Admin Panel
          </h1>
        </div>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className=""
            >
              <Link href={menu.path} className="flex items-center p-2 text-sm text-gray-300 rounded cursor-pointer gap-x-4 hover:bg-light-white">
              {menu.src}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
              </Link>
           
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Sidebar */}
      <div className="sm:hidden bg-primary text-white sticky top-0">
        <MenuIcon
          onClick={() => setMobileScreen(true)}
          className={ `sticky   w-10 h-10 z-50 cursor-pointer top-4 left-4 ${mobileScreen && 'hidden'}` }
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileScreen && (
        <div className="fixed inset-0 z-60 bg-black bg-opacity-50" onClick={() => setMobileScreen(false)}>
          <div
            className="h-screen p-5 pt-6 w-72 bg-primary sidebar"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the sidebar from closing it
          >
            <X
              onClick={() => setMobileScreen(false)}
              className="absolute text-white cursor-pointer size-6 top-4 right-4"
            />
            <div className="flex items-center gap-x-4">
              <img
                src={logo}
                alt=""
                className="w-12 duration-500 cursor-pointer"
              />
              <h1 className="text-xl font-medium text-white origin-left">
                Admin Panel
              </h1>
            </div>

            <ul className="pt-6">
              {Menus.map((menu, index) => (
                <li
                  key={index}
                  className="flex items-center p-2 text-sm text-gray-300 rounded cursor-pointer gap-x-4 hover:bg-light-white"
                >
                  {menu.src}
                  <span>{menu.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;