import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className=" h-[100px] py-[38px] pl-[162px] border border-grayBorder">
      <img
        onClick={() => navigate("/")}
        className="w-[150px] cursor-pointer"
        src={Logo}
        alt="Logo"
      />
    </header>
  );
};

export default Header;
