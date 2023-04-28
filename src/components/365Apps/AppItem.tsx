import { _365AppsTypes } from "../../types/designTypes";

const AppItem = ({ name, link, imgLocation }: _365AppsTypes) => {
  return (
    <a href={link} className="appContainer">
      <img src={`./assets/images/365Apps/microsoft-${imgLocation}`} alt="" />
      <span>{name}</span>
    </a>
  );
};

export default AppItem;
