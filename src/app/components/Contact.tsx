import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import useWindowSize from "../hooks/useWindowSize";
import { MobileWidthPx } from "../constants";
import clsx from "clsx";
import {
  FaLinkedin,
  FaHackerrank,
  FaMedium,
  FaTwitter,
  FaGithub,
} from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import {
  FieldError,
  FieldErrors,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import { upperFirst } from "../utils/upperFirst";
import Button from "../ui/Button";

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
}

function makeErrorMessage(error: FieldError | undefined, name: string): string {
  if (!error) {
    return "";
  }

  if (error.message) {
    return error.message;
  }

  const upperFirstName = upperFirst(name);

  switch (error.type) {
    case "required":
      return `${upperFirstName} is required`;
    case "pattern":
      return `${upperFirstName} is invalid`;
    default:
      return "Invalid input";
  }
}

function InputField({
  name,
  placeholder,
  register,
  errors,
}: {
  name: keyof ContactFormValues;
  placeholder: string;
  register: UseFormRegisterReturn<keyof ContactFormValues>;
  errors: FieldErrors<ContactFormValues>;
}): JSX.Element {
  const error = errors[name];
  const errorMessage = makeErrorMessage(error, name);
  return (
    <span className="relative">
      <input
        {...register}
        // italic text
        className="p-2 mx-2 border-b-1 border-gray-500 text-center focus:outline-none italic font-semibold"
        placeholder={placeholder}
      />
      {error && (
        <span className="text-red-500 text-sm absolute left-[35%] -bottom-8 z-10">
          {errorMessage}
        </span>
      )}
    </span>
  );
}

function FormLine({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <span className="flex items-center justify-center mb-8">{children}</span>
  );
}

function ContactForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>();

  const onSubmit = async (values: ContactFormValues) => {
    console.log({ values });

    const body = JSON.stringify(values);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
          mode: "no-cors",
        }
      );

      console.log({ response });
    } catch (e) {
      console.error(e);
      alert("Failed to submit form. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center text-xl"
    >
      <div className="flex flex-col items-center justify-center mx-8 md:text-4xl text-xl text-center">
        <FormLine>
          <span>
            Hello Nishant, my name is
            <InputField
              name="name"
              placeholder="name"
              errors={errors}
              register={register("name", {
                required: true,
              })}
            />
          </span>
        </FormLine>

        <FormLine>
          <span>I look forward to chatting with you about</span>
        </FormLine>

        <FormLine>
          <InputField
            name="subject"
            placeholder="subject"
            errors={errors}
            register={register("subject", {
              required: true,
            })}
          />
        </FormLine>

        <FormLine>
          <span>
            You can reach me at
            <InputField
              name="email"
              placeholder="email"
              errors={errors}
              register={register("email", {
                required: true,
                validate: (value) => {
                  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!regex.test(value)) {
                    return "Please enter a valid email";
                  }
                  return true;
                },
              })}
            />
            or
            <InputField
              name="phone"
              placeholder="phone"
              errors={errors}
              register={register("phone", {
                required: true,
                validate: (value) => {
                  const regex = /^(?:\d{10}|\+\d{11,12})$/;
                  if (!regex.test(value)) {
                    return "Please enter a valid phone number";
                  }
                  return true;
                },
              })}
            />
          </span>
        </FormLine>
      </div>

      <Button type="submit">{isSubmitting ? "Submitting..." : "Submit"}</Button>
    </form>
  );
}

function Contact(): JSX.Element {
  const windowSize = useWindowSize();
  const verticalMargins =
    windowSize.width > MobileWidthPx ? windowSize.height * 0.15 : 64;

  return (
    <div
      className="flex flex-col justify-center"
      style={{ marginBottom: verticalMargins }}
    >
      <SectionHeading
        marginTop={verticalMargins}
        marginBottom={verticalMargins}
      >
        GET IN TOUCH
      </SectionHeading>

      <ContactForm />
    </div>
  );
}

export default Contact;
