import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    "For Renters": [
      { name: "Browse Properties", path: "#" },
      { name: "Search by Location", path: "#" },
      { name: "Rental Guides", path: "#" },
      { name: "FAQs", path: "#" },
    ],
    "For Owners": [
      { name: "List Property", path: "#" },
      { name: "Pricing", path: "#" },
      { name: "Manager Resources", path: "#" },
      { name: "Success Stories", path: "#" },
    ],
    Company: [
      { name: "About Us", path: "#" },
      { name: "Contact", path: "#" },
      { name: "Privacy Policy", path: "#" },
      { name: "Terms of Service", path: "#" },
    ],
  };
  const socialLinks = [
    { icon: <FaFacebookF />, color: "bg-blue-600" },
    { icon: <FaTwitter />, color: "bg-sky-500" },
    { icon: <FaInstagram />, color: "bg-pink-600" },
    { icon: <FaLinkedinIn />, color: "bg-blue-700" },
  ];
  return (
    <footer className="bg-[#0B1120] text-gray-400 dynamic-Padding">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏠</span>
              <span className="text-white text-2xl font-bold tracking-tight">
                RentEase
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Making rental housing simple, transparent, and accessible for
              everyone.
            </p>

            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 hover:${social.color} text-white transition-all duration-300 transform hover:-translate-y-1`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-white font-bold tracking-wide">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.path}
                      className="text-sm hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-800/50 text-center">
          <p className="text-xs tracking-widest text-gray-500">
            © {new Date().getFullYear()} RentEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
