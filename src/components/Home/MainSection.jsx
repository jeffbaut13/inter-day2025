import { useResponsive } from "@/hooks/useResponsive";
import { Button } from "../ui/Button";
import { ImgBackground } from "../ui/ImgBackground";
import { ImgBack } from "../ui/ImgBack";

export const MainSection = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <main className="snap-start snap-always w-full h-dvh overflow-hidden relative">
      <ImgBack
        img={
          isDesktop
            ? "/imagenes/section-one.jpg"
            : "/imagenes/mobile/Mobile-Landing-InterDay.jpg"
        }
      />
      <div className="flex flex-col-reverse lg:flex-row size-full justify-center items-center px-4 md:px-20 lg:px-40">
        <div className="lg:w-1/2 w-full h-1/2 lg:h-full flex flex-col lg:justify-center justify-start lg:gap-26 gap-12 items-center py-16">
          <div className="w-full text-center flex flex-col justify-center items-center">
            <h1 className="lg:w-fit w-full text-primary text-2xl md:text-[2.6rem] font-prosperoExtralight text-center tracking-wide lg:leading-12 border-b border-primary/20 pb-4">
              LOS TALENTOS QUE NOS MUEVEN <br /> Y LAS IDEAS QUE NOS INSPIRAN{" "}
              <br />
              <span className="font-prosperoBold">
                {" "}
                REUNIDOS EN ESTA ENTREGA.
              </span>
            </h1>
            <p className="mt-4">
              13 DE DICIEMBRE COLISEO ÁLVARO MEZA AMAYA,{" "}
              <br className="lg:hidden" /> VILLAVICENCIO, META, COL.
            </p>
          </div>
          <Button
            id={"acquire-ticket"}
            text="ADQUIERE TU ENTRADA"
            size={isDesktop ? "large" : "small"}
          />

          {!isDesktop && (
            <p className="absolute -right-10 -rotate-90 bottom-24 text-xs text-primary/30">
              Código pulep: tqk951
            </p>
          )}
        </div>

        <div className="w-1/2 relative lg:h-full h-1/2">
          {isDesktop && (
            <p className="absolute -right-40 -rotate-90 bottom-40 text-primary/30">
              Código pulep: tqk951
            </p>
          )}
        </div>
      </div>
    </main>
  );
};
