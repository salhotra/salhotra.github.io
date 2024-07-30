import clsx from "clsx";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaHackerrank,
  FaMedium,
} from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import Stars from "./Stars";
import Link from "../ui/Link";

interface LinkProps {
  url: string;
  label: string;
  icon: React.ReactNode;
}

const links: LinkProps[] = [
  {
    url: "https://www.linkedin.com/in/nishantsalhotra",
    label: "LinkedIn",
    icon: <FaLinkedin size={18} />,
  },
  {
    url: "mailto:nsalhotraworkl@gmail.com",
    label: "Mail",
    icon: <IoMdMail size={22} />,
  },
  {
    url: "https://twitter.com/n_salhotra",
    label: "Twitter",
    icon: <FaTwitter size={18} />,
  },
  {
    url: "https://github.com/salhotra",
    label: "GitHub",
    icon: <FaGithub size={18} />,
  },
  {
    url: "https://www.hackerrank.com/profile/nishant_salhotra",
    label: "HackerRank",
    icon: <FaHackerrank size={16} />,
  },
  {
    url: "https://medium.com/@nishant_salhotra",
    label: "Medium",
    icon: <FaMedium size={18} />,
  },
];

function SocialLinkTile({ url, label, icon }: LinkProps): JSX.Element {
  return (
    <Link href={url} className="flex items-center justify-center">
      {icon}
      <span className="ml-2 md:text-xl text-sm py-1">{label}</span>
    </Link>
  );
}

function Footer(): JSX.Element {
  return (
    <footer className="relative w-full bg-spaceblack text-white text-center overflow-hidden">
      <Stars style={{ position: "absolute" }} />
      <div className="flex items-center justify-center flex-wrap flex-row">
        {[
          ...links.map((link) => (
            <div
              key={link.url}
              className={clsx(
                "md:w-auto md:mr-8 w-1/3 h-24 flex items-center justify-center"
              )}
            >
              <SocialLinkTile {...link} />
            </div>
          )),
          <div
            key="copywrite"
            className="w-full h-24 flex items-center justify-end px-8"
          >
            <span className="text-sm">@ 2024 Nishant Salhotra</span>
          </div>,
        ]}
      </div>
    </footer>
  );
}

export default Footer;
