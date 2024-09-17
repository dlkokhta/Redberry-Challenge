interface AddAgentInputFieldsTypes {
  label: string;
  id: string;
  register: any;
  validationMessage: string;
  errors: any;
  watchValue: string;
  required: boolean;
}

const AddAgentInputFields: React.FC<AddAgentInputFieldsTypes> = ({
  label,
  id,
  register,
  validationMessage,
  errors,
  watchValue,
  required,
}) => {
  const getStrokeColor = () => {
    if (!required && (watchValue === undefined || watchValue === "")) {
      return "#021526";
    } else if (errors) {
      return "#F93B1D";
    } else {
      return "#45A849";
    }
  };

  return (
    <div>
      <label
        className="block font-firaGo text-[14px] font-medium mb-[5px]"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`border border-[#808A93] rounded-[6px] w-[384px] h-[42px] outline-none pl-2 ${
          !required && (watchValue === undefined || watchValue === "")
            ? " border-textBlack"
            : errors
            ? " border-textRed"
            : " border-textGreen"
        }`}
        type="text"
        id={id}
        {...register(id)}
        name={id}
      />

      <div className="flex gap-1 place-items-center mt-1">
        <div>
          <svg
            width="12"
            height="11"
            viewBox="0 0 12 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 1.40918L4.125 9.591L1 5.87199"
              stroke={getStrokeColor()}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3
          className={`block font-firaGo text-[14px] font-normal ${
            !required && (watchValue === undefined || watchValue === "")
              ? " text-textBlack"
              : errors
              ? " text-textRed"
              : " text-textGreen"
          }`}
        >
          {validationMessage}
        </h3>
      </div>
    </div>
  );
};

export default AddAgentInputFields;
