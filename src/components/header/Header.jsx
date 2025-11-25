import { Button } from "../ui/Button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useResponsive } from "@/hooks/useResponsive";
import { motion, AnimatePresence } from "framer-motion";
import { TextAlignJustify, X } from "lucide-react";
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
  const isButtonVisible = useIntersectionObserver("acquire-ticket");
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [openNav, setopenNav] = useState(false);

  // Decidir qué logo usar según el dispositivo
  const logo = isMobile || isTablet ? "/iconos/logoM.svg" : "/iconos/logo.svg";

  const handleClose = () => {
    context?.setOpenForm(true);
    setopenNav(false);
  };

  return (
    <header className="fixed py-12 w-full h-14 left-0 top-0 px-10 md:px-20 lg:px-40 flex justify-between items-center z-10 bg-linear-to-b from-black/30 to-black/2">
      <div className="flex flex-col items-center justify-start">
        <i className="md:w-fit w-36 h-10 inline-block">
          <img
            className="size-full object-contain"
            src={logo}
            alt="Inter Day Logo"
          />
        </i>
      </div>
      {isDesktop && (
        <nav>
          <ul className="flex items-center gap-8 text-sm">
            <li className="text-primary hover:text-primary transition-all ease-in">
              <a href="#Conferencistas">SPEAKERS</a>
            </li>
            <li className="text-primary hover:text-primary transition-all ease-in">
              <a href="#Artistas">ARTISTAS</a>
            </li>
            <AnimatePresence>
              {!isButtonVisible && (
                <motion.div
                  initial={{ width: 0, opacity: 0, scale: 0.8 }}
                  animate={{ width: "auto", opacity: 1, scale: 1 }}
                  exit={{ width: 0, opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                  className="overflow-hidden"
                >
                  <Button
                    id={"header-acquire-ticket"}
                    text="ADQUIERE TU ENTRADA"
                    size={"small"}
                    color="white"
                    onClick={() => context?.setOpenForm(true)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </ul>
        </nav>
      )}
      {!isDesktop && (
        <>
          {!openNav && (
            <button className="opacity-60" onClick={() => setopenNav(true)}>
              <TextAlignJustify />
            </button>
          )}
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
                      <a
                        onClick={() => setopenNav(false)}
                        href="#Conferencistas"
                        className="relative z-10 flex flex-col items-center justify-center gap-2"
                      >
                        <span className="w-6 h-[2px] inline-block bg-primary/60" />
                        SPEAKERS
                        <span className="w-6 h-[2px] inline-block bg-primary/60" />
                      </a>
                      <motion.img
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="size-full inline-block absolute object-cover -z-10"
                        src="/imagenes/mobile/section-conferencistas.jpg"
                        alt="Speakers"
                      />
                    </motion.li>
                    <motion.li
                      variants={itemVariants}
                      className="h-full font-prosperoExtralight text-primary/60 hover:text-primary transition-all ease-in flex justify-center items-center relative overflow-hidden"
                    >
                      <a
                        onClick={() => setopenNav(false)}
                        href="#Conferencistas"
                        className="relative z-10 flex flex-col items-center justify-center gap-2"
                      >
                        <span className="w-6 h-[2px] inline-block bg-primary/60" />
                        SPEAKERS
                        <span className="w-6 h-[2px] inline-block bg-primary/60" />
                      </a>
                      <motion.img
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="size-full inline-block absolute object-cover -z-10"
                        src="/imagenes/mobile/section-artistas.jpg"
                        alt="Artistas"
                      />
                    </motion.li>
                    <motion.li
                      variants={itemVariants}
                      className="h-full font-prosperoExtralight text-primary/60 hover:text-primary transition-all ease-in flex justify-center items-center relative overflow-hidden"
                    >
                      <button
                        onClick={handleClose}
                        className="relative z-10 flex flex-col items-center justify-center gap-2"
                        id={"header-acquire-ticket-mobile"}
                      >
                        <span className="w-6 h-[2px] inline-block bg-primary/60" />
                        ADQUIERE TU ENTRADA
                        <span className="w-6 h-[2px] inline-block bg-primary/60" />
                      </button>
                      <motion.img
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="size-full inline-block absolute object-cover -z-10"
                        src="/imagenes/mobile/section-reservar.jpg"
                        alt="Reservar"
                      />
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
