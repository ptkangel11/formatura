
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', href: '/', active: true },
    { name: 'CONFIRMAR PRESENÇA', href: '/confirmar-presenca' },
    { name: 'GALERIA', href: '#galeria' },
    { name: 'INFORMAÇÕES', href: '#informacoes' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 right-0 p-8 z-50 hidden md:block">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            item.href.startsWith('#') ? (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wider transition-colors duration-300 ${
                  item.active
                    ? 'text-white border border-white px-4 py-2'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium tracking-wider transition-colors duration-300 ${
                  item.active
                    ? 'text-white border border-white px-4 py-2'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 right-0 p-4 z-50 md:hidden">
        <button
          onClick={toggleMenu}
          className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-300"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-16 right-0 bg-black bg-opacity-90 backdrop-blur-sm border border-gray-600 rounded-lg shadow-lg min-w-[200px]">
            <div className="py-2">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium tracking-wider transition-colors duration-300 ${
                      item.active
                        ? 'text-white bg-white bg-opacity-10 border-l-2 border-white'
                        : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium tracking-wider transition-colors duration-300 ${
                      item.active
                        ? 'text-white bg-white bg-opacity-10 border-l-2 border-white'
                        : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
