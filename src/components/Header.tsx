import Logo from "../assets/Logo.png";
const Header = () => {
  return (
    <header className=" h-[100px] py-[38px] pl-[162px] border border-grayBorder">
      <img className="w-[150px]" src={Logo} alt="Logo" />
    </header>
  );
};

export default Header;
