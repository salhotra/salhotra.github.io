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

interface LinkProps {
  url: string;
  label: string;
  icon: React.ReactNode;
}

const links: LinkProps[] = [
  {
    url: "https://www.linkedin.com/in/nishantsalhotra",
    label: "LinkedIn",
    icon: <FaLinkedin size={24} />,
  },
  {
    url: "mailto:nsalhotraworkl@gmail.com",
    label: "Mail",
    icon: <IoMdMail size={28} />,
  },
  {
    url: "https://twitter.com/n_salhotra",
    label: "Twitter",
    icon: <FaTwitter size={24} />,
  },
  {
    url: "https://github.com/salhotra",
    label: "GitHub",
    icon: <FaGithub size={24} />,
  },
  {
    url: "https://www.hackerrank.com/profile/nishant_salhotra",
    label: "HackerRank",
    icon: <FaHackerrank size={22} />,
  },
  {
    url: "https://medium.com/@nishant_salhotra",
    label: "Medium",
    icon: <FaMedium size={24} />,
  },
];

function SocialLinkTile({ url, label, icon }: LinkProps): JSX.Element {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center p-4 w-full h-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.2 }}
    >
      {icon}
      <span className="ml-2 text-2xl">{label}</span>
    </motion.a>
  );
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

      <Button
        type="submit"
        className="p-2 my-2 bg-blue-500 text-white rounded-md"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

function Contact(): JSX.Element {
  const windowSize = useWindowSize();
  const headingVerticalMargin =
    windowSize.width > MobileWidthPx ? windowSize.height * 0.15 : 32;

  return (
    <div className="flex flex-col justify-center">
      <SectionHeading
        marginTop={headingVerticalMargin}
        marginBottom={headingVerticalMargin}
      >
        GET IN TOUCH
      </SectionHeading>

      <ContactForm />

      <div
        className="flex items-center justify-center bg-white p-4 flex-wrap"
        style={{ marginTop: headingVerticalMargin }}
      >
        {links.map((link) => (
          <div
            key={link.url}
            className={clsx(
              "lg:w-1/3 w-1/2 h-24 flex items-center justify-center border-t-1"
            )}
          >
            <SocialLinkTile {...link} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
