import ksrlogo from "../assets/KSRCT_LOGO_2.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
    "Our Faculties",
    "About",
    // "Infrastructure",
    "Achievements",
    "Contact",
    "Dashboard",
    "BlogSpot",
]

function Navbar({ activePage, onPageChange }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    const goToHomeSection = (pageKey) => {
        if (location.pathname === "/" && typeof onPageChange === "function") {
            onPageChange(pageKey)
        } else {
            navigate("/", { state: { activePage: pageKey } })
        }
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleNavigation = (item) => {
        if (item === "Our Faculties") {
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

        setMenuOpen(false)
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
                                setMenuOpen(false)
                            }}
                            className="cursor-pointer"
                        >
                            <img src={ksrlogo} alt="KSRCT Logo" />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                        className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/30"
                    >
                        <span className="relative block h-5 w-6">
                            <span
                                className={`absolute left-0 top-0 h-[2px] w-6 bg-white transition-transform duration-300 ${menuOpen ? "translate-y-[8px] rotate-45" : ""}`}
                            />
                            <span
                                className={`absolute left-0 top-[8px] h-[2px] w-6 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
                            />
                            <span
                                className={`absolute left-0 top-4 h-[2px] w-6 bg-white transition-transform duration-300 ${menuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
                            />
                        </span>
                    </button>

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
                                className={`whitespace-nowrap hover:text-white ${(item === "Our Faculties" && activePage === "tutors") ||
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

                <div
                    className={`xl:hidden overflow-hidden border-t border-white/10 bg-slate-800/95 px-6 transition-all duration-300 ${menuOpen ? "max-h-[420px] py-4" : "max-h-0 py-0"}`}
                >
                    <div className="flex flex-col gap-1">
                        {navItems.map((item, index) => (
                            <button
                                key={`mobile-${item}-${index}`}
                                type="button"
                                onClick={() => handleNavigation(item)}
                                style={{
                                    transitionDelay: menuOpen ? `${index * 80}ms` : "0ms",
                                }}
                                className={`origin-left transform rounded-md px-2 py-3 text-left text-sm font-semibold text-gray-100 transition duration-300 ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"} ${(item === "Our Faculties" && activePage === "tutors") ||
                                    (item === "About" && activePage === "about") ||
                                    (item === "Infrastructure" && activePage === "infrastructure") ||
                                    (item === "Achievements" && activePage === "achievements") ||
                                    (item === "Contact" && activePage === "contact") ||
                                    (item === "Dashboard" && activePage === "home") ||
                                    (item === "BlogSpot" && activePage === "blogspot")
                                    ? "text-orange-300"
                                    : "hover:text-white"
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
