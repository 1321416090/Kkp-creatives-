
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">CoverGenie AI</h1>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
            <span className="text-indigo-600">Expert Mode</span>
            <span>Resume Sync</span>
            <span>Interview Prep</span>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {children}
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} CoverGenie AI. Designed for high-impact careers.
        </p>
      </footer>
    </div>
  );
};
