interface ButtonTypes {
  title: string;
  bgColor: string;
  textColor: string;
  onclick?: any;
  type: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonTypes> = ({
  title,
  bgColor,
  textColor,
  onclick,
  type,
}) => {
  return (
    <button
      className={`${bgColor} ${textColor} border border-red rounded-xl font-firaGo font-medium text-base py-[14px] px-4`}
      onClick={onclick}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
