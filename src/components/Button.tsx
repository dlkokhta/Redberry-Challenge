interface ButtonTypes {
  title: string;
  bgColor: string;
  textColor: string;
}
const Button: React.FC<ButtonTypes> = ({ title, bgColor, textColor }) => {
  return (
    <button
      className={`${bgColor} ${textColor} border border-red rounded-xl font-firaGo font-medium text-base py-[14px] px-4`}
    >
      {title}
    </button>
  );
};

export default Button;
