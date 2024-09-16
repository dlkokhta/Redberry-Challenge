import { useForm } from "react-hook-form";
import AddAgentInputFields from "../components/AddAgentInputFields";
import PlusCircle from "../assets/plus-circle.png";
import Button from "../components/Button";
import axios from "axios";
import addAgentValidationSchema from "../schemas/addAgentValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import deleteIcon from "../assets/deleteIcon.png";

const AddAgent = ({ setIsAgentWindowOpen }: any) => {
  const [required, setRequired] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    clearErrors,
    setValue,
  } = useForm({
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
    formData.append("avatar", data.avatar[0]);

    const url =
      "https://api.real-estate-manager.redberryinternship.ge/api/agents/";
    // const token = "9cfc36ff-e2fb-41a1-95c0-55773a2ca25f";
    // console.log(token);
    const token = "123";

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

  const cancelHandleClick = () => {
    setIsAgentWindowOpen(true);
  };

  const getEmailStrokeColor = () => {
    if (!required && (email === undefined || email === "")) {
      return "#021526";
    } else if (email.match(/^[a-zA-Z0-9._%+-]+@redberry\.ge$/)) {
      return "#45A849";
    } else {
      return "#F93B1D";
    }
  };

  const getPhoneStrokeColor = () => {
    const phoneValidationRegex = /^5\d{8}$/;

    if (!required && (phone === undefined || phone === "")) {
      return "#021526";
    } else if (phone.match(phoneValidationRegex)) {
      return "#45A849";
    } else {
      return "#F93B1D";
    }
  };

  const submitCLickhandler = () => {
    setRequired(true);
  };

  const [imagePreview, setImagePreview] = useState("");

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl); // Show the preview
      setValue("avatar", file); // Set the avatar in the form
      clearErrors("avatar"); // Clear validation error if present
    }
  };
  const deleteAvatarHandleClick = () => {
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
              errors={errors.name?.message}
              watchValue={name}
              required={required}
            />
            <AddAgentInputFields
              label="გვარი"
              validationMessage="მინიმუმ ორი სიმბოლო"
              id="surname"
              register={register}
              errors={errors.surname?.message}
              watchValue={surname}
              required={required}
            />
          </div>
          <div className="flex gap-[31px] mb-7">
            <div>
              <label
                className="block font-firaGo text-[14px] font-medium mb-[5px]"
                htmlFor="email"
              >
                ელ-ფოსტა
              </label>
              <input
                className={`border border-[#808A93] rounded-[6px] w-[384px] h-[42px] outline-none pl-2 ${
                  !required && (email === undefined || email === "")
                    ? "border-textBlack"
                    : email && email.match(/^[a-zA-Z0-9._%+-]+@redberry\.ge$/)
                    ? " border-textGreen"
                    : " border-textRed"
                }`}
                type="text"
                id="email"
                {...register("email")}
                name="email"
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
                      stroke={getEmailStrokeColor()}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3
                  className={`block font-firaGo text-[14px] font-normal ${
                    !required && (email === undefined || email === "")
                      ? "text-textBlack"
                      : email && email.match(/^[a-zA-Z0-9._%+-]+@redberry\.ge$/)
                      ? " text-textGreen"
                      : " text-textRed"
                  }`}
                >
                  გამოიყენეთ @redberry.ge ფოსტა
                </h3>
              </div>
            </div>

            <div>
              <label
                className="block font-firaGo text-[14px] font-medium mb-[5px]"
                htmlFor="phone"
              >
                ტელეფონის ნომერი
              </label>
              <input
                className={`border border-[#808A93] rounded-[6px] w-[384px] h-[42px] outline-none pl-2  ${
                  !required && (phone === undefined || phone === "")
                    ? "border-textBlack"
                    : phone.match(/^5\d{8}$/)
                    ? "border-textGreen"
                    : "border-textRed"
                }`}
                type="text"
                id="phone"
                {...register("phone")}
                name="phone"
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
                      stroke={getPhoneStrokeColor()}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3
                  className={`block font-firaGo text-[14px] font-normal ${
                    !required && (phone === undefined || phone === "")
                      ? "text-textBlack"
                      : phone.match(/^5\d{8}$/)
                      ? "text-textGreen"
                      : "text-textRed"
                  }`}
                >
                  მხოლოდ რიცხვები
                </h3>
              </div>
            </div>
          </div>

          <div>
            <label
              className="block font-firaGo text-[14px] font-medium mb-[5px]"
              htmlFor="avatar"
            >
              ატვირთეთ ფოტო *
            </label>

            <div
              className={`relative border border-dashed border-x-2 border-y-2 rounded-md  w-full ${
                errors.avatar ? "border-textRed" : "border-[#808A93]"
              }  h-[120px] flex justify-center items-center
                `}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Uploaded Preview"
                    className="w-[92px] h-[82px] object-cover rounded-md"
                  />
                  <img
                    className="w-6 cursor-pointer absolute ml-[75px] -mt-[19px]"
                    src={deleteIcon}
                    alt="Upload"
                    onClick={deleteAvatarHandleClick}
                  />
                </div>
              ) : (
                <img className="w-6 " src={PlusCircle} alt="Upload" />
              )}
              <input
                type="file"
                id="avatar"
                {...register("avatar")}
                name="avatar"
                className="absolute inset-0 opacity-0  cursor-pointer ml-[385px] mt-[46px]"
                onChange={onImageChange}
                ref={fileInputRef}
                style={{ width: "24px", height: "24px" }}
              />
            </div>
          </div>
          {errors.avatar && (
            <p className="font-firaGo text-[14px] font-normal text-textRed absolute">
              {errors.avatar.message}
            </p>
          )}
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
