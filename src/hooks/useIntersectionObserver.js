import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook para observar el scroll usando GSAP ScrollTrigger
 * @param {string} threshold - Umbral en vh para activar el estado
 * @returns {boolean} - true si pasamos el umbral, false si estamos antes
 */
export const useIntersectionObserver = (threshold = "40vh") => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Usar el evento de scroll para calcular manualmente el porcentaje
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Convertir el threshold de vh a pixels
      const thresholdValue = parseFloat(threshold);
      const thresholdPx = (viewportHeight * thresholdValue) / 100;
      
      if (scrollY >= thresholdPx) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Llamar una vez al inicio
    handleScroll();
    
    // Agregar listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isVisible;
};
