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

      <div className="flex flex-col justify-around lg:flex-row size-full px-4 md:px-20 lg:px-40 lg:py-16 max-lg:pt-40">
        {/* Lado izquierdo - Información del artista */}
        <div className="lg:w-1/2 w-full lg:h-full h-1/3 flex flex-col lg:justify-center justify-start items-start">
          {!isDesktop ? (
            <div
              className={`text-right w-full flex flex-col justify-center items-center gap-4 ${
                width === "medium" ? "max-w-lg" : "max-w-full"
              }`}
            >
              <button
                onClick={() => setIsContentOpen(!isContentOpen)}
                className="w-full flex justify-between items-center cursor-pointer"
              >
                <h3 className="text-primary text-2xl font-prosperoSemiBold uppercase">
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
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedArtist.person}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <span className="text-primary/60 text-xl font-prosperoRegular">
                  {String(selectedArtist.index).padStart(2, "0")}
                </span>
                <h2
                  className="text-primary text-5xl md:text-6xl font-prosperoSemiBold uppercase w-fit border-b border-primary/20"
                  dangerouslySetInnerHTML={{ __html: selectedArtist.person }}
                ></h2>
                <p className="mt-2 text-primary/80 text-lg font-prosperoRegular uppercase tracking-wider">
                  {selectedArtist.category}
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Lado derecho - Título, descripción y tarjetas */}
        <div className="lg:w-1/2 w-full lg:h-full h-full flex flex-col lg:justify-center justify-start lg:gap-16 gap-40 lg:items-center items-start">
          {overlay && (
            <div className="absolute size-full top-0 left-0 -z-10 bg-black/30" />
          )}
          {isDesktop ? (
            <div
              className={`text-right w-full flex justify-center items-center gap-4 ${
                width === "medium" ? "max-w-lg" : "max-w-full"
              }`}
            >
              <h3 className="text-primary text-2xl font-prosperoSemiBold uppercase">
                {title}
              </h3>
              <span className="block w-[1px] h-full bg-primary" />
              <p
                className="text-primary/90 text-base text-start font-prosperoRegular leading-relaxed"
                dangerouslySetInnerHTML={{ __html: resume }}
              />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedArtist.person}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <span className="text-primary text-xl font-prosperoRegular">
                  {String(selectedArtist.index).padStart(2, "0")}
                </span>
                <h2
                  className="text-primary text-2xl md:text-6xl uppercase w-fit border-b border-primary/20"
                  dangerouslySetInnerHTML={{ __html: selectedArtist.person }}
                ></h2>
                <p className="mt-2 text-primary text-sm uppercase tracking-wider max-w-52">
                  {selectedArtist.category}
                </p>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Tarjetas de artistas */}
          <div
            className={`w-full flex ${
              artist.length > 3 ? "justify-between" : "justify-center"
            } items-center lg:gap-6 gap-2`}
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
                    className="cursor-pointer relative lg:w-72 w-auto lg:h-[24rem] h-62 rounded-lg overflow-hidden"
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={item.img}
                      alt={item.person}
                      className="w-full h-full object-cover object-[calc(31%)]"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p
                        className="text-primary text-sm font-prosperoSemiBold uppercase"
                        dangerouslySetInnerHTML={{ __html: item.person }}
                      />
                      <p className="text-primary/70 text-xs font-prosperoRegular uppercase mt-1 hidden lg:block">
                        {item.category}
                      </p>
                    </div>
                  </motion.div>
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
