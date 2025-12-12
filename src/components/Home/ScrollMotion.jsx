import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PartyPopper } from "lucide-react";
import { Button } from "../ui/Button";
import { CardArtist } from "../ui/CardArtist";
import { useResponsive } from "@/hooks/useResponsive";

gsap.registerPlugin(ScrollTrigger);

export const ScrollMotion = ({ conferencistas, artistas }) => {
  const scrollerRef = useRef(null);
  const mainRef = useRef(null);
  const footerRef = useRef(null);
  const containerRef = useRef(null);
  const speakersRef = useRef(null);
  const artistasRef = useRef(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const { isDesktop } = useResponsive();

  const scrollToSection = (sectionId) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerTop = container.offsetTop;
    const totalHeight = container.offsetHeight; // 400vh

    // Determinar qué sección es según el ID
    let targetScroll;
    if (sectionId === "Conferencistas") {
      // Speakers está en la primera sección del scroller
      // El scroller aparece completamente al 50% del scroll (200vh de 400vh)
      targetScroll = containerTop + totalHeight * 0.375;
    } else if (sectionId === "Artistas") {
      // Artistas es la segunda sección, necesita más scroll
      // Al 75% del contenedor para mostrar la segunda sección
      targetScroll = containerTop + totalHeight * 0.75;
    }

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  // Exponer la función globalmente para que el Header pueda usarla
  useEffect(() => {
    window.scrollToSection = scrollToSection;
    return () => {
      delete window.scrollToSection;
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const main = mainRef.current;
    const container = containerRef.current;

    if (!scroller || !main || !container) return;

    // Inicialmente el scroller está fuera de la pantalla (abajo)
    gsap.set(scroller, { y: "100vh" });

    // Timeline principal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        id: "main-scroll",
      },
    });

    // Fase 1: Scroller entra desde abajo (0-50%)
    tl.to(
      scroller,
      {
        y: "0vh",
        ease: "none",
      },
      0
    )
      // Fase 2: Main y scroller suben juntos (50-100%)
      .to(
        [main, scroller],
        {
          y: "-200vh",
          ease: "none",
        },
        0.5
      );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Espaciador para header */}
      <div className="h-18" />

      {/* Contenedor que genera el scroll */}
      <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
        {/* Main - fijo detrás del scroller */}
        <Main ref={mainRef} isDesktop={isDesktop} />

        {/* Scroller - inicialmente fuera de pantalla, entra desde abajo */}
        <div
          ref={scrollerRef}
          className="fixed top-0 left-0 w-full z-30 will-change-transform"
          style={{ height: "400vh" }}
        >
          <div className="scroller-content will-change-transform">
            <div className="h-dvh w-full bg-black flex flex-col justify-center items-center">
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ scale: 0, y: -50, rotate: -180 }}
                  animate={{ scale: 1, y: 0, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <PartyPopper className="w-20 h-20 text-primary" strokeWidth={1.2} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="lg:text-7xl text-5xl font-prosperoBold text-primary tracking-tight">
                    Llenamos aforo
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="lg:text-2xl text-lg font-prosperoExtralight text-primary/80">
                    Gracias por creer en el InterDay 2025
                  </p>
                </motion.div>
              </div>
            </div>
            <Speakers
              ref={speakersRef}
              isDesktop={isDesktop}
              title="Speakers <br /> confirmados"
              description="En Inter Day te esperan voces que inspiran, <br /> motivan y nos recuerdan por qué vale <br /> la pena seguir entregando."
              items={conferencistas}
              selectedIndex={selectedSpeaker}
              setSelectedIndex={setSelectedSpeaker}
            />
            <Speakers
              ref={artistasRef}
              isDesktop={isDesktop}
              artist={true}
              title="Artistas"
              description="Cuatro grandes de la música nacional nos acompañan <br /> para cerrar a lo grande este evento"
              items={artistas}
              selectedIndex={selectedArtist}
              setSelectedIndex={setSelectedArtist}
              overlay={true}
              legal={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Speakers = ({
  ref,
  artist,
  title,
  description,
  items,
  selectedIndex,
  setSelectedIndex,
  isDesktop,
  overlay = false,
  legal = false,
}) => {
  const sliderRef = useRef(null);
  const [clickStartTime, setClickStartTime] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isHorizontalScrollRef = useRef(false);

  const handleMouseDown = (e) => {
    setClickStartTime(Date.now());
    setHasMoved(false);
  };

  const handleTouchStart = (e) => {
    setClickStartTime(Date.now());
    setHasMoved(false);
    isHorizontalScrollRef.current = false;

    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleMouseMove = (e) => {
    if (clickStartTime > 0) {
      setHasMoved(true);
    }
  };

  const handleTouchMove = (e) => {
    if (clickStartTime > 0) {
      setHasMoved(true);
    }

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

    // Determinar la dirección del scroll en el primer movimiento
    if (!isHorizontalScrollRef.current && (deltaX > 5 || deltaY > 5)) {
      isHorizontalScrollRef.current = deltaX > deltaY;
    }

    // Si está scrolleando horizontalmente, prevenir el scroll vertical de la página
    if (isHorizontalScrollRef.current && deltaX > deltaY) {
      e.preventDefault();
    }
  };

  const handleClick = (index, e) => {
    const clickDuration = Date.now() - clickStartTime;
    // Solo abrir si fue un click instantáneo (menos de 200ms) y no hubo movimiento
    if (clickDuration < 200 && !hasMoved) {
      setSelectedIndex(index);
    }
  };

  return (
    <section
      ref={ref}
      id={artist ? "Artistas" : "Conferencistas"}
      className="h-screen bg-secundary flex items-center justify-center shrink-0 px-3 py-3 relative section-content"
    >
      <div className="size-full rounded-md flex items-center justify-center relative overflow-hidden">
        <div
          className={`absolute size-full top-0 left-0 z-1 ${
            artist
              ? "bg-gradient-radial-artists"
              : "bg-gradient-radial-speakers"
          }`}
        />
        <div className="size-full z-10 flex flex-col justify-center items-center gap-12">
          {selectedIndex === null ? (
            <>
              <div className="flex lg:gap-8 gap-2 flex-col lg:flex-row h-min lg:items-center max-lg:px-8 text-center">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: !isDesktop
                      ? title.replace(/<br\s*\/?>/gi, " ")
                      : title,
                  }}
                  className="lg:text-6xl text-xl lg:font-prosperoExtralight -tracking-wider"
                />
                <span className="w-px h-20 bg-primary hidden lg:block" />
                <p
                  dangerouslySetInnerHTML={{
                    __html: !isDesktop
                      ? description.replace(/<br\s*\/?>/gi, " ")
                      : description,
                  }}
                  className="lg:text-xl lg:max-w-3xl font-prosperoExtralight"
                />
              </div>

              {/* Galería de miniaturas - Desktop normal, Mobile slider */}
              <div className="w-full px-4  ">
                <div
                  ref={sliderRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  className="flex gap-6 justify-start lg:justify-center pb-4 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none lg:cursor-default select-none"
                  style={{
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {items?.map((item, index) => (
                    <div
                      key={index}
                      onClick={(e) => handleClick(index, e)}
                      className="relative w-90 h-120 rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/50 cursor-pointer group transition-all lg:hover:scale-105 shrink-0 snap-center"
                    >
                      <img
                        src={item.img}
                        alt={item.person.replace(/<br\s*\/?>/gi, " ")}
                        className="size-full object-cover object-[30%_30%] pointer-events-none"
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex justify-center items-end pb-4 pointer-events-none">
                        <h3 className="text-primary text-xl">
                          {item.person.replace(/<br\s*\/?>/gi, " ")}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
                {legal && (
                  <p className="text-primary/30 w-full text-justify lg:text-center text-xs lg:text-[0.8rem] mt-10">
                    Condiciones de acceso al evento: No hay venta de boletería
                    para este evento. El acceso es exclusivamente con el código
                    QR generado a través de este registroAforo limitado. El
                    ingreso y la ubicación dentro del recinto se realizarán por
                    orden de <br className="hidden lg:block" />
                    llegada. No se permite el ingreso de alimentos ni bebidas.
                    No se permite el ingreso de sustancias psicoactivas,
                    cigarrillos ni armas de ningún tipo. No se permite el
                    ingreso de menores de 18 años ni de mujeres embarazadas.
                  </p>
                )}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="size-full"
            >
              <CardArtist
                overlay={overlay ? true : false}
                artist={items}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                onClose={() => setSelectedIndex(null)}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

const Main = ({ ref, isDesktop }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
    }
  }, []);

  return (
    <>
      <main
        ref={ref}
        className="fixed top-0 left-0 w-full h-dvh bg-secundary px-3 z-10 flex items-center justify-center"
        style={{ paddingTop: "4.5rem", paddingBottom: "0.75rem" }}
      >
        <div className="size-full bg-secundary rounded-md overflow-hidden relative">
          <video
            ref={videoRef}
            defaultMuted={true}
            muted={true}
            className="size-full object-cover scale-125 z-1"
            autoPlay
            loop
            playsInline
            preload="auto"
            poster="/imagenes/poster.jpg"
          >
            <source src="/videos/videobackNewBack.mp4" />
          </video>
          <div className="size-full absolute top-0 left-0 flex z-10 flex-col justify-center items-center text-center lg:px-10 bg-black/60 text-primary">
            <h1 className="lg:text-5xl lg:leading-14 text-2xl tracking-tighter lg:font-prosperoExtralight font-prosperoBold mb-20">
              Los talentos que nos mueven <br /> y las ideas que nos inspiran{" "}
              <br />
              reunidos en esta entrega.
            </h1>
            <div className="mb-8 lg:text-xl">
              {" "}
              {isDesktop ? (
                <>
                  <p>
                    13 de diciembre / Coliseo Álvaro Meza Amaya,{" "}
                    <br className="block lg:hidden" /> Villavicencio, Meta.
                  </p>
                  <p>
                    <span className="font-prosperoBold text-lg">
                      Inicio del evento:{" "}
                    </span>
                    4:00 p.m. Cierre de puertas: 7:00 p.m.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-prosperoBold text-2xl mb-4">
                    13 · dic · 25
                  </p>
                  <p className="text-lg">Coliseo Álvaro Meza Amaya</p>
                  <p className="text-lg">Villavicencio, Meta.</p>
                  <p className="text-lg mt-4">
                    Inicio del evento 4:00 p.m. <br />
                    Cierre de puertas: 7:00 p.m.
                  </p>
                </>
              )}
            </div>

            <span className="absolute text-sm text-primary/60 bottom-18 -right-8 -rotate-90">
              PULEP: TQK951
            </span>
          </div>
        </div>
      </main>
    </>
  );
};
