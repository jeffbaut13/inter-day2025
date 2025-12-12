import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router";
import { Header } from "@/components/header/Header";
import { FormTickets } from "@/components/Form/FormTickets";

const LayoutMain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simula un tiempo de carga de 3 segundos

    return () => clearTimeout(timer);
  }, []);

  const contextValue = { isLoading, setIsLoading, openForm, setOpenForm };

  return (
    <>
      <HeaderWithContext context={contextValue} />
      <Outlet context={contextValue} />
       
    </>
  );
};

const HeaderWithContext = ({ context }) => {
  return <Header context={context} />;
};

export default LayoutMain;
