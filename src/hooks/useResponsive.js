import { useState, useEffect } from "react";

/**
 * Hook para detectar el tipo de dispositivo según el tamaño de pantalla
 * Breakpoints basados en Tailwind CSS:
 * - mobile: < 768px
 * - tablet: 768px - 1024px
 * - desktop: >= 1024px
 * 
 * @returns {Object} deviceType - Objeto con los estados del dispositivo
 * @returns {boolean} deviceType.isMobile - True si es mobile (< 768px)
 * @returns {boolean} deviceType.isTablet - True si es tablet (768px - 1024px)
 * @returns {boolean} deviceType.isDesktop - True si es desktop (>= 1024px)
 * @returns {number} deviceType.width - Ancho actual de la ventana
 * 
 * @example
 * const { isMobile, isTablet, isDesktop } = useResponsive();
 * 
 * const logo = isMobile ? "/iconos/logoM.svg" : "/iconos/logo.svg";
 * 
 * {isMobile && <MobileComponent />}
 * {isTablet && <TabletComponent />}
 * {isDesktop && <DesktopComponent />}
 * 
 * const buttonText = isMobile ? "Comprar" : "Adquiere tu entrada";
 */
export const useResponsive = () => {
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setDeviceType({
          isMobile: true,
          isTablet: false,
          isDesktop: false,
          width,
        });
      } else if (width >= 768 && width < 1024) {
        setDeviceType({
          isMobile: false,
          isTablet: true,
          isDesktop: false,
          width,
        });
      } else {
        setDeviceType({
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          width,
        });
      }
    };

    // Ejecutar al montar
    handleResize();

    // Escuchar cambios de tamaño
    window.addEventListener("resize", handleResize);

    // Limpiar el listener al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};
