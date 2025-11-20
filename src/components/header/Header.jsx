import { Button } from "../ui/Button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { motion, AnimatePresence } from "framer-motion";

export const Header = ({ context }) => {
  const isButtonVisible = useIntersectionObserver("acquire-ticket");

  return (
    <header className="fixed py-12 w-full h-14 left-0 top-0 px-10 md:px-20 lg:px-40 flex justify-between items-center z-10 bg-gradient-to-b from-black/30 to-black/2">
      <div className="flex flex-col items-center justify-start">
        <i className="w-fit h-12 inline-block">
          <img
            className="size-full object-contain"
            src="/iconos/logo.svg"
            alt=""
          />
        </i>
      </div>
      <nav>
        <ul className="flex items-center gap-8 text-sm">
          <li className="font-prosperoExtralight text-primary/60 hover:text-primary transition-all ease-in">
            <a href="#Conferencistas">SPEAKERS</a>
          </li>
          <li className="font-prosperoExtralight text-primary/60 hover:text-primary transition-all ease-in">
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
    </header>
  );
};
