import ksrlogo from "../assets/KSRCT_LOGO_2.png";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
    "Our Tutors",
    "About",
    "Infrastructure",
    "Achievements",
    "Contact",
    "Dashboard",
    "BlogSpot",
]

function Navbar({ activePage, onPageChange }) {
    const navigate = useNavigate()
    const location = useLocation()

    const goToHomeSection = (pageKey) => {
        if (location.pathname === "/" && typeof onPageChange === "function") {
            onPageChange(pageKey)
        } else {
            navigate("/", { state: { activePage: pageKey } })
        }
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleNavigation = (item) => {
        if (item === "Our Tutors") {
            goToHomeSection("tutors")
            return
        }

        if (item === "About") {
            goToHomeSection("about")
            return
        }

        if (item === "Infrastructure") {
            goToHomeSection("infrastructure")
            return
        }

        if (item === "Achievements") {
            goToHomeSection("achievements")
            return
        }

        if (item === "Contact") {
            goToHomeSection("contact")
            return
        }

        if (item === "Dashboard") {
            goToHomeSection("home")
            return
        }

        if (item === "BlogSpot") {
            navigate("/blogspot/portal")
        }
    }

    return (
        <header className="fixed top-0 left-0 right-0 w-full z-50">
            {/* <div className="h-[3px] w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600" /> */}

            <nav className="w-full bg-gradient-to-b from-slate-700 to-slate-800 shadow-lg">
                <div className="mx-auto flex h-[70px] w-full max-w-[1600px] items-center justify-between px-6 lg:px-14">
                    <div className="flex items-center gap-2 text-[20px] w-[200px] font-black tracking-tight text-white leading-none">
                        {/* <span className="text-red-500">S</span>
                        <span className="text-yellow-300">R</span>
                        <span className="text-red-500">V</span>
                        <span className="ml-2 text-[25px] font-extrabold">Learning</span> */}
                        <button
                            type="button"
                            onClick={() => {
                                goToHomeSection("home")
                            }}
                            className="cursor-pointer"
                        >
                            <img src={ksrlogo} alt="KSRCT Logo" />
                        </button>
                    </div>

                    <div className="hidden items-center gap-10 text-[15px] font-semibold text-gray-100 xl:flex">
                        {/* <button className="inline-flex items-center gap-2 hover:text-white">
                            <span>All Courses</span>
                            <span className="text-[15px]">▼</span>
                        </button> */}

                        {navItems.map((item, index) => (
                            <button
                                key={`${item}-${index}`}
                                type="button"
                                onClick={() => handleNavigation(item)}
                                className={`whitespace-nowrap hover:text-white ${(item === "Our Tutors" && activePage === "tutors") ||
                                    (item === "About" && activePage === "about") ||
                                    (item === "Infrastructure" && activePage === "infrastructure") ||
                                    (item === "Achievements" && activePage === "achievements") ||
                                    (item === "Contact" && activePage === "contact") ||
                                    (item === "Dashboard" && activePage === "home")
                                    || (item === "BlogSpot" && activePage === "blogspot")
                                    ? "text-orange-300"
                                    : ""
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Navbar
