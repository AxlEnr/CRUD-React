import Navbar from 'app/components/Navbar/Navbar';
import { useEffect } from 'react';


export function Index() {
  useEffect(() => {
    const containers = document.querySelectorAll('.video-container');

    containers.forEach(container => {
      const video = container.querySelector('video');

      container.addEventListener('mouseenter', () => {
        if (video) {
          video.play();
        }
      });

      container.addEventListener('mouseleave', () => {
        if (video) {
          video.pause();
          
        }
      });
    });
  }, []);

  /*
  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.profesores)) {
          throw new Error('La respuesta no contiene un array de profesores');
        }

        setProfesores(data.profesores);
      } catch (err: any) {
        console.error('Error al obtener los profesores:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProfesores();
  }, []);


    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    
  */
return (
    <main>
      <section className="video-section">
        <div className="logo-image">
          <img 
            src="/assets/imgs/maeka.png" 
            className="background-image" 
            alt="logo"
        />
        
        
        </div>

        <div className="video-container">
          <img 
            src="/assets/imgs/Dior.jpg" 
            className="background-image" 
            alt="Hombre"
          />
          <video
            src="/assets/videos/hombre.mp4"
            className="video"
            muted
            preload="auto"
            playsInline
            loop
          />
        
        </div>

        <div className="video-container">
          <img 
            src="/assets/imgs/gdior.webp" 
            className="background-image" 
            alt="Mujer"
          />
          <video
            src="/assets/videos/mujer.mp4"
            className="video"
            muted
            preload="auto"
            playsInline
            loop
          />
          
        </div>
      </section>
    </main>
  );
}