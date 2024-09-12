// import { useForm } from "react-hook-form";
import AddAgentInputFields from "../components/AddAgentInputFields";

const AddAgent = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className=" bg-white py-[87px] px-[105px]">
        <h1 className="text-center font-firaGo text-[32px] font-medium mb-[61px]">
          აგენტის დამატება
        </h1>
        <form className="">
          <div className="flex justify-between mb-[28px]">
            <AddAgentInputFields
              labelName=" სახელი *"
              validationMessage="მინიმუმ ორი სიმბოლო"
            />
            <AddAgentInputFields
              labelName="გვარი"
              validationMessage="მინიმუმ ორი სიმბოლო"
            />
          </div>
          <div className="flex gap-[31px]">
            <AddAgentInputFields
              labelName="ელ-ფოსტა *"
              validationMessage="გამოიყენეთ @redberry.ge ფოსტა"
            />
            <AddAgentInputFields
              labelName="ტელეფონის ნომერი"
              validationMessage="მხოლოდ რიცხვები"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgent;
