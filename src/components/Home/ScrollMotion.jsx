import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/Button";
import { CardArtist } from "../ui/CardArtist";

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
          y: "-100vh",
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
      <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
        {/* Main - fijo detrás del scroller */}
        <Main ref={mainRef} />

        {/* Scroller - inicialmente fuera de pantalla, entra desde abajo */}
        <div
          ref={scrollerRef}
          className="fixed top-0 left-0 w-full z-30 will-change-transform"
          style={{ height: "200vh" }}
        >
          <div className="scroller-content will-change-transform">
            <Speakers
              ref={speakersRef}
              title="Speakers <br /> confirmados"
              description="En Inter Day te esperan voces que inspiran, <br /> motivan y nos recuerdan por qué vale <br /> la pena seguir entregando."
              items={conferencistas}
              selectedIndex={selectedSpeaker}
              setSelectedIndex={setSelectedSpeaker}
            />
            <Speakers
              ref={artistasRef}
              artist={true}
              title="Artistas"
              description="Cuatro grandes de la música nacional nos acompañan <br /> para cerrar a lo grande este evento"
              items={artistas}
              selectedIndex={selectedArtist}
              setSelectedIndex={setSelectedArtist}
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
}) => {
  const sliderRef = useRef(null);
  const [clickStartTime, setClickStartTime] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const handleMouseDown = (e) => {
    setClickStartTime(Date.now());
    setHasMoved(false);
  };

  const handleTouchStart = (e) => {
    setClickStartTime(Date.now());
    setHasMoved(false);
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
              <div className="flex lg:gap-8 gap-2 flex-col lg:flex-row h-min lg:items-center max-lg:px-8">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: title.replace(/<br\s*\/?>/gi, " "),
                  }}
                  className="lg:text-6xl text-2xl lg:font-prosperoExtralight -tracking-wider"
                />
                <span className="w-px h-20 bg-primary hidden lg:block" />
                <p
                  dangerouslySetInnerHTML={{
                    __html: description.replace(/<br\s*\/?>/gi, " "),
                  }}
                  className="lg:text-xl lg:max-w-3xl font-prosperoExtralight"
                />
              </div>

              {/* Galería de miniaturas - Desktop normal, Mobile slider */}
              <div className="w-full px-4 overflow-hidden">
                <div
                  ref={sliderRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  className="flex gap-6 justify-start lg:justify-center pb-4 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none lg:cursor-default select-none touch-pan-x"
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

const Main = ({ ref }) => {
  return (
    <>
      <main
        ref={ref}
        className="fixed top-0 left-0 w-full h-dvh bg-secundary px-3 z-10 flex items-center justify-center"
        style={{ paddingTop: "4.5rem", paddingBottom: "0.75rem" }}
      >
        <div className="size-full bg-secundary rounded-md overflow-hidden relative">
          <video
            className="size-full object-cover scale-125 z-1"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/videobackNew.mp4" type="video/mp4" />
          </video>
          <div className="size-full absolute top-0 left-0 flex z-10 flex-col justify-center items-center text-center lg:px-10 bg-black/60 text-primary">
            <h1 className="lg:text-6xl lg:leading-14 text-3xl tracking-tighter font-prosperoExtralight mb-20">
              Los talentos que nos mueven <br /> y las ideas que nos inspiran{" "}
              <br />
              reunidos en esta entrega.
            </h1>
            <h2 className="mb-8 lg:text-xl">
              {" "}
              13 de Diciembre / Coliseo Álvaro Meza Amaya,{" "}
              <br className="block lg:hidden" /> Villavicencio, Meta.
            </h2>

            <Button
              id={"acquire-ticket"}
              text="Adquiere tu entrada"
              size={"small"}
              color="white"
            />
            <span className="absolute text-sm text-primary/60 bottom-18 -right-8 -rotate-90">PULEP: TQK951</span>
          </div>
        </div>
      </main>
    </>
  );
};
