import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { saveUserTicket } from "@/lib/firebase/actions";

export const FormTickets = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    console.log("Datos del formulario:", data);

    // Guardar en Firestore
    const result = await saveUserTicket(data);

    if (result.success) {
      console.log("Ticket guardado con ID:", result.ticketId);
      setSubmitMessage({ type: "success", text: result.message });
      reset();

      // Cerrar el modal después de 2 segundos
      setTimeout(() => {
        onClose();
        setSubmitMessage(null);
      }, 10000);
    } else {
      console.error("Error al guardar:", result.error);
      setSubmitMessage({ type: "error", text: result.message });
    }

    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-400"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl   rounded-lg p-12 z-500 max-h-[90vh] overflow-y-auto"
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-primary/60 hover:text-primary transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Contenido del formulario */}
            {submitMessage?.type === "success" ? (
              <SuccessMessage />
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-primary text-4xl mb-4">TE ESPERAMOS</h2>
                  <p className="text-primary/80 text-lg ">
                    Comparte con nosotros algunos datos, <br />
                    para hacer efectiva la entrega de tu boleta.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 max-w-md mx-auto"
                >
                  {/* ¿Cuál es tu nombre? */}
                  <div>
                    <input
                      type="text"
                      placeholder="¿Cuál es tu nombre?"
                      {...register("nombre", {
                        required: "Este campo es requerido",
                      })}
                      className="input-field"
                    />
                    {errors.nombre && (
                      <span className="text-red-500 text-xs mt-1 block">
                        {errors.nombre.message}
                      </span>
                    )}
                  </div>

                  {/* Número de WhatsApp */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Número de WhatsApp"
                      {...register("whatsapp", {
                        required: "Este campo es requerido",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Ingresa un número válido de 10 dígitos",
                        },
                      })}
                      className="input-field"
                    />
                    {errors.whatsapp && (
                      <span className="text-red-500 text-xs mt-1 block">
                        {errors.whatsapp.message}
                      </span>
                    )}
                  </div>

                  {/* Correo electrónico */}
                  <div>
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      {...register("email", {
                        required: "Este campo es requerido",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Correo electrónico inválido",
                        },
                      })}
                      className="input-field"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs mt-1 block">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Número de cédula */}
                  <div>
                    <input
                      type="text"
                      placeholder="Número de cédula"
                      {...register("cedula", {
                        required: "Este campo es requerido",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Ingresa solo números",
                        },
                      })}
                      className="input-field"
                    />
                    {errors.cedula && (
                      <span className="text-red-500 text-xs mt-1 block">
                        {errors.cedula.message}
                      </span>
                    )}
                  </div>

                  {/* Mensaje de éxito/error */}
                  {submitMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg text-center ${
                        submitMessage.type === "success"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {submitMessage.text}
                    </motion.div>
                  )}

                  {/* Botón de envío */}
                  <div className="pt-6">
                    <Button
                      id="submit-ticket"
                      type="submit"
                      text={isSubmitting ? "ENVIANDO..." : "OBTÉN TU ENTRADA"}
                      size="full"
                      disabled={isSubmitting}
                    />
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Componente de mensaje de éxito
const SuccessMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center py-12 px-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <CheckCircle2 size={80} className="text-four" strokeWidth={1.5} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gradient text-5xl font-prosperoBold mb-6"
      >
        ¡GRACIAS!
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 max-w-lg"
      >
        <p className="text-primary text-xl font-prosperoRegular leading-relaxed">
          Tu registro ha sido exitoso.
        </p>
        <p className="text-primary text-lg font-prosperoRegular leading-relaxed">
          Pronto recibirás tu boleta en el correo electrónico que nos
          proporcionaste.
          <br />
          <span className="text-four font-prosperoBold">
            ¡Nos vemos en INTER DAY 2025!
          </span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-primary/40 text-sm font-prosperoRegular"
      >
        Esta ventana se cerrará automáticamente...
      </motion.div>
    </motion.div>
  );
};
