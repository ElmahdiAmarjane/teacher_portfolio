import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { LogOut } from 'lucide-react';

export default function UserAvatar() {
    const { auth } = usePage().props;
    const user = auth.user;
    const [menuOpen, setMenuOpen] = useState(false);

    const { post } = useForm();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleLogout = () => {
        post(route('logout')); // doit exister côté Laravel
    };

    const avatarColor = stringToColor(user.name);
    const firstLetter = user.name.charAt(0).toUpperCase();

    return (
        <div className="relative ml-4">
            <button
                onClick={toggleMenu}
                className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: avatarColor }}
                >
                    {firstLetter}
                </div>
                <span className="text-gray-800 dark:text-white">{user.name}</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden">
    <button
      onClick={handleLogout}
      className="flex items-center w-full gap-2 px-4 py-2 text-sm font-medium  hover:bg-red-50 dark:hover:bg-red-900 transition-colors duration-200"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  </div>
            )}
        </div>
    );
}


function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 60%)`; // Couleur pastel
    return color;
}
