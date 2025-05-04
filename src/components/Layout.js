import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-700 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🐾</span>
              <h1 className="text-2xl font-bold">Virtual Pet Adoption Center</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-100 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Virtual Pet Adoption Center</p>
          <p className="text-sm mt-1">Made with ❤️ for all pets looking for a forever home</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;