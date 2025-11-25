import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImgBackground } from "./ImgBackground";
import { useResponsive } from "@/hooks/useResponsive";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ImgBack } from "./ImgBack";

export const CardArtist = ({
  artist,
  title,
  resume,
  overlay = false,
  width = "full",
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [artistList, setArtistList] = useState(artist);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shiftPosition, setShiftPosition] = useState(0);
  const [showLastCard, setShowLastCard] = useState(true);
  const selectedArtist = artistList[selectedIndex];
  const { isDesktop } = useResponsive();
  const autoplayRef = useRef(null);

  // Navegar hacia adelante
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Cambiar inmediatamente al siguiente artista para mostrar sus datos
    setSelectedIndex(1);

    // Ocultar la última card inmediatamente
    setShowLastCard(false);

    // Incrementar el shift para mover todo a la izquierda
    setShiftPosition((prev) => prev + 1);

    // Después de 300ms: reorganizar el array y resetear shift (solo para el carrusel)
    setTimeout(() => {
      setArtistList((prevList) => {
        const newList = [...prevList];
        const firstItem = newList.shift();
        newList.push(firstItem);
        return newList;
      });

      setShiftPosition(0);
      setSelectedIndex(0);
      setIsAnimating(false);

      // Mostrar la última card después de que esté en su posición
      setTimeout(() => {
        setShowLastCard(true);
      }, 150);
    }, 300);
  };

  // Navegar hacia atrás
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Reorganizar array: mover el último al principio
    setArtistList((prevList) => {
      const newList = [...prevList];
      const lastItem = newList.pop();
      newList.unshift(lastItem);
      return newList;
    });

    setSelectedIndex(0);
    setIsAnimating(false);
  };

  const handleArtistClick = (index) => {
    handleNext();
  };

  // Autoplay cada 5 segundos
  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, 7000);
    };

    startAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [artistList, isAnimating]);

  // Reiniciar autoplay cuando el usuario interactúa
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 7000);
  };

  return (
    <section
      id={title}
      className="snap-start snap-always w-full h-dvh overflow-hidden relative"
    >
      {isDesktop ? (
        <AnimatePresence mode="wait">
          <div className="absolute inset-0 size-full z-1">
            <AnimatePresence initial={false}>
              {artistList.map((item, index) => {
                // Calcular posición visual con el shift
                const visualIndex = index - shiftPosition;
                const isSelected = visualIndex === 0;
                const isHidden = visualIndex < 0;
                const currentPositionIndex = visualIndex - 1;

                // Ocultar elementos que se salieron por la izquierda
                if (isHidden) return null;

                // Determinar si es la última tarjeta visible (la que está en la última posición visual)
                const isLastVisibleCard =
                  visualIndex === artistList.length - 1 - shiftPosition;

                return (
                  <ImgBackground
                    key={`${item.index}-stable`}
                    overlay={false}
                    img={isDesktop ? item.img : item.imgM}
                    customStyle={
                      !isSelected &&
                      "rounded-2xl opacity-60 hover:opacity-100 transition-opacity duration-300 overflow-hidden"
                    }
                    zIndex={visualIndex + 1}
                    isSelected={isSelected}
                    sizeWidth={isSelected}
                    sizeHeight={isSelected}
                    shouldGrow={isSelected && shiftPosition > 0}
                    isLastCard={isLastVisibleCard}
                    showLastCard={showLastCard}
                    medidas={{
                      top: isSelected ? 0 : "calc(50% - 140px)",
                      left: isSelected
                        ? 0
                        : `calc(55% + ${currentPositionIndex * (320 + 20)}px)`,
                      right: isSelected ? 0 : "auto",
                      bottom: "auto",
                    }}
                  >
                    {!isSelected && <InsideCard selectedArtist={item} />}
                  </ImgBackground>
                );
              })}
            </AnimatePresence>
          </div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedArtist.img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 -z-10"
          >
            <ImgBack
              overlay={false}
              img={isDesktop ? selectedArtist.img : selectedArtist.imgM}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {isDesktop ? (
        <div className="relative pointer-events-none z-2 flex flex-col justify-around lg:flex-row size-full px-4 md:px-20 lg:px-40 lg:py-16 max-lg:pt-46">
          {/* Lado izquierdo - Información del artista */}
          <div className="lg:w-1/2 w-full lg:h-full h-1/3 flex flex-col lg:justify-center justify-start items-start relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedArtist.person}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.05,
                    },
                  },
                  exit: {
                    transition: {
                      staggerChildren: 0.05,
                      staggerDirection: -1,
                    },
                  },
                }}
                className="flex flex-col"
              >
                <div className="overflow-hidden">
                  <motion.span
                    variants={{
                      hidden: { y: "100%" },
                      visible: {
                        y: 0,
                        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
                      },
                      exit: {
                        y: "-100%",
                        transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
                      },
                    }}
                    className="text-primary/60 text-xl font-prosperoRegular block"
                  >
                    {String(selectedArtist.index).padStart(2, "0")}
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.h2
                    variants={{
                      hidden: { y: "100%" },
                      visible: {
                        y: 0,
                        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
                      },
                      exit: {
                        y: "-100%",
                        transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
                      },
                    }}
                    className="text-primary text-5xl md:text-6xl font-prosperoBold uppercase w-fit border-b border-primary/20 block"
                    dangerouslySetInnerHTML={{ __html: selectedArtist.person }}
                  ></motion.h2>
                </div>
                <div className="overflow-hidden mt-2">
                  <motion.p
                    variants={{
                      hidden: { y: "100%" },
                      visible: {
                        y: 0,
                        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
                      },
                      exit: {
                        y: "-100%",
                        transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
                      },
                    }}
                    className="text-primary/80 text-lg font-prosperoRegular uppercase tracking-wider block"
                  >
                    {selectedArtist.category}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Lado derecho - Título, descripción y tarjetas */}
          {overlay && (
            <div className="absolute size-full top-0 left-0 -z-10 bg-black/30" />
          )}
          <div className="relative lg:w-1/2 w-full lg:h-full h-full flex flex-col lg:justify-center justify-start lg:gap-16 gap-40 lg:items-center items-start">
            <div
              className={`text-right w-full flex justify-center items-center gap-4 ${
                width === "medium" ? "max-w-lg" : "max-w-full"
              }`}
            >
              <h3 className="text-primary text-2xl font-prosperoBold uppercase">
                {title}
              </h3>
              <span className="block w-px h-full bg-primary" />
              <p
                className="text-primary/90 text-base text-start font-prosperoRegular leading-relaxed"
                dangerouslySetInnerHTML={{ __html: resume }}
              />
            </div>

            {/* Tarjetas de artistas */}
            <div className="h-96 " />

            {/* Botones de navegación */}
            <div className="absolute bottom-4 left-24 flex gap-14 pointer-events-auto z-10">
              <button
                onClick={() => {
                  handlePrev();
                  resetAutoplay();
                }}
                className="cursor-pointer w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center text-primary transition-all duration-300 backdrop-blur-sm"
                disabled={isAnimating}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => {
                  handleNext();
                  resetAutoplay();
                }}
                className="cursor-pointer w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center text-primary transition-all duration-300 backdrop-blur-sm"
                disabled={isAnimating}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col justify-evenly gap-16 size-full px-4 md:px-20 lg:px-40 lg:py-16 pt-20">
          <div
            className={`text-right w-full flex flex-col justify-center items-center gap-4 ${
              width === "medium" ? "max-w-lg" : "max-w-full"
            }`}
          >
            <button
              onClick={() => setIsContentOpen(!isContentOpen)}
              className="w-full flex justify-between items-center cursor-pointer"
            >
              <h3 className="text-primary text-2xl font-prosperoBold uppercase">
                {title}
              </h3>
              <motion.div
                animate={{ rotate: isContentOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown />
              </motion.div>
            </button>

            {/* contenido */}
            <AnimatePresence>
              {isContentOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
                  className="overflow-hidden w-full"
                >
                  <motion.p
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    exit={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full text-primary/90 text-base text-start font-prosperoRegular leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: resume }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedArtist.person}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.05,
                  },
                },
                exit: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
              className="flex flex-col"
            >
              <div className="overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { y: "100%" },
                    visible: {
                      y: 0,
                      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
                    },
                    exit: {
                      y: "-100%",
                      transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
                    },
                  }}
                  className="text-primary text-xl font-prosperoRegular block"
                >
                  {String(selectedArtist.index).padStart(2, "0")}
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  variants={{
                    hidden: { y: "100%" },
                    visible: {
                      y: 0,
                      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
                    },
                    exit: {
                      y: "-100%",
                      transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
                    },
                  }}
                  className="text-primary text-2xl md:text-6xl font-prosperoBold uppercase w-fit border-b border-primary/20 block"
                  dangerouslySetInnerHTML={{ __html: selectedArtist.person }}
                ></motion.h2>
              </div>
              <div className="overflow-hidden mt-2">
                <motion.p
                  variants={{
                    hidden: { y: "100%" },
                    visible: {
                      y: 0,
                      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
                    },
                    exit: {
                      y: "-100%",
                      transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
                    },
                  }}
                  className="text-primary text-sm uppercase tracking-wider max-w-52 block"
                >
                  {selectedArtist.category}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider de tarjetas */}
          <div className="relative w-full overflow-hidden">
            <div className="flex items-center mb-4">
              {artistList.map((item, index) => {
                // Ocultar la primera tarjeta (la activa)
                if (index === 0) return null;

                const cardWidth = (window.innerWidth - 64) / 2.2; // Tarjetas más grandes
                const offset = (index - 1) * 20;

                return (
                  <motion.div
                    key={`${item.index}-mobile`}
                    initial={{ x: offset }}
                    animate={{ x: offset }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="shrink-0 relative rounded-lg overflow-hidden cursor-pointer"
                    style={{ width: `${cardWidth}px`, height: "220px" }}
                  >
                    <img
                      src={item.imgM || item.img}
                      alt={item.person}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-3">
                      <p
                        className="text-primary text-sm font-prosperoBold uppercase line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item.person }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {/* Botones de navegación mobile */}
            <div className="flex justify-center gap-8">
              <button
                onClick={() => {
                  handlePrev();
                  resetAutoplay();
                }}
                className="w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center text-primary transition-all duration-300 backdrop-blur-sm"
                disabled={isAnimating}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => {
                  handleNext();
                  resetAutoplay();
                }}
                className="w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center text-primary transition-all duration-300 backdrop-blur-sm"
                disabled={isAnimating}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const InsideCard = ({ selectedArtist }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black from-10% to-transparent p-4 h-1/3 flex items-end">
      <p
        className="text-primary text-sm font-prosperoBold uppercase line-clamp-2"
        dangerouslySetInnerHTML={{ __html: selectedArtist.person }}
      />
    </div>
  );
};
