import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImgBackground } from "./ImgBackground";
import { useResponsive } from "@/hooks/useResponsive";
import { ChevronDown } from "lucide-react";

export const CardArtist = ({
  artist,
  title,
  resume,
  overlay = false,
  width = "full",
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const selectedArtist = artist[selectedIndex];
  const { isDesktop } = useResponsive();

  return (
    <section
      id={title}
      className="snap-start snap-always w-full h-dvh overflow-hidden relative"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedArtist.img}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 -z-10"
        >
          <ImgBackground
            overlay={false}
            img={isDesktop ? selectedArtist.img : selectedArtist.imgM}
          />
        </motion.div>
      </AnimatePresence>
      {isDesktop ? (
        <div className="flex flex-col justify-around lg:flex-row size-full px-4 md:px-20 lg:px-40 lg:py-16 max-lg:pt-46">
          {/* Lado izquierdo - Información del artista */}
          <div className="lg:w-1/2 w-full lg:h-full h-1/3 flex flex-col lg:justify-center justify-start items-start">
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
          <div className="lg:w-1/2 w-full lg:h-full h-full flex flex-col lg:justify-center justify-start lg:gap-16 gap-40 lg:items-center items-start">
            {overlay && (
              <div className="absolute size-full top-0 left-0 -z-10 bg-black/30" />
            )}

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
            <TarjetasArtistas
              artist={artist}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              isDesktop={isDesktop}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-evenly size-full px-4 md:px-20 lg:px-40 lg:py-16 py-8 gap-12">
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

          <TarjetasArtistas
            artist={artist}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            isDesktop={isDesktop}
          />
        </div>
      )}
    </section>
  );
};

const TarjetasArtistas = ({
  artist,
  selectedIndex,
  setSelectedIndex,
  isDesktop,
}) => {
  return (
    <div
      className={`w-full flex ${
        artist.length > 3 ? "justify-between" : "justify-center"
      } items-center lg:gap-6 gap-4`}
    >
      {artist.map(
        (item, index) =>
          selectedIndex !== index && (
            <motion.div
              key={item.index}
              onClick={() => setSelectedIndex(index)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isDesktop ? 0.4 : 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer relative lg:w-72 w-36 lg:h-96 h-56 rounded-lg overflow-hidden shadow-[4px_4px_5px_2px_rgba(0,0,0,0.25)] shadow-secundary/60"
              whileHover={{ opacity: 1, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={item.img}
                alt={item.person}
                className="w-full h-full object-cover object-[calc(31%)]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                <p
                  className="text-primary text-sm font-prosperoBold uppercase"
                  dangerouslySetInnerHTML={{ __html: item.person }}
                />
              </div>
            </motion.div>
          )
      )}
    </div>
  );
};

