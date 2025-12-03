import { AnimatePresence, motion } from "framer-motion";
import { useOutletContext } from "react-router";
import { Loading } from "@/components/loaders/Loading";
import { ImgBackground } from "@/components/ui/ImgBackground";
import { Button } from "@/components/ui/Button";

import { Footer } from "@/components/Footer/Footer";
import { X } from "lucide-react";
import { MainSection } from "@/components/Home/MainSection";
import { CardArtist } from "@/components/ui/CardArtist";
import { ScrollMotion } from "@/components/Home/ScrollMotion";

function App() {
  const { isLoading, openForm, setOpenForm } = useOutletContext();

  const conferencistas = [
    {
      index: 1,
      person: "Norman <br/> Chaparro",
      category: "Mejor ser que parecer",
      img: "/imagenes/conferencistas/norman-chaparroN.jpg",
      imgM: "/imagenes/mobile/norman-chaparroMN.jpg",
      summary:
        "Fundador y presidente de Inter Rapidísimo, inició su <br /> empresa en una bicicleta hace más de 30 años y hoy <br /> sigue inspirando a emprendedores, empresarios desde <br /> un liderazgo empático, con propósito y convicción",
    },
    {
      index: 3,
      person: "Oscar <br/> Córdoba",
      category: "12 pasos para atrapar la felicidad",
      img: "/imagenes/conferencistas/oscar-cordovaN.jpg",
      imgM: "/imagenes/mobile/oscar-cordovaMN.jpg",
      summary:
        "Su historia une disciplina, sensibilidad <br /> y propósito. Con una voz que conecta <br /> generaciones, habla de salud mental,<br/> equilibrio y sentido de vida.",
    },
    {
      index: 4,
      person: "Isaac <br/> Chaparro",
      category: "El arte del Storyfeeling",
      img: "/imagenes/conferencistas/isaac-chaparroN.jpg",
      imgM: "/imagenes/mobile/isaac-chaparroMN.jpg",
      summary:
        "Vicepresidente Creativo en Inter Rapidísimo,<br/> lidera una visión que apuesta por la emoción,<br/> lo auténtico y lo inspirador. Sus ideas han <br/>transformado la forma de comunicar y contar<br/> historias.",
    },
  ];

  const artistas = [
    {
      index: 1,
      person: "Luis <br/> Silva",
      category: "Música Llanera",
      img: "/imagenes/artistas/luis-silvaN.jpg",
      imgM: "/imagenes/mobile/luis-silvaMN.jpg",
      summary:
        "Trae su voz como testimonio del valor de lo auténtico, <br />del respeto por las raíces y como exponente <br />de la música llanera.",
    },
    {
      index: 2,
      person: "Andy <br/>Rivera",
      category: "Reggaeton",
      img: "/imagenes/artistas/andy-riveraN.jpg",
      imgM: "/imagenes/mobile/andy-riveraNM.jpg",
      summary:
        "Llega a Inter Day con su energía y versatilidad. <br />Sus más grandes éxitos lo consolidaron como referente <br />en la escena urbana.",
    },
    {
      index: 3,
      person: "Walter <br/> Silva",
      category: "MÚSICA LLANERA",
      img: "/imagenes/artistas/walter-silvaN.jpg",
      imgM: "/imagenes/mobile/walter-silvaMN.jpg",
      summary:
        "Su canto invita a reconectar con recuerdos <br /> y alma del folclor llanero. Con su talento <br />fue merecedor de dos nominaciones <br />a los Grammy Latino.",
    },
    {
      index: 4,
      person: "Los <br/> Clásicos",
      category: "Boleros",
      img: "/imagenes/artistas/los-clasicosN.jpg",
      imgM: "/imagenes/mobile/los-clasicosMNew.jpg",
      summary:
        "Este grupo de adultos mayores se hizo viral <br />con su canción “+de75” y hoy demuestra que <br />nunca es tarde para soñar.",
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

      <ScrollMotion conferencistas={conferencistas} artistas={artistas} />
    </>
  );
}

export default App;
