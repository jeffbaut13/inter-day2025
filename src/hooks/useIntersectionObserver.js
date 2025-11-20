import { useEffect, useState } from "react";

/**
 * Hook para observar si un elemento está visible en el viewport
 * @param {string} targetId - ID del elemento a observar
 * @param {Object} options - Opciones del IntersectionObserver
 * @returns {boolean} - true si el elemento está visible, false si no
 */
export const useIntersectionObserver = (targetId, options = {}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById(targetId);
    
    if (!target) {
      console.warn(`Element with id "${targetId}" not found`);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options,
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetId, options]);

  return isVisible;
};
