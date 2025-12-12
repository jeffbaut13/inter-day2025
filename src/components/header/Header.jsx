import { Button } from "../ui/Button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useResponsive } from "@/hooks/useResponsive";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, TextAlignJustify, X } from "lucide-react";
import { useState } from "react";

// Variantes para el contenedor (stagger de los items)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Variantes para cada item (li)
const itemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,

    transition: {
      duration: 0.3,
    },
  },
};

export const Header = ({ context }) => {
  const isTitleVisible = useIntersectionObserver("90vh");
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [openNav, setopenNav] = useState(false);

  // Decidir qué logo usar según el dispositivo
  const logo = isMobile || isTablet ? "/iconos/logoM.svg" : "/iconos/logoN.svg";

  const handleClose = () => {
    context?.setOpenForm(true);
    setopenNav(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-18 bg-secundary z-50 px-4 md:px-20 sm:px-10">
      <div className="lg:grid lg:grid-cols-3 items-center h-full gap-4">
        {isDesktop && (
          <>
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <i className="h-6 w-auto inline-block">
                <img
                  className="size-full object-contain"
                  src="/iconos/prospero.svg"
                  alt=""
                />
              </i>
            </motion.div>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <i className="h-auto w-full max-w-72 inline-block">
                <img
                  className="size-full object-contain"
                  src="/iconos/logoNew.svg"
                  alt=""
                />
              </i>
            </motion.div>
            <nav className="flex justify-end">
              <ul className="text-primary flex items-center justify-end">
                <motion.li
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                  className="inline-block mx-4 cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => window.scrollToSection?.("Conferencistas")}
                >
                  Speakers
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                  className="inline-block mx-4 cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => window.scrollToSection?.("Artistas")}
                >
                  Artistas
                </motion.li>
                <AnimatePresence mode="wait">
                  {isTitleVisible && (
                    <motion.li
                      initial={{ width: 0, opacity: 0, scale: 0.8 }}
                      animate={{ width: "auto", opacity: 1, scale: 1 }}
                      exit={{ width: 0, opacity: 0, scale: 0.8 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.4, 0.0, 0.2, 1],
                      }}
                      className="overflow-hidden inline-block"
                    >
                      
                    </motion.li>
                  )}
                </AnimatePresence>
              </ul>
            </nav>
          </>
        )}
        {!isDesktop && (
          <AnimatePresence mode="wait">
            {!isTitleVisible ? (
              <motion.div
                key="logos"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                className="flex items-center justify-center gap-4 size-full px-12"
              >
                <i className="h-5 w-auto inline-block">
                  <img
                    className="size-full object-contain"
                    src="/iconos/prospero.svg"
                    alt=""
                  />
                </i>
                <i className="size-full inline-block">
                  <img
                    className="size-full object-contain"
                    src="/iconos/logoNew.svg"
                    alt=""
                  />
                </i>
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                className="w-full flex items-center justify-center gap-4 size-full [&_i]:flex-1 [&_i]:flex [&_i]:justify-center [&_i]:items-center"
              >
                <motion.figure
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                  className="w-2/4"
                >
                  <img className="size-3/5 object-contain" src={logo} alt="" />
                </motion.figure>
                <motion.i
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.15,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                >
                  <Button
                    id={"header-acquire-ticket"}
                    text="Entrada"
                    onClick={() => context?.setOpenForm(true)}
                  />
                </motion.i>
                <motion.i
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                >
                  <Menu onClick={() => setopenNav(true)} />
                </motion.i>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
      {!isDesktop && (
        <>
          <AnimatePresence>
            {openNav && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 size-full bg-black z-50"
              >
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 0.6, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="absolute right-10 top-8 z-10"
                  onClick={() => setopenNav(false)}
                >
                  <X />
                </motion.button>
                <nav className="size-full">
                  <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col justify-between size-full text-sm"
                  >
                    <motion.li
                      variants={itemVariants}
                      className="h-full font-prosperoExtralight text-primary/60 hover:text-primary transition-all ease-in flex justify-center items-center relative overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          window.scrollToSection?.("Conferencistas");
                          setopenNav(false);
                        }}
                        className="relative z-10 flex flex-col items-center justify-center gap-2 [&_span]:w-6 [&_span]:h-0.5 [&_span]:bg-primary/60 text-4xl"
                      >
                        <span />
                        Speakers
                        <span />
                      </button>
                    </motion.li>
                    <motion.li
                      variants={itemVariants}
                      className="h-full font-prosperoExtralight text-primary/60 hover:text-primary transition-all ease-in flex justify-center items-center relative overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          window.scrollToSection?.("Artistas");
                          setopenNav(false);
                        }}
                        className="relative z-10 flex flex-col items-center justify-center gap-2 [&_span]:w-6 [&_span]:h-0.5 [&_span]:bg-primary/60 text-4xl"
                      >
                        <span />
                        Artistas
                        <span />
                      </button>
                    </motion.li>
                     
                  </motion.ul>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </header>
  );
};
