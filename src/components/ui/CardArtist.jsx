import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImgBackground } from "./ImgBackground";

export const CardArtist = ({
  artist,
  title,
  resume,
  overlay = false,
  width = "full",
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedArtist = artist[selectedIndex];

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
          <ImgBackground overlay={false} img={selectedArtist.img} />
        </motion.div>
      </AnimatePresence>

      <div className="flex size-full px-4 md:px-20 lg:px-40 py-16">
        {/* Lado izquierdo - Información del artista */}
        <div className="w-1/2 h-full flex flex-col justify-center items-start">
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
        </div>

        {/* Lado derecho - Título, descripción y tarjetas */}
        <div className="w-1/2 h-full flex flex-col justify-center gap-16 items-center">
          {overlay && (
            <div className="absolute size-full top-0 left-0 -z-10 bg-black/30" />
          )}

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

          {/* Tarjetas de artistas */}
          <div
            className={`w-full flex ${
              artist.length > 3 ? "justify-between" : "justify-center"
            } items-center gap-6`}
          >
            {artist.map(
              (item, index) =>
                selectedIndex !== index && (
                  <motion.div
                    key={item.index}
                    onClick={() => setSelectedIndex(index)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="cursor-pointer relative w-72 h-[24rem] rounded-lg overflow-hidden"
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
                      <p className="text-primary/70 text-xs font-prosperoRegular uppercase mt-1">
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
