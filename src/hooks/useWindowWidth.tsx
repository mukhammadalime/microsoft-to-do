import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const setWindowWidthHandler = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", setWindowWidthHandler);

    return () => {
      window.addEventListener("resize", setWindowWidthHandler);
    };
  });

  return windowWidth;
};

export default useWindowWidth;
