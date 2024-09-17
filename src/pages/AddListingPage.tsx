import AddAgentInputFields from "../components/AddAgentInputFields";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../components/Button";
// import AvatarUpload from "../components/AvatarUpload";

const AddListingPage = () => {
  const [required, setRequired] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    // clearErrors,
    // setValue,
  } = useForm();

  const address = watch("address");
  const postalCode = watch("postalCode");

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    console.log("data", data);
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("avatar", data.avatar);

    const url =
      "https://api.real-estate-manager.redberryinternship.ge/api/real-estates/";
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
  };

  const cancelHandleClick = () => {};

  const submitCLickhandler = () => {
    setRequired(true);
  };

  return (
    <div className="pt-[62px] px-[562px] pb-[87px]">
      <h1 className="text-center font-firaGo text-[32px] font-medium mb-[61px]">
        ლისტინგის დამატება
      </h1>

      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[80px]">
          <h2 className=" font-firaGo font-medium text-lg">გარიგების ტიპი</h2>
          <div className="font-firaGo text-[14px] font-normal flex">
            <label className="mr-[84px] flex items-center">
              <input
                type="radio"
                name="ratio"
                value="option1"
                checked
                className="mr-[7px] w-[17px] h-[17px] "
              />
              იყიდება
            </label>
            <label className=" flex items-center">
              <input
                type="radio"
                name="ratio"
                value="option2"
                className="mr-[7px] w-[17px] h-[17px] "
              />
              ქირავდება
            </label>
          </div>
        </div>
        <h2 className=" font-firaGo font-medium text-lg mb-[22px]">
          მდებარეობა
        </h2>
        <div className="flex justify-between mb-[28px]">
          <AddAgentInputFields
            label=" მისამართი *"
            validationMessage="მინიმუმ ორი სიმბოლო"
            id="address"
            register={register}
            errors={errors.address}
            watchValue={address}
            required={required}
          />

          <AddAgentInputFields
            label="საფოსტო ინდექსი *"
            validationMessage="მინიმუმ ორი სიმბოლო"
            id="postalCode"
            register={register}
            errors={errors.postalCode}
            watchValue={postalCode}
            required={required}
          />
        </div>

        {/* <select id="options" name="options" className="border">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select> */}

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
            title="დაამატე ლისტინგი"
            bgColor="bg-red"
            textColor="text-white"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddListingPage;
