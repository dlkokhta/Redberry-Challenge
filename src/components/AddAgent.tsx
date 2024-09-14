import { useForm } from "react-hook-form";
import AddAgentInputFields from "../components/AddAgentInputFields";
import PlusCircle from "../assets/plus-circle.png";
import Button from "../components/Button";
import axios from "axios";

const AddAgent = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    const file = data.avatar?.[0];
    if (file) {
      formData.append("avatar", file);
    } else {
      console.error("No file uploaded");
      return;
    }

    const url =
      "https://api.real-estate-manager.redberryinternship.ge/api/agents/";
    const token = process.env.REACT_APP_API_TOKEN;
    console.log(token);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response.data);
    } catch (error) {
      console.log(error);
    }

    reset();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className=" bg-white py-[87px] px-[105px]">
        <h1 className="text-center font-firaGo text-[32px] font-medium mb-[61px]">
          აგენტის დამატება
        </h1>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between mb-[28px]">
            <AddAgentInputFields
              label=" სახელი *"
              validationMessage="მინიმუმ ორი სიმბოლო"
              id="name"
              register={register}
            />
            <AddAgentInputFields
              label="გვარი"
              validationMessage="მინიმუმ ორი სიმბოლო"
              id="surname"
              register={register}
            />
          </div>
          <div className="flex gap-[31px] mb-7">
            <AddAgentInputFields
              label="ელ-ფოსტა *"
              validationMessage="გამოიყენეთ @redberry.ge ფოსტა"
              id="email"
              register={register}
            />
            <AddAgentInputFields
              label="ტელეფონის ნომერი"
              validationMessage="მხოლოდ რიცხვები"
              id="phone"
              register={register}
            />
          </div>

          <div>
            <label
              className="block font-firaGo text-[14px] font-medium mb-[5px]"
              htmlFor="avatar"
            >
              upload image
            </label>

            <div className="relative border border-dashed border-x-2 border-y-2 rounded-md  w-full border-[#808A93] h-[120px] flex justify-center items-center">
              <img
                className="w-6 cursor-pointer "
                src={PlusCircle}
                alt="upload"
              />
              <input
                type="file"
                id="avatar"
                {...register("avatar")}
                name="avatar"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
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
