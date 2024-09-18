import AddAgentInputFields from "../components/AddAgentInputFields";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../components/Button";
import AvatarUpload from "../components/AvatarUpload";
import { yupResolver } from "@hookform/resolvers/yup";
import addListingValidationSchema from "../schemas/addListingValidationSchema";
import { RootState } from "../store/store.js";
import { useSelector } from "react-redux";

const AddListingPage = () => {
  const region = useSelector((state: RootState) => state.region.region);
  console.log(
    "regiooooon",
    region.map((item: any) => item.name)
  );

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
    resolver: yupResolver(addListingValidationSchema),
  });

  const address = watch("address");
  const postalCode = watch("postalCode");
  const price = watch("price");
  const area = watch("area");
  const bedrooms = watch("bedrooms");
  const description = watch("description");

  const onSubmit = async (data: any) => {
    console.log("errorsss!!", errors);
    console.log("data!!", data);
    const formData = new FormData();

    formData.append("address", data.address);
    formData.append("image", data.avatar);
    formData.append("region_id", data.regionId);
    formData.append("description", data.description);
    formData.append("city_id", data.cityId);
    formData.append("zip_code", data.postalCode);
    formData.append("price", data.price);
    formData.append("area", data.area);
    formData.append("bedrooms", data.bedrooms);
    formData.append("is_rental", data.isRental);
    formData.append("agent_id", data.agentID);

    const url =
      "https://api.real-estate-manager.redberryinternship.ge/api/real-estates12/";
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
          <h2 className=" font-firaGo font-bold text-lg">გარიგების ტიპი</h2>
          <div className="font-firaGo text-[14px] font-normal flex">
            <label className="mr-[84px] flex items-center">
              <input
                type="radio"
                id="forSale"
                value="1"
                {...register("isRental")}
                className="mr-[7px] w-[17px] h-[17px] "
                defaultChecked
              />
              იყიდება
            </label>
            <label className=" flex items-center">
              <input
                type="radio"
                id="forRent"
                value="0"
                {...register("isRental")}
                className="mr-[7px] w-[17px] h-[17px] "
              />
              ქირავდება
            </label>
          </div>
        </div>
        <h2 className=" font-firaGo font-bold1 text-lg mb-[22px]">
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
            width="w-[384px]"
            hight=" h-[42px]"
          />

          <AddAgentInputFields
            label="საფოსტო ინდექსი *"
            validationMessage="მინიმუმ ორი სიმბოლო"
            id="postalCode"
            register={register}
            errors={errors.postalCode}
            watchValue={postalCode}
            required={required}
            width="w-[384px]"
            hight=" h-[42px]"
          />
        </div>

        <div className="flex justify-between">
          <div>
            <h3 className="block font-firaGo text-[14px] font-medium mb-[5px]">
              რეგიონი
            </h3>
            <select
              id="regionId"
              name="regionId"
              className=" border border-[#808A93] rounded-[6px] w-[384px] h-[42px] outline-none "
            >
              <option value="option1">1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          <div>
            <h3 className="block font-firaGo text-[14px] font-medium mb-[5px]">
              ქალაქი
            </h3>
            <select
              id="cityId"
              name="cityId"
              className=" border border-[#808A93] rounded-[6px] w-[384px] h-[42px] outline-none "
            >
              <option value="option1">2</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>

        <h2 className=" font-firaGo font-bold text-lg mb-[22px] mt-[101px]">
          ბინის დეტალები
        </h2>

        <div className="flex justify-between mb-[20px]">
          <AddAgentInputFields
            label="ფასი"
            validationMessage="მხოლოდ რიცხვები"
            id="price"
            register={register}
            errors={errors.price}
            watchValue={price}
            required={required}
            width="w-[384px]"
            hight=" h-[42px]"
          />

          <AddAgentInputFields
            label="ფართობი"
            validationMessage="მხოლოდ რიცხვები"
            id="area"
            register={register}
            errors={errors.area}
            watchValue={area}
            required={required}
            width="w-[384px]"
            hight=" h-[42px]"
          />
        </div>

        <div className="mb-[20px]">
          <AddAgentInputFields
            label="საძინებლების რაოდენობა"
            validationMessage="მხოლოდ რიცხვები"
            id="bedrooms"
            register={register}
            errors={errors.bedrooms}
            watchValue={bedrooms}
            required={required}
            width="w-[384px]"
            hight=" h-[42px]"
          />
        </div>

        <div className="mb-[20px]">
          <AddAgentInputFields
            label="აღწერა *"
            validationMessage="მხოლოდ რიცხვები"
            id="description"
            register={register}
            errors={errors.description}
            watchValue={description}
            required={required}
            width="w-full"
            hight="h-[135px]"
          />
        </div>

        <AvatarUpload
          setValue={setValue}
          clearErrors={clearErrors}
          errors={errors}
          register={register}
          id="avatar"
        />

        <div className=" mt-[80px]">
          <h2 className=" font-firaGo font-bold text-lg mb-[22px]">აგენტი</h2>
          <label className="block font-firaGo text-[14px] font-medium mb-[5px]">
            აირჩიე
          </label>
          <select
            id="options"
            name="options"
            className=" border border-[#808A93] rounded-[6px] w-[384px] h-[42px] outline-none "
          >
            <option value="option1">219</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

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
