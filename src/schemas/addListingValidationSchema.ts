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

  description: yup
    .string()
    .required("Description is required")
    .test(
      "min-words",
      "Description must contain at least 5 words.",
      function (value) {
        if (!value) return false;

        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 5;
      }
    ),

  cityId: yup.number().required(),
  postalCode: yup.string().required("Postal code is required").matches(/^\d+$/),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number")
    .integer("Price must be an integer"),
  area: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number")
    .integer("Price must be an integer"),
  bedrooms: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number")
    .integer("Price must be an integer"),
  isRental: yup.number().required(),
  agentID: yup.number().required(),
});

export default addListingValidationSchema;
