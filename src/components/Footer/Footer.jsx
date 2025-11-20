import { Link } from "react-router";

export const Footer = () => {
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
              size: "small",
            })}
          </Link>
        ))}
      </>
    );
  };

  return (
    <footer className="snap-start snap-always w-full h-dvh flex flex-col justify-end items-start gap-10 px-10 md:px-20 lg:px-40 pb-14">
      <div className="flex w-full">
        <div className="w-full flex justify-start gap-14 items-center">
          <h6 className="text-gradient w-fit">Presenta:</h6>
          <div className="w-full flex justify-center items-center">
            {ImgAliados({
              imgArray: Array.from(
                { length: 1 },
                (_, i) => `/iconos/presenta/Recurso-${i + 1}.svg`
              ),
              size: "medium",
            })}
          </div>
        </div>
        <div className="w-full flex justify-start gap-14 items-center">
          <h6 className="text-gradient w-fit">Aliados:</h6>
          <div className="flex-1 flex justify-between items-center">
            {ImgAliados({
              imgArray: Array.from(
                { length: 3 },
                (_, i) => `/iconos/aliados/Recurso-${i + 1}.svg`
              ),
              size: "medium",
            })}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-start gap-14 items-center">
        <h6 className="text-gradient w-fit">Medios invitados:</h6>
        <div className="flex-1 flex justify-between items-center">
          {ImgAliados({
            imgArray: Array.from(
              { length: 9 },
              (_, i) => `/iconos/invitados/Recurso-${i + 1}.svg`
            ),
            size: "small",
          })}
        </div>
      </div>
      <hr className="w-full border-t border-primary/20" />
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex w-full gap-4 text-sm">
          <Link
            to={"https://interrapidisimo.com/proteccion-de-datos-personales/"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/60 hover:text-four"
          >
            Políticas de privacidad
          </Link>{" "}
          |
          <Link
            to={"https://interrapidisimo.com/terminos-condiciones-pre-envios/"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/60 hover:text-four"
          >
            Términos y condiciones
          </Link>
          |
          <Link
            to={"https://interrapidisimo.com/terminos-condiciones-pre-envios/"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/60 hover:text-four"
          >
            Términos de uso
          </Link>
        </div>
        <div className="w-full flex justify-end gap-14 items-center">
          {LinkSocial()}
        </div>
      </div>
    </footer>
  );
};

const ImgAliados = ({ imgArray, size }) => {
  return imgArray.map((item, i) => (
    <figure
      key={i}
      className={`w-auto group inline-block ${
        size === "small"
          ? "h-4"
          : size === "medium"
          ? "h-10"
          : size === "tall"
          ? "h-12"
          : "h-6"
      }`}
    >
      <img
        src={item}
        alt="Logo Aliado"
        className="size-full object-contain inline-block opacity-70 group-hover:opacity-100 transition-all ease-in"
      />
    </figure>
  ));
};
