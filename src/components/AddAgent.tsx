// import { useForm } from "react-hook-form";
import AddAgentInputFields from "../components/AddAgentInputFields";
import PlusCircle from "../assets/plus-circle.png";
import Button from "../components/Button";

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
          <div className="flex gap-[31px] mb-7">
            <AddAgentInputFields
              labelName="ელ-ფოსტა *"
              validationMessage="გამოიყენეთ @redberry.ge ფოსტა"
            />
            <AddAgentInputFields
              labelName="ტელეფონის ნომერი"
              validationMessage="მხოლოდ რიცხვები"
            />
          </div>

          <div>
            <label
              className="block font-firaGo text-[14px] font-medium mb-[5px]"
              htmlFor="image"
            >
              ატვირთეთ ფოტო *
            </label>
            <div className="border border-dashed border-x-2 border-y-2 rounded-md  w-full border-[#808A93] h-[120px] flex justify-center items-center">
              <img className="w-6 cursor-pointer" src={PlusCircle} />
            </div>
          </div>

          <div className="mt-[94px] flex justify-end gap-[15px]">
            <Button title="გაუქმება" bgColor="bg-white" textColor="text-red" />
            <Button
              title="დაამატე აგენტი"
              bgColor="bg-red"
              textColor="text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgent;
