import PlusCircle from "../assets/plus-circle.png";
import deleteIcon from "../assets/deleteIcon.png";
import React, { useRef, useState } from "react";

interface AvatarUploadTypes {
  setValue: any;
  clearErrors: any;
  errors: any;
  register: any;
}

const AvatarUpload: React.FC<AvatarUploadTypes> = ({
  setValue,
  clearErrors,
  errors,
  register,
}) => {
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setValue("avatar", file);
      clearErrors("avatar");
    }
  };
  const deleteAvatarHandleClick = () => {
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
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
      {errors.avatar && (
        <p className="font-firaGo text-[14px] font-normal text-textRed absolute">
          {errors.avatar.message}
        </p>
      )}
    </div>
  );
};

export default AvatarUpload;
