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
      className="shadow-lg dash-container md:h-screen md:w-25 hover:md:w-64 transition-all duration-300 ease-in-out md:fixed group text-black" // Cambiado a text-black
      onMouseEnter={toggleOpenNavbar}
      onMouseLeave={() => setIsOpen(!isOpen)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4 md:block">
          <div className={`${!isOpen ? 'hidden' : 'block'}`}>
            <h2 className={`sizeFont text-2xl font-bold nb-name mb-6 md:mb-12 hidden md:block group-hover:md:block whitespace-nowrap overflow-visible`}>
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
        <nav className={`hidden md:block ${!isOpen ? 'mt-20' : ''}`}>
          <ul className="space-y-4">
            <li>
              <a href="/usuarios" className="flex py-2 px-3 navbar-href group-hover:px-3 w">
                <svg className={`transition-all duration-200 w-10`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5 19.5L20 21M11 21H5.6C5.03995 21 4.75992 21 4.54601 20.891C4.35785 20.7951 4.20487 20.6422 4.10899 20.454C4 20.2401 4 19.9601 4 19.4V17.6841C4 17.0485 4 16.7306 4.04798 16.4656C4.27087 15.2344 5.23442 14.2709 6.46558 14.048C6.5425 14.0341 6.6237 14.0242 6.71575 14.0172C6.94079 14 7.05331 13.9914 7.20361 14.0026C7.35983 14.0143 7.4472 14.0297 7.59797 14.0722C7.74302 14.1131 8.00429 14.2315 8.52682 14.4682C9.13692 14.7446 9.8015 14.9218 10.5 14.9795M19 17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5C14 16.1193 15.1193 15 16.5 15C17.8807 15 19 16.1193 19 17.5ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <span className="ml-1 mt-2 sizeFont hidden group-hover:inline whitespace-nowrap">Usuarios</span>
              </a>
            </li>
            <li>
              <a href="/productos" className="flex py-2 px-3 navbar-href group-hover:px-3">
                <svg className={`transition-all duration-200 w-10`} fill="#fff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M450.334,287.165v-20.52c0-46.35-8.109-86.908-24.1-120.551c-13.061-27.475-31.324-50.358-54.283-68.012 c-39.216-30.153-78.579-34.451-80.235-34.62l-0.79-0.08h-74.861V16.204h-91.057v85.698h29.858v29.906H104.72v55.434H59.342 L0,294.324l56.705,201.472h227.662l56.705-201.472L281.73,187.242h-45.378v-55.434h-50.146v-29.906h29.858V74.723h73.128 c4.673,0.631,33.962,5.374,63.653,28.203c43.892,33.749,66.147,88.832,66.147,163.718v20.582 c-15.458,16.208-61.667,69.797-61.667,131.231c0,42.644,34.694,77.338,77.338,77.338S512,461.101,512,418.457 C512,356.296,465.896,303.286,450.334,287.165z M156.349,47.545h28.374V70.56h-28.374V47.545z M260.63,464.454H80.443 L37.521,311.952h46.83v70.397h172.37v-70.397h46.83L260.63,464.454z M115.692,351.009v-52.236H225.38v52.236H115.692z M263.267,218.583l34.374,62.028h-40.92v-13.18H84.351v13.18h-40.92l34.374-62.028h26.914h131.633H263.267z M205.011,163.148 v24.094H136.06v-24.094H205.011z M434.663,464.454c-25.362,0-45.996-20.634-45.996-45.996c0-42.549,29.632-82.814,46.085-101.891 c16.447,18.836,45.908,58.62,45.908,101.891C480.659,443.82,460.025,464.454,434.663,464.454z"></path> </g> </g> </g></svg>
                <span className="ml-1 mt-2 sizeFont hidden group-hover:inline whitespace-nowrap">Productos</span>
              </a>
            </li>
            <li>
              <a href="/ordenes" className="flex py-2 px-3 navbar-href group-hover:px-3">
                <svg className={`transition-all duration-200 w-10`}  viewBox="0 0 1024 1024" fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M959.018 208.158c0.23-2.721 0.34-5.45 0.34-8.172 0-74.93-60.96-135.89-135.89-135.89-1.54 0-3.036 0.06-6.522 0.213l-611.757-0.043c-1.768-0.085-3.563-0.17-5.424-0.17-74.812 0-135.67 60.84-135.67 135.712l0.188 10.952h-0.306l0.391 594.972-0.162 20.382c0 74.03 60.22 134.25 134.24 134.25 1.668 0 7.007-0.239 7.1-0.239l608.934 0.085c2.985 0.357 6.216 0.468 9.55 0.468 35.815 0 69.514-13.954 94.879-39.302 25.373-25.34 39.344-58.987 39.344-94.794l-0.145-12.015h0.918l-0.008-606.41z m-757.655 693.82l-2.585-0.203c-42.524 0-76.146-34.863-76.537-79.309V332.671H900.79l0.46 485.186-0.885 2.865c-0.535 1.837-0.8 3.58-0.8 5.17 0 40.382-31.555 73.766-71.852 76.002l-10.816 0.621v-0.527l-615.533-0.01zM900.78 274.424H122.3l-0.375-65.934 0.85-2.924c0.52-1.82 0.782-3.63 0.782-5.247 0-42.236 34.727-76.665 78.179-76.809l0.45-0.068 618.177 0.018 2.662 0.203c42.329 0 76.767 34.439 76.767 76.768 0 1.326 0.196 2.687 0.655 4.532l0.332 0.884v68.577z" fill=""></path><path d="M697.67 471.435c-7.882 0-15.314 3.078-20.918 8.682l-223.43 223.439L346.599 596.84c-5.544-5.603-12.95-8.69-20.842-8.69s-15.323 3.078-20.918 8.665c-5.578 5.518-8.674 12.9-8.7 20.79-0.017 7.908 3.07 15.357 8.69 20.994l127.55 127.558c5.57 5.56 13.01 8.622 20.943 8.622 7.925 0 15.364-3.06 20.934-8.63l244.247-244.247c5.578-5.511 8.674-12.883 8.7-20.783 0.017-7.942-3.079-15.408-8.682-20.986-5.552-5.612-12.958-8.698-20.85-8.698z" fill=""></path></g></svg>
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
            <li><a href="/usuarios" className="block px-4 py-2 text-sm navbar-href">Usuarios</a></li>
            <li><a href="/productos" className="block px-4 py-2 text-sm navbar-href">Pagos</a></li>
            <li><a href="#" className="block px-4 py-2 text-sm navbar-href">Órdenes</a></li>
            <li><a href="#" className="block px-4 py-2 text-sm navbar-href">Historial de pagos</a></li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Dashboard;