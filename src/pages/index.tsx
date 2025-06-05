import Navbar from '../components/Navbar/Navbar';

export function Index() {
  return (
    <main>
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2">
          <div className="w-full h-full object-cover relative opacity-40 hover:opacity-100 transition-all">
              <img
                  src="/assets/imgs/menLS.webp"
                  alt="Hombre"
                  className="w-full h-full object-cover "
              />
              <h2 
              className="absolute inset-0 flex items-end justify-center text-white text-6xl font-bold mb-20 primaryFont">
                  Fragancias para hombre
              </h2>
          </div>
          <div className="w-full h-full object-cover opacity-40 hover:opacity-100 relative transition-all">
              <img
                  src="/assets/imgs/wmnLS.jpeg"
                  alt="Mujer"
                  className="w-full h-full object-cover "
              />
              <h2 
              className="absolute inset-0 flex items-end justify-center text-white text-6xl font-bold mb-20 primaryFont">
                  Fragancias para mujer
              </h2>

          </div>
              
          
        </div>        
      </div>

    </main>
  );
}
