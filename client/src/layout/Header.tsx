import HeaderLeft from "../components/Header/HeaderLeft";
import HeaderSearch from "../components/Header/HeaderSearch";
import HeaderActions from "../components/Header/HeaderActions";

const Header = () => {
  return (
    <div className="header">
      <HeaderLeft />

      <HeaderSearch />

      <HeaderActions />
    </div>
  );
};

export default Header;
