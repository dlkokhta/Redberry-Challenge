interface HomePageButtonsTypes {
  image: string;
  title: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  onClick: any;
}

const HomePageButtons: React.FC<HomePageButtonsTypes> = ({
  image,
  title,
  bgColor,
  textColor,
  borderColor,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} border ${borderColor} rounded-xl font-firaGo font-medium text-base py-[14px] px-4 flex items-center gap-[7px]`}
      type="button"
    >
      <img src={image} className="w-[13px]" />
      {title}
    </button>
  );
};

export default HomePageButtons;
