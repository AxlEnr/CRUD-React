
import { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';

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


  return (
    <main>
  <section className="video-section">
    
    <h1 className="logo-text">Eau D'Luxe</h1>

    <div className="video-container">
      <video
        src="/assets/videos/hombre.mp4"
        className="video"
        muted
        preload="auto"
        playsInline
      />
      <span className="hover-text">Hombre</span>
    </div>

    <div className="video-container">
      <video
        src="/assets/videos/mujer.mp4"
        className="video"
        muted
        preload="auto"
        playsInline
      />
      <span className="hover-text">Mujer</span>
    </div>

  </section>
</main>

  );
}

