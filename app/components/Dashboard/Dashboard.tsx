import { useState } from "react";

function Dashboard() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleOpenNavbar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <aside 
      className="shadow-lg dash-container md:h-screen md:w-25 hover:md:w-64 transition-all duration-300 ease-in-out md:fixed bg-white group"
      onMouseEnter={toggleOpenNavbar}
      onMouseLeave={() => setIsOpen(!isOpen)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4 md:block">
          <div className={`${isOpen ? 'hidden' : 'block'}`}>
            <h2 className={`text-2xl font-bold nb-name mb-6 md:mb-12 hidden md:block group-hover:md:block whitespace-nowrap overflow-hidden }`}>
              Panel de Control
            </h2>
          </div>
          

          {/* Botón menú móvil (solo visible en md:hidden) */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <button
              className="outline-none mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 nb-name"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú escritorio (md:block) */}
        <nav className={`hidden md:block ${isOpen ? 'mt-20' : ''}`}>
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex py-2 px-3 navbar-href group-hover:px-3 w">
                <svg viewBox="0 0 24 24" className={`transition-all duration-200 w-10`} fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 15C10.1183 15 9.28093 14.8098 8.52682 14.4682C8.00429 14.2315 7.74302 14.1131 7.59797 14.0722C7.4472 14.0297 7.35983 14.0143 7.20361 14.0026C7.05331 13.9914 6.94079 14 6.71575 14.0172C6.6237 14.0242 6.5425 14.0341 6.46558 14.048C5.23442 14.2709 4.27087 15.2344 4.04798 16.4656C4 16.7306 4 17.0485 4 17.6841V19.4C4 19.9601 4 20.2401 4.10899 20.454C4.20487 20.6422 4.35785 20.7951 4.54601 20.891C4.75992 21 5.03995 21 5.6 21H8.4M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7ZM12.5898 21L14.6148 20.595C14.7914 20.5597 14.8797 20.542 14.962 20.5097C15.0351 20.4811 15.1045 20.4439 15.1689 20.399C15.2414 20.3484 15.3051 20.2848 15.4324 20.1574L19.5898 16C20.1421 15.4477 20.1421 14.5523 19.5898 14C19.0376 13.4477 18.1421 13.4477 17.5898 14L13.4324 18.1574C13.3051 18.2848 13.2414 18.3484 13.1908 18.421C13.1459 18.4853 13.1088 18.5548 13.0801 18.6279C13.0478 18.7102 13.0302 18.7985 12.9948 18.975L12.5898 21Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="ml-1 mt-2 sizeFont hidden group-hover:inline whitespace-nowrap">Usuarios</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex py-2 px-3 navbar-href group-hover:px-3">
                <svg className={`transition-all duration-200 w-10`} fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.005 492.006">
                  <path d="M341.97,0c-37.549,0-89.527,21.312-106.77,50.476v-2.347c0,0-4.907,7.851-13.737,7.851v5.887h-12.758v-1.961 c0-8.674-7.027-15.701-15.701-15.701h-1.961c-8.676,0-15.701,7.027-15.701,15.701v26.81c-8.652,5.526-14.421,15.152-14.421,26.181 c0,0.874,0.188,1.693,0.261,2.544c-9.295,1.798-15.168,4.378-15.168,7.268c0,2.859,5.769,5.424,14.916,7.216 c-3.737,2.873-6.188,7.331-6.188,12.411v29.236c-50.61,15.849-87.336,63.101-87.336,118.938c0,39.758,18.69,75.1,47.692,97.918 h-0.126c0,0,47.62,38.114,47.62,44.679v6.56c0,0-3.393,2.946-14.475,9.277c-0.501,0.277-0.966,0.554-1.499,0.854 c-0.223,0.129-0.387,0.229-0.613,0.345c-0.08,0.044-0.102,0.093-0.18,0.137c-7.113,4.356-11.369,9.722-11.369,15.564 c0,14.451,25.774,26.165,57.567,26.165c31.797,0,57.566-11.714,57.566-26.165c0-4.953-3.086-9.577-8.352-13.524 c-0.242-0.689-0.87-1.411-2.238-2.177c-12.857-7.193-16.579-10.476-16.579-10.476h-0.958v-6.315l0.793-0.244 c0-6.564,47.62-44.679,47.62-44.679l-1.014,0.076c29.059-22.814,47.785-58.18,47.785-97.994 c0-55.837-36.721-103.081-87.336-118.938v-29.236c0-5.071-2.449-9.538-6.186-12.411c9.145-1.792,14.917-4.356,14.917-7.216 c0-2.881-5.871-5.47-15.168-7.268c0.07-0.857,0.258-1.671,0.258-2.544c0-11.028-5.771-20.654-14.421-26.181v-8.165h12.756v5.887 c8.833,0,13.739,7.851,13.739,7.851V89.94c17.242,29.156,69.213,50.476,106.778,50.476c45.62,0,82.613-31.432,82.613-70.204 S387.599,0,341.97,0z"></path>
                </svg>
                <span className="ml-1 mt-2 sizeFont hidden group-hover:inline whitespace-nowrap">Productos</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex py-2 px-3 navbar-href group-hover:px-3">
                <svg viewBox="0 0 1024 1024" fill="#fff" className={`transition-all duration-200 w-10`}>
                  <path d="M53.6 1023.2c-6.4 0-12.8-2.4-17.6-8-4.8-4.8-7.2-11.2-6.4-18.4L80 222.4c0.8-12.8 11.2-22.4 24-22.4h211.2v-3.2c0-52.8 20.8-101.6 57.6-139.2C410.4 21.6 459.2 0.8 512 0.8c108 0 196.8 88 196.8 196.8 0 0.8-0.8 1.6-0.8 2.4v0.8H920c12.8 0 23.2 9.6 24 22.4l49.6 768.8c0.8 2.4 0.8 4 0.8 6.4-0.8 13.6-11.2 24.8-24.8 24.8H53.6z m25.6-48H944l-46.4-726.4H708v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8s-44.8-20-44.8-44.8c0-14.4 7.2-27.2 20-36h0.8v-57.6H363.2v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8-24.8 0-44.8-20-44.8-44.8 0-14.4 7.2-27.2 20-36h0.8v-57.6H125.6l-46.4 726.4zM512 49.6c-81.6 0-148.8 66.4-148.8 148.8v3.2h298.4l-0.8-1.6v-1.6c0-82.4-67.2-148.8-148.8-148.8z" fill=""></path>
                </svg>
                <span className="ml-2 mt-2 sizeFont hidden group-hover:inline whitespace-nowrap">Órdenes</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex py-2 px-3 navbar-href group-hover:px-3">
                <svg className={`transition-all duration-200 w-10`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 8H4M6 16H4M6 12H3M7 4.51555C8.4301 3.55827 10.1499 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C10.1499 21 8.4301 20.4417 7 19.4845M14 9.49991C13.5 9.37589 12.6851 9.37133 12 9.37589M12 9.37589C11.7709 9.37742 11.9094 9.36768 11.6 9.37589C10.7926 9.40108 10.0016 9.73666 10 10.6874C9.99825 11.7002 11 11.9999 12 11.9999C13 11.9999 14 12.2311 14 13.3124C14 14.125 13.1925 14.4811 12.1861 14.599C12.1216 14.599 12.0597 14.5991 12 14.5994M12 9.37589L12 8M12 14.5994C11.3198 14.6022 10.9193 14.6148 10 14.4999M12 14.5994L12 16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <span className="ml-2 mt-1 sizeFont hidden group-hover:inline whitespace-nowrap">Pagos</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Menú móvil (md:hidden) */}
        <nav className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden mt-4`}>
          <ul className="space-y-3">
            <li><a href="#" className="block px-4 py-2 text-sm navbar-href">Usuarios</a></li>
            <li><a href="#" className="block px-4 py-2 text-sm navbar-href">Pagos</a></li>
            <li><a href="#" className="block px-4 py-2 text-sm navbar-href">Órdenes</a></li>
            <li><a href="#" className="block px-4 py-2 text-sm navbar-href">Historial de pagos</a></li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Dashboard;