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
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const acceptTerms = watch("acceptTerms", false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    console.log("Datos del formulario:", data);

    // Guardar en Firestore
    const result = await saveUserTicket(data);

    if (!result.success) {
      console.error("Error al guardar:", result.error);
      setSubmitMessage({ type: "error", text: result.message });
      setIsSubmitting(false);
      return;
    }

    // Enviar a webhook de n8n antes de mostrar éxito (URL desde env)
    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      if (!webhookUrl) {
        console.error("VITE_N8N_WEBHOOK_URL no está configurada en las variables de entorno.");
        setSubmitMessage({
          type: "error",
          text: "Servicio externo no configurado. Contacta al administrador.",
        });
        setIsSubmitting(false);
        return;
      }

      const payload = { ...data, ticketId: result.ticketId };

      const resp = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const text = await resp.text();
        console.error("Webhook error:", resp.status, text);
        setSubmitMessage({
          type: "error",
          text: "Ocurrió un error notificando el servicio externo. Intenta nuevamente.",
        });
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.error("Error enviando webhook:", err);
      setSubmitMessage({
        type: "error",
        text: "No se pudo conectar con el servicio externo. Intenta nuevamente.",
      });
      setIsSubmitting(false);
      return;
    }

    // Si todo salió bien, mostrar mensaje de éxito
    console.log("Ticket guardado con ID:", result.ticketId);
    setSubmitMessage({ type: "success", text: result.message });
    reset();

    // Cerrar el modal después de 10 segundos
    setTimeout(() => {
      onClose();
      setSubmitMessage(null);
    }, 10000);

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
                  <h2 className="text-primary text-4xl mb-4">Te esperamos</h2>
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

                  {/* Checkbox de términos */}
                  <div className="pt-4 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      {...register("acceptTerms", {
                        required:
                          "Debes aceptar los términos y el tratamiento de datos",
                      })}
                      className="mt-1"
                    />
                    <label htmlFor="acceptTerms" className="text-primary text-sm">
                      Acepto los <a className="underline" href="https://interrapidisimo.com/wp-content/uploads/GEJ-CTN-R-28-Terminos-y-Condiciones-envios-en-linea-V2.pdf" target="_blank" rel="noopener noreferrer">términos y condiciones</a> y el <a className="underline" href="https://www.interrapidisimo.com/proteccion-de-datos-personales/" target="_blank" rel="noopener noreferrer">tratamiento de datos</a>.
                    </label>
                  </div>
                  {errors.acceptTerms && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.acceptTerms.message}
                    </span>
                  )}

                  <div className="pt-6">
                    <Button
                      id="submit-ticket"
                      type="submit"
                      text={isSubmitting ? "Enviando..." : "Obtén tu entrada"}
                      size="full"
                      color="white"
                      disabled={isSubmitting || !acceptTerms}
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
        <CheckCircle2 size={80} className="text-primary" strokeWidth={1.5} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-primary lg:text-5xl text-2xl font-prosperoBold mb-6"
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
          <span className="text-primary font-prosperoBold">
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


