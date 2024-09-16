import * as yup from "yup";

const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;
const phoneValidationRegex = /^5\d{8}$/;

const addAgentValidationSchema = yup.object({
  name: yup
    .string()
    .required("Enter your name")
    .min(2, "must be 4 or more characters"),

  surname: yup
    .string()
    .required("Enter your name")
    .min(2, "must be 4 or more characters"),

  email: yup
    .string()
    .matches(emailValidationRegex, "email must be a valid email")
    .required("Enter your email"),

  phone: yup
    .string()
    .matches(
      phoneValidationRegex,
      "Phone number must start with 5 and be exactly 9 digits long"
    )
    .required("phone is required"),

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
});

export default addAgentValidationSchema;
