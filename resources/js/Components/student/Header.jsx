import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-900">Professeur Informatique</span>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-900 hover:text-teal-600 px-3 py-2 transition-colors">
              Accueil
            </a>
            <a href="/formations" className="text-gray-900 hover:text-teal-600 px-3 py-2 transition-colors">
              Formations
            </a>
            <a href="#apropos" className="text-gray-900 hover:text-teal-600 px-3 py-2 transition-colors">
              À propos
            </a>
            <a href="#blog" className="text-gray-900 hover:text-teal-600 px-3 py-2 transition-colors">
              Blog
            </a>
            <a href="/contact" className="text-gray-900 hover:text-teal-600 px-3 py-2 transition-colors">
              Contact
            </a>

            {/* Auth Buttons */}
            <div className="ml-4 flex items-center space-x-2">
              <a
                href="/login"
                className="px-4 py-2 text-sm font-medium text-teal-600 border border-teal-600 rounded-md hover:bg-teal-600 hover:text-white transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition"
              >
                Sign Up
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 focus:outline-none transition-colors"
              aria-label="Menu"
            >
              <svg
                className={`h-6 w-6 ${menuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${menuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 shadow-md">
          <a href="/" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-teal-600 hover:bg-gray-100 transition-colors">
            Accueil
          </a>
          <a href="/formations" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-teal-600 hover:bg-gray-100 transition-colors">
            Formations
          </a>
          <a href="#apropos" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-teal-600 hover:bg-gray-100 transition-colors">
            À propos
          </a>
          <a href="/contact" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-teal-600 hover:bg-gray-100 transition-colors">
            Contact
          </a>
          {/* Auth Buttons Mobile */}
          <div className="mt-3 space-y-2">
            <a
              href="/login"
              className="block w-full text-center px-4 py-2 text-sm font-medium text-teal-600 border border-teal-600 rounded-md hover:bg-teal-600 hover:text-white transition"
            >
              Login
            </a>
            <a
              href="/signup"
              className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;