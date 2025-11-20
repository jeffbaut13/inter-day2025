import { AnimatePresence, motion } from "framer-motion";
import { useOutletContext } from "react-router";
import { Loading } from "@/components/loaders/Loading";
import { ImgBackground } from "@/components/ui/ImgBackground";
import { Button } from "@/components/ui/Button";
import { CardArtist } from "@/components/ui/CardArtist";
import { Footer } from "@/components/Footer/Footer";
import { X } from "lucide-react";
import { MainSection } from "@/components/Home/MainSection";
import { useResponsive } from "@/hooks/useResponsive";

function App() {
  const { isLoading, openForm, setOpenForm } = useOutletContext();

  const conferencistas = [
    {
      index: 1,
      person: "Norman <br/> Chaparro",
      category: "Tiempo para aprender",
      img: "/imagenes/conferencistas/norman-chaparro.jpg",
      imgM: "/imagenes/mobile/norman-chaparroM.jpg",
    },
    {
      index: 2,
      person: "Yokoi <br/> Kenji",
      category: "Conectando propósito con acción",
      img: "/imagenes/conferencistas/Yokoi-Kenji.jpg",
      imgM: "/imagenes/mobile/yokoi-kenjiM.jpg",
    },
    {
      index: 3,
      person: "Oscar <br/> Córdova",
      category: "Felicidad, liderazgo y marca personal",
      img: "/imagenes/conferencistas/oscar-cordova.jpg",
      imgM: "/imagenes/mobile/oscar-cordovaM.jpg",
    },
    {
      index: 4,
      person: "Isaac <br/> Chaparro",
      category: "Entregar es mejor que recibir",
      img: "/imagenes/conferencistas/isaac-chaparro.jpg",
      imgM: "/imagenes/mobile/isaac-chaparroM.jpg",
    },
  ];

  const artistas = [
    {
      index: 1,
      person: "Luis <br/> Silva",
      category: "Música Llanera",
      img: "/imagenes/artistas/luis-silva.jpg",
      imgM: "/imagenes/mobile/luis-silvaM.jpg",
    },
    {
      index: 2,
      person: "Kapo",
      category: "AFROBEAT Y REGUETÓN",
      img: "/imagenes/artistas/kapo.jpg",
      imgM: "/imagenes/mobile/kapoM.jpg",
    },
    {
      index: 3,
      person: "Walter <br/> Silva",
      category: "MÚSICA LLANERA",
      img: "/imagenes/artistas/walter-silva.jpg",
      imgM: "/imagenes/mobile/walter-silvaM.jpg",
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
