import { useForm } from "react-hook-form";
import AddAgentInputFields from "../components/AddAgentInputFields";
import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import addAgentValidationSchema from "../schemas/addAgentValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import AvatarUpload from "../components/AvatarUpload";

const AddAgent = ({ setIsAgentWindowOpen }: any) => {
  const [required, setRequired] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    clearErrors,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addAgentValidationSchema),
  });

  const name = watch("name");
  const surname = watch("surname");
  const email = watch("email");
  const phone = watch("phone");

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    console.log("data", data);
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("avatar", data.avatar);

    const url =
      "https://api.real-estate-manager.redberryinternship.ge/api/agents/";
    const token = "9cfc36ff-e2fb-41a1-95c0-55773a2ca25f";

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
    setIsAgentWindowOpen(true);
  };

  const cancelHandleClick = () => {
    setIsAgentWindowOpen(false);
  };

  const submitCLickhandler = () => {
    setRequired(true);
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
              errors={errors.name}
              watchValue={name}
              required={required}
              width="w-[384px]"
              hight=" h-[42px]"
            />
            <AddAgentInputFields
              label="გვარი"
              validationMessage="მინიმუმ ორი სიმბოლო"
              id="surname"
              register={register}
              errors={errors.surname}
              watchValue={surname}
              required={required}
              width="w-[384px]"
              hight=" h-[42px]"
            />
          </div>
          <div className="flex gap-[31px] mb-7">
            <AddAgentInputFields
              label="ელ-ფოსტა"
              validationMessage="გამოიყენეთ @redberry.ge ფოსტა"
              id="email"
              register={register}
              errors={errors.email}
              watchValue={email}
              required={required}
              width="w-[384px]"
              hight=" h-[42px]"
            />

            <AddAgentInputFields
              label="ტელეფონის ნომერი"
              validationMessage="მხოლოდ რიცხვები"
              id="phone"
              register={register}
              errors={errors.phone}
              watchValue={phone}
              required={required}
              width="w-[384px]"
              hight=" h-[42px]"
            />
          </div>

          <AvatarUpload
            setValue={setValue}
            clearErrors={clearErrors}
            errors={errors}
            register={register}
            id="avatar"
          />

          <div className="mt-[94px] flex justify-end gap-[15px]">
            <Button
              onclick={cancelHandleClick}
              title="გაუქმება"
              bgColor="bg-white"
              textColor="text-red"
              type="button"
            />
            <Button
              onclick={submitCLickhandler}
              title="დაამატე აგენტი"
              bgColor="bg-red"
              textColor="text-white"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgent;
