import * as yup from "yup";

const addListingValidationSchema = yup.object({
  address: yup.string().required().min(2, "must be 2 or more characters"),

  avatar: yup
    .mixed()
    .required("ფოტოს ატვირთვა სავალდებულოა")
    .test(
      "fileSize",
      "ფაილის ზომა არ უნდა აღემატებოდეს 1 MB-ს",
      (value: any) => {
        return value && value.size <= 1048576;
      }
    ),

  regionId: yup.number().required(),
  description: yup.string().required(),
  cityId: yup.number().required(),
  postalCode: yup.string().required(),
  price: yup.number().required(),
  area: yup.number().required(),
  bedrooms: yup.number().required(),
  isRental: yup.number().required(),
  agentID: yup.number().required(),
});

export default addListingValidationSchema;
