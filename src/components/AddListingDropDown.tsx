import { useState, useEffect } from "react";
import Select from "react-select";

interface AddListingDropDownTypes {
  data: any;
  header: string;
  placeholder: string;
  onSelect?: (selectedOption: any) => void; // Optional callback for when an option is selected
}

const AddListingDropDown: React.FC<AddListingDropDownTypes> = ({
  data,
  header,
  placeholder,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const mappedOptions = data.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
    setOptions(mappedOptions);
  }, [data]);

  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    if (onSelect) {
      onSelect(selectedOption); // Pass the selected option to the parent component
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      height: "42px",
      borderColor: "#808A93",
      boxShadow: "none",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#000000",
      svg: {
        width: "15px",
        height: "15px",
      },
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
  };

  return (
    <div>
      <h3 className="block font-firaGo text-[14px] font-medium mb-[5px]">
        {header}
      </h3>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
        className="w-[384px] font-firaGo text-[14px] font-medium"
        menuPlacement="auto"
        styles={customStyles}
        placeholder={placeholder}
      />
    </div>
  );
};

export default AddListingDropDown;
