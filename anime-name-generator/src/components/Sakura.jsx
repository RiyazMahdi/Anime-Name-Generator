import { useEffect } from 'react';
import '../components/Sakura.css';

const Sakura = () => {
  useEffect(() => {
    const createPetal = () => {
      const petal = document.createElement('div');
      petal.classList.add('sakura');

      petal.style.left = Math.random() * window.innerWidth + 'px';
      petal.style.animationDuration = `${Math.random() * 3 + 2}s`;
      petal.style.opacity = Math.random();
      petal.style.fontSize = `${Math.random() * 10 + 10}px`;

      document.body.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, 5000);
    };

    const interval = setInterval(createPetal, 300);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default Sakura;
