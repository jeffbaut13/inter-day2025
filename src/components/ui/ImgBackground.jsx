export const ImgBackground = ({ img, overlay = true }) => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="pointer-events-none bg-center bg-cover bg-no-repeat size-full absolute top-0 left-0 -z-10"
      />
      {overlay && (
        <div className="pointer-events-none size-full absolute top-0 left-0 -z-10 bg-black/20" />
      )}
    </>
  );
};
