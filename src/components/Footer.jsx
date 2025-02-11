import { Link } from "react-router-dom";
import { socialLinks } from "../constants";

// Footer component displaying copyright information and social media links
const Footer = () => {
  return (
    <footer className='footer font-poppins'>
      <hr className='border-slate-200' />

      <div className='footer-container'>
        <p className='text-center sm:text-left text-[10px] sm:text-base'>
          © 2025 <strong>Leonardo Georgeto</strong>. All rights reserved.
        </p>

        <div className='flex gap-3 justify-end items-end'>
          {socialLinks.map((link) => (
            <Link key={link.name} to={link.link} target='_blank'>
              <img
                src={link.iconUrl}
                alt={link.name}
                className='w-6 h-6 object-contain'
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;