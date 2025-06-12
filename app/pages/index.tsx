import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Index() {
  
  useEffect(() => {
    const containers = document.querySelectorAll('.video-container');

    containers.forEach(container => {
      const video = container.querySelector('video');

      container.addEventListener('mouseenter', () => {
        if (video) video.play();
      });

      container.addEventListener('mouseleave', () => {
        if (video) video.pause();
      });
    });
  }, []);

  // ✅ Manejador para redireccionar
  const handleClick = () => {
    window.location.href = '/catalogo';
  };

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

        {/* Cada contenedor reacciona al click */}
        <div className="video-container" onClick={handleClick} style={{ cursor: 'pointer' }}>
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

        <div className="video-container" onClick={handleClick} style={{ cursor: 'pointer' }}>
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
