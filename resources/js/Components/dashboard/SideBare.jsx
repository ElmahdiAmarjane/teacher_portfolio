import React from 'react';
import { Link } from '@inertiajs/react';

const SideBar = () => {
  // Using window.route as universal solution
  const isActive = (routeName) => window.route().current(routeName);

  return (
    <div className="w-64 bg-white shadow-md h-screen sticky left-0 top-0">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Dashboard Link */}
          <li>
            <Link 
              href={window.route('dashboard')}
              className={`flex items-center p-2 rounded-lg ${isActive('dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
          </li>

          {/* Users Publication */}
          <li>
            <Link 
              href={window.route('publication')}
              className={`flex items-center p-2 rounded-lg ${isActive('publication') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h7l2 2h7a2 2 0 012 2v10a2 2 0 01-2 2zM9 17h6M9 13h6m-6-4h1m3 0h1" />
                </svg>
              Publications
            </Link>
          </li>

          {/* Users Link */}
          <li>
            <Link 
              href={window.route('users')}
              className={`flex items-center p-2 rounded-lg ${isActive('users') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Users
            </Link>
          </li>

          {/* Blog Link */}
          <li>
            <Link 
              href={window.route('blog')}
              className={`flex items-center p-2 rounded-lg ${isActive('blog') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;