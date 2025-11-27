import { AnimatePresence, motion } from "framer-motion";
import { useOutletContext } from "react-router";
import { Loading } from "@/components/loaders/Loading";
import { ImgBackground } from "@/components/ui/ImgBackground";
import { Button } from "@/components/ui/Button";

import { Footer } from "@/components/Footer/Footer";
import { X } from "lucide-react";
import { MainSection } from "@/components/Home/MainSection";
import { CardArtist } from "@/components/ui/CardArtist";

function App() {
  const { isLoading, openForm, setOpenForm } = useOutletContext();

  const conferencistas = [
    {
      index: 1,
      person: "Norman <br/> Chaparro",
      category: "Tiempo para aprender",
      img: "/imagenes/conferencistas/norman-chaparroN.jpg",
      imgM: "/imagenes/mobile/norman-chaparroMN.jpg",
    },
    {
      index: 2,
      person: "Yokoi <br/> Kenji",
      category: "Conectando propósito con acción",
      img: "/imagenes/conferencistas/Yokoi-KenjiN.jpg",
      imgM: "/imagenes/mobile/yokoi-kenjiMN.jpg",
    },
    {
      index: 3,
      person: "Oscar <br/> Córdoba",
      category: "Felicidad, liderazgo y marca personal",
      img: "/imagenes/conferencistas/oscar-cordovaN.jpg",
      imgM: "/imagenes/mobile/oscar-cordovaMN.jpg",
    },
    {
      index: 4,
      person: "Isaac <br/> Chaparro",
      category: "Entregar es mejor que recibir",
      img: "/imagenes/conferencistas/isaac-chaparroN.jpg",
      imgM: "/imagenes/mobile/isaac-chaparroMN.jpg",
    },
  ];

  const artistas = [
    {
      index: 1,
      person: "Luis <br/> Silva",
      category: "Música Llanera",
      img: "/imagenes/artistas/luis-silvaN.jpg",
      imgM: "/imagenes/mobile/luis-silvaMN.jpg",
    },
    {
      index: 2,
      person: "Andy <br/>Rivera",
      category: "Reggaeton",
      img: "/imagenes/artistas/andy-riveraN.jpg",
      imgM: "/imagenes/mobile/andy-riveraNM.jpg",
    },
    {
      index: 3,
      person: "Walter <br/> Silva",
      category: "MÚSICA LLANERA",
      img: "/imagenes/artistas/walter-silvaN.jpg",
      imgM: "/imagenes/mobile/walter-silvaMN.jpg",
    },
    {
      index: 4,
      person: "Los <br/> Clásicos",
      category: "MÚSICA LLANERA",
      img: "/imagenes/artistas/los-clasicosN.jpg",
      imgM: "/imagenes/mobile/los-clasicosMN.jpg",
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

      <MainSection />

      <CardArtist
        artist={conferencistas}
        title={"Conferencistas"}
        width={"full"}
        resume={
          'En INTER DAY te esperan voces que inspiran,<br /> motivan y nos recuerdan por qué<br/> <span class="font-prosperoBold">vale la pena seguir entregando.</span>'
        }
      />
      <CardArtist
        artist={artistas}
        title={"Artistas"}
        width={"medium"}
        resume={
          "Cuatro grandes de la música nacional<br /> nos acompañan para cerrar <br/>a lo grande este evento."
        }
      />
      <Footer />
    </>
  );
}

export default App;
