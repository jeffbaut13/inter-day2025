import { useResponsive } from "@/hooks/useResponsive";
import { Link } from "react-router";

export const Footer = () => {
  const { isDesktop } = useResponsive();
  const LinkSocial = () => {
    const socialArray = [
      "https:linkedin.com/company/inter-rapidísimo/",
      "https://www.facebook.com/interrapidisimo",
      "https://www.instagram.com/interrapidisimo_co",
    ];
    return (
      <>
        {socialArray.map((item, index) => (
          <Link to={item} key={index} target="_blank" rel="noopener noreferrer">
            {ImgAliados({
              imgArray: [`/iconos/iconos-sociales/Recurso-${index + 1}.svg`],
              size: isDesktop ? "small" : "",
            })}
          </Link>
        ))}
      </>
    );
  };

  return (
    <footer className="snap-start snap-always w-full h-dvh flex flex-col justify-end items-start gap-0 lg:gap-10 px-6 md:px-20 lg:px-40 lg:pb-14 pb-4">
      <div className=" flex w-full flex-col lg:flex-row max-lg:items-start">
        <div className="max-lg:mb-8 w-full flex flex-col lg:flex-row justify-start items-start gap-0 lg:gap-14 md:items-center">
          <h6 className="text-gradient w-fit">Presenta:</h6>
          <div className="w-full flex lg:justify-center justify-start items-center">
            {ImgAliados({
              imgArray: Array.from(
                { length: 1 },
                (_, i) => `/iconos/presenta/Recurso-${i + 1}.svg`
              ),
              size: isDesktop ? "medium" : "small",
            })}
          </div>
        </div>
        <div className="max-lg:mb-8 w-full flex flex-col lg:flex-row justify-start items-start gap-0 lg:gap-14 md:items-center">
          <h6 className="text-gradient w-fit">Aliados:</h6>
          <div className="flex-1 max-lg:w-full flex justify-between items-center">
            {ImgAliados({
              imgArray: Array.from(
                { length: 3 },
                (_, i) => `/iconos/aliados/Recurso-${i + 1}.svg`
              ),
              size: isDesktop ? "medium" : "small",
            })}
          </div>
        </div>
      </div>
      <div className="max-lg:mb-8 w-full flex flex-col lg:flex-row justify-start items-start gap-0 lg:gap-14 md:items-center">
        <h6 className="text-gradient w-fit">Medios invitados:</h6>
        <div className="flex-1 w-full lg:justify-between lg:items-center lg:flex">
          {ImgAliados({
            imgArray: Array.from(
              { length: 9 },
              (_, i) => `/iconos/invitados/Recurso-${i + 1}.svg`
            ),
            size: isDesktop ? "" : "small",
            grid: isDesktop ? false : true,
          })}
        </div>
      </div>
      <hr className="max-lg:mb-8 w-full border-t border-primary/20" />
      <div className="flex w-full flex-col lg:flex-row justify-between items-center mb-4">
        <div className="max-lg:mb-8 flex w-full lg:gap-4 gap-1 items-center max-lg:justify-between text-sm">
          <Link
            to={"https://interrapidisimo.com/proteccion-de-datos-personales/"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary/60 hover:text-four"
          >
            Políticas de privacidad
          </Link>{" "}
          <span className="opacity-60">|</span>
          <Link
            to={"https://interrapidisimo.com/terminos-condiciones-pre-envios/"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary/60 hover:text-four"
          >
            Términos y condiciones
          </Link>
          <span className="opacity-60">|</span>
          <Link
            to={"https://interrapidisimo.com/terminos-condiciones-pre-envios/"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary/60 hover:text-four"
          >
            Términos de uso
          </Link>
        </div>
        <div className="w-full flex lg:justify-end justify-center gap-14 items-center">
          {LinkSocial()}
        </div>
      </div>
    </footer>
  );
};

const ImgAliados = ({ imgArray, size, grid = false }) => {
  const content = imgArray.map((item, i) => (
    <figure
      key={i}
      className={`w-auto group inline-block ${
        size === "small"
          ? "h-8"
          : size === "medium"
          ? "h-10"
          : size === "tall"
          ? "h-12"
          : "h-4"
      }`}
    >
      <img
        src={item}
        alt="Logo Aliado"
        className="size-full object-contain inline-block opacity-70 group-hover:opacity-100 transition-all ease-in"
      />
    </figure>
  ));

  if (grid) {
    return (
      <div className="grid grid-cols-4 gap-x-6 gap-y-4 w-full">{content}</div>
    );
  }

  return content;
};
