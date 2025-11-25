import { motion } from "framer-motion";

export const ImgBackground = ({
  img,
  overlay = true,
  sizeWidth = false,
  sizeHeight = false,
  zIndex = -10,
  medidas = { top: 0, left: 0, right: 0, bottom: 0 },
  events = "none",
  children,
  customStyle = "",
  isSelected = false,
  isRemoving = false,
  shouldGrow = false,
  isLastCard = false,
  showLastCard = true,
}) => {
  return (
    <>
      <motion.div
        animate={{
          width: sizeWidth ? "100%" : 320,
          height: sizeHeight ? "100%" : 420,
          top: medidas.top,
          left: medidas.left,
          right: medidas.right,
          bottom: medidas.bottom,
          opacity: (isLastCard && !showLastCard) ? 0 : 1,
        }}
        transition={{
          width: { duration: isLastCard ? 0.15 : 0.5, ease: "easeInOut" },
          height: { duration: isLastCard ? 0.15 : 0.5, ease: "easeInOut" },
          left: { duration: isLastCard ? 0.15 : 0.5, ease: "easeInOut" },
          top: { duration: isLastCard ? 0.15 : 0.5, ease: "easeInOut" },
          right: { duration: isLastCard ? 0.15 : 0.5, ease: "easeInOut" },
          bottom: { duration: isLastCard ? 0.15 : 0.5, ease: "easeInOut" },
          opacity: { duration: isLastCard ? 0.2 : 0.3, ease: "easeInOut" },
        }}
        style={{
          backgroundImage: `url(${img})`,
          width: 320,
          height: 420,
          zIndex: zIndex,
          pointerEvents: events ? "auto" : "none",
          position: "absolute",
          visibility: (isLastCard && !showLastCard) ? "hidden" : "visible",
        }}
        className={`${customStyle ? customStyle : ""} ${
          events ? "cursor-pointer" : ""
        } bg-center bg-cover bg-no-repeat`}
      >
        {children}
      </motion.div>
      {overlay && (
        <div className="pointer-events-none size-full absolute top-0 left-0 -z-10 bg-black/20" />
      )}
    </>
  );
};
