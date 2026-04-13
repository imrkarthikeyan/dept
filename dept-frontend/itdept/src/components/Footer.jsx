import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";
import logo from "../assets/KSRCT_LOGO_2.png";

const quickLinks = [
    "Home",
    "About Department",
    "Faculty",
    "Placements",
    "Admissions",
    "Contact",
    "Accreditation",
];

const socialIcons = [FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaTwitter];

function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-slate-700 to-slate-800 pt-20 text-gray-200">
            <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

            <div className="mx-auto grid max-w-8xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                    <img src={logo} alt="KSRCT" className="h-auto w-32 object-contain sm:w-40" />
                    <div className="hidden h-20 w-[2px] bg-orange-400/40 sm:block" />
                    <div>
                        <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">Department of Information Technology</h3>
                        <p className="text-sm leading-relaxed text-gray-300">
                            Nurturing future IT professionals through innovation, strong academics, and
                            industry-ready learning.
                        </p>
                    </div>
                </div>

                <div>
                    <h4 className="mb-5 text-lg font-semibold text-orange-300">Why Choose IT Department?</h4>
                    <ul className="space-y-3 text-sm text-gray-200">
                        <li>⚡ Industry-Oriented Curriculum</li>
                        <li>💻 Modern Labs and Infrastructure</li>
                        <li>🎓 Experienced Faculty Members</li>
                        <li>📊 Strong Placement Record</li>
                        <li>🌐 Industry Collaboration and Internships</li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-5 text-lg font-semibold text-orange-300">Contact Address</h4>
                    <p className="mb-5 flex gap-3 text-sm leading-relaxed text-gray-200">
                        <FiMapPin className="mt-1 text-orange-300" size={18} />
                        <span>
                            K.S. Rangasamy College of Technology
                            <br />
                            Tiruchengode - 637215
                            <br />
                            Namakkal District, Tamil Nadu, India
                        </span>
                    </p>

                    <h5 className="mb-3 text-base font-semibold text-orange-300">Contact Info</h5>
                    <div className="space-y-2 text-sm text-gray-200">
                        <p className="flex items-center gap-2">
                            <FiPhoneCall className="text-orange-300" />
                            +91 98765 43210
                        </p>
                        <p className="flex items-center gap-2">
                            <HiMail className="text-orange-300" />
                            itdept@ksrct.ac.in
                        </p>
                    </div>
                </div>

                <div>
                    <h4 className="mb-5 text-lg font-semibold text-orange-300">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-gray-200">
                        {quickLinks.map((link) => (
                            <li key={link}>
                                <a href="#" className="transition hover:text-orange-300">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6">
                        <p className="text-sm text-gray-200">
                            NBA Accredited | NAAC 'A' Grade | Affiliated to Anna University
                        </p>
                    </div>

                    <div className="mt-6 flex gap-3">
                        {socialIcons.map((Icon, index) => (
                            <button
                                key={index}
                                className="rounded-lg bg-slate-600 p-2 text-gray-100 shadow-lg transition hover:scale-105 hover:bg-orange-400 hover:text-slate-900"
                                type="button"
                                aria-label="Social media"
                            >
                                <Icon />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-14 border-t border-orange-300/30" />

            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-center text-sm text-gray-300 md:flex-row md:text-left">
                <p>© 2026 IT @ KSRCT. All rights reserved.</p>
                <p>
                    Made with ❤️ by <span className="text-orange-300">IT Department</span>
                </p>
                <p>Privacy Policy | Terms of Service</p>
            </div>
        </footer>
    );
}

export default Footer;
