import exp from "constants";
import {z} from "zod";

interface FormData {
    lastname:string;
    name:string;
    email:string;
    mobile:number;
    password:string;
    confirmPassword:string;
}

export const signUpSchema = z.object({

    email: z
      .string()
      .min(1, "Please enter your Email.")
      .email("Invalid email address."),
    name: z
      .string()
      .min(1, "Please enter your Name.")
      .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces."),
    lastname: z
      .string()
      .min(1, "Please enter your Last Name.")
      .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces."),

    password: z
      .string()
      .min(1, "Please enter your Password.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]+$/,
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 special character."
      ),
      confirmPassword: z.string().min(1, "Please confirm your Password."),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

 export const signInSchema = z.object({
    email: z
    .string()
    .min(1,"Please enter your Email"),
    password:z
    .string()
    .min(1,"Please enter your Passworddd"),
  })


  export const editProfileSchema=z.object({
    
  })