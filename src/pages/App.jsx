import { AnimatePresence, motion } from "framer-motion";
import { useOutletContext } from "react-router";
import { Loading } from "@/components/loaders/Loading";
import { ImgBackground } from "@/components/ui/ImgBackground";
import { Button } from "@/components/ui/Button";
import { CardArtist } from "@/components/ui/CardArtist";
import { Footer } from "@/components/Footer/Footer";
import { X } from "lucide-react";

function App() {
  const { isLoading, openForm, setOpenForm } = useOutletContext();

  const conferencistas = [
    {
      index: 1,
      person: "Norman <br/> Chaparro",
      category: "Tiempo para aprender",
      img: "/imagenes/conferencistas/norman-chaparro.jpg",
    },
    {
      index: 2,
      person: "Yokoi <br/> Kenji",
      category: "Conectando propósito con acción",
      img: "/imagenes/conferencistas/Yokoi-Kenji.jpg",
    },
    {
      index: 3,
      person: "Oscar <br/> Córdova",
      category: "Felicidad, liderazgo y marca personal",
      img: "/imagenes/conferencistas/oscar-cordova.jpg",
    },
    {
      index: 4,
      person: "Isaac <br/> Chaparro",
      category: "Entregar es mejor que recibir",
      img: "/imagenes/conferencistas/isaac-chaparro.jpg",
    },
  ];

  const artistas = [
    {
      index: 1,
      person: "Luis <br/> Silva",
      category: "Música Llanera",
      img: "/imagenes/artistas/luis-silva.jpg",
    },
    {
      index: 2,
      person: "Kapo",
      category: "AFROBEAT Y REGUETÓN",
      img: "/imagenes/artistas/kapo.jpg",
    },
    {
      index: 3,
      person: "Walter <br/> Silva",
      category: "MÚSICA LLANERA",
      img: "/imagenes/artistas/walter-silva.jpg",
    },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed size-full pointer-events-none top-0 left-0 bg-secundary z-200 flex justify-center items-center"
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="snap-start snap-always w-full h-dvh overflow-hidden relative">
        <ImgBackground img={"/imagenes/section-one.jpg"} />
        <div className="flex size-full justify-center items-center px-4 md:px-20 lg:px-40">
          <div className="w-1/2 h-full flex flex-col justify-center gap-26 items-center py-16">
            <div className="w-full text-center">
              <h1 className="text-primary text-4xl md:text-[2.6rem] font-prosperoExtralight text-center tracking-wide leading-12 border-b border-primary/20 pb-4">
                LOS TALENTOS QUE NOS MUEVEN <br /> Y LAS IDEAS QUE NOS INSPIRAN{" "}
                <br />
                <span className="font-prosperoSemiBold">
                  {" "}
                  REUNIDOS EN ESTA ENTREGA.
                </span>
              </h1>
              <p className="mt-4">
                13 DE DICIEMBRE COLISEO ÁLVARO MEZA AMAYA, VILLAVICENCIO, META,
                COL.
              </p>
            </div>
            <Button
              id={"acquire-ticket"}
              text="ADQUIERE TU ENTRADA"
              size={"large"}
            />
          </div>
          <div className="w-1/2 relative h-full">
            <p className="absolute -right-40 -rotate-90 bottom-40">
              Código pulep: tqk951
            </p>
          </div>
        </div>
      </main>
      <CardArtist
        artist={conferencistas}
        title={"Conferencistas"}
        width={"full"}
        resume={
          'En INTER DAY te esperan voces que inspiran,<br /> motivan y nos recuerdan por qué<br/> <span class="font-prosperoSemiBold">vale la pena seguir entregando.</span>'
        }
      />
      <CardArtist
        artist={artistas}
        title={"Artistas"}
        width={"medium"}
        resume={
          "Tres grandes de la música nacional<br /> nos acompañan para cerrar <br/>a lo grande este evento."
        }
        overlay={true}
      />
      <Footer />
    </>
  );
}

export default App;
