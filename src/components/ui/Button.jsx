import { useOutletContext } from "react-router";

export const Button = ({ id, text, size, color = "", onClick, type }) => {
  const context = useOutletContext();
  const setOpenForm = context?.setOpenForm;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (setOpenForm) {
      setOpenForm(true);
    }
  };

  return (
    <button
      id={id}
      type={type || "button"}
      onClick={handleClick}
      className={`${
        color === "white" ? "btn-secondary" : "btn-primary"
      } group lg:py-2 ${
        size === "small"
          ? "px-12"
          : size === "medium"
          ? "px-24"
          : size === "large"
          ? "px-31"
          : size === "full"
          ? "w-full"
          : "px-6"
      } transition-all ease-in`}
    >
      <span
        className={`${
          color === "white"
            ? "text-secundary"
            : "text-four group-hover:text-secundary"
        }  tracking-wider whitespace-nowrap`}
      >
        {text}
      </span>
    </button>
  );
};
