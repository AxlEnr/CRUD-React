import React, { useEffect, useState } from 'react';
function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    const storedRole = localStorage.getItem("rol");
    const storedToken = localStorage.getItem("token");

    setUserRole(storedRole);
    setToken(storedToken);
  }, []);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  }

  const handleNavbar = () => {
    localStorage.getItem("token");
    localStorage.getItem("rol");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");

    setToken(null);
    setUserRole(null);
    window.location.href = "/home"
  }

    return (
      <nav className="shadow-lg navbar-container">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex items-center py-4">
              <h1 className="text-2xl font-bold nb-name">Nombre del e-commerce</h1>
            </div>
            
            
            {/* Menú principal */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="/home" className="py-4 px-3 navbar-href">
                Inicio
              </a>
              <a href="/contact" className="py-4 px-3 navbar-href">
                Contacto
              </a>
              <a href="/aboutus" className="py-4 px-3 navbar-href">
                Acerca de
              </a>
              {token ? (
                <>

                  <a href="#" className="py-4 px-3 navbar-href">Ajustes</a>

                  <div className="relative group">
                    <button className="py-4 px-3 flex items-center transition duration-300 dropdown">
                      <span>Mi cuenta</span>
                      <svg className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-0 w-48  rounded-md shadow-lg py-1 z-10 hidden group-hover:block dropdown-menu">
                      <a href="#" className="block px-4 py-2 text-gray-700 dropdown-select">Mis Compras</a>
                      <a href="#" className="block px-4 py-2 text-gray-700 dropdown-select">Mi perfil</a>
                      <a href="#" className="block px-4 py-2 text-gray-700 dropdown-select" onClick={handleLogout}>Cerrar Sesión</a>
                      {userRole === "admin" && (
                        <a href="#" className="block px-4 py-2 text-gray-700 dropdown-select">Panel de Control</a>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <a href="/login" className="py-4 px-3 navbar-href">Iniciar Sesión</a>
              )}

            </div>
            
            {/* Botón para móvil */}
            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button" onClick={toggleMobileMenu}>
                <svg className="w-6 h-6 nb-name" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Menú móvil*/}
        <div className={`${isMobileMenuOpen ? `block` : `hidden`} mobile-menu mt-2`}>
          <ul className="">
            {token ? (
              <>
                <li><a href="#" className="block px-4 py-2 text-sm navbar-href">Ajustes</a></li>
                <li><a href="#" className="block px-4 py-2 text-sm navbar-href">Mis Compras</a></li>
                <li><a href="#" className="block px-4 py-2 text-sm navbar-href">Mi perfil</a></li>
                {userRole === "admin" && (
                  <li><a href="#" className="block px-4 py-2 text-sm navbar-href">Panel de Control</a></li>
                )}
                <li><a href="#" className="block px-4 py-2 text-sm navbar-href" onClick={handleLogout}>Cerrar Sesión</a></li>
              </>
            ) : (
              <li><a href="/login" className="block px-4 py-2 text-sm navbar-href">Iniciar Sesión</a></li>
            )}
          </ul>
        </div>
      </nav>
    );
}

export default Navbar;