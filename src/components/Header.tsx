import Logo from "../assets/LOGO.png";
const Header = () => {
  return (
    <header className=" h-[100px] py-[38px] pl-[162px] border-[1px] border-grayBorder">
      <img className="w-[150px]" src={Logo} alt="Logo" />
    </header>
  );
};

export default Header;
