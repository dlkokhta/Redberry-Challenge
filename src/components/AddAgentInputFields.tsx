import Vector from "../assets/Vector.png";

interface AddAgentInputFieldsTypes {
  label: string;
  id: string;
  register: any;
  validationMessage: string;
}

const AddAgentInputFields: React.FC<AddAgentInputFieldsTypes> = ({
  label,
  id,
  register,
  validationMessage,
}) => {
  return (
    <div>
      <label
        className="block font-firaGo text-[14px] font-medium mb-[5px]"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="border border-[#808A93] rounded-[6px] w-[384px] h-[42px] outline-none pl-2"
        type="text"
        id={id}
        {...register(id)}
        name={id}
      />
      <div className="flex gap-1 place-items-center mt-1">
        <img className="w-[10px] h-[8,2px]" src={Vector} alt="vector Logo" />
        <h3 className="block font-firaGo text-[14px] font-normal">
          {validationMessage}
        </h3>
      </div>
    </div>
  );
};

export default AddAgentInputFields;
