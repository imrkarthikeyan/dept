import ksrlogo from "../assets/KSRCT_LOGO_2.png";
import { useEffect, useState } from "react";
import {
    BookOpen,
    House,
    Info,
    Menu,
    Phone,
    Search,
    Users,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
    "Our Faculties",
    "About",
    "Achievements",
    "Contact",
    "Dashboard",
    "BlogSpot",
]

const mobileQuickItems = [
    { label: "Dashboard", icon: House },
    { label: "Our Faculties", icon: Users },
    { label: "About", icon: Info },
    { label: "Contact", icon: Phone },
    { label: "BlogSpot", icon: BookOpen },
]

function Navbar({ activePage, onPageChange }) {
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname
    const [menuOpen, setMenuOpen] = useState(false)

    const isBlogspotExperienceRoute =
        pathname.includes("blogspot") ||
        pathname === "/portal" ||
        pathname === "/login/student" ||
        pathname === "/login/faculty" ||
        pathname === "/signup/student" ||
        pathname === "/student/blogspot" ||
        pathname === "/faculty/dashboard"

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

    const isItemActive = (item) => {
        if (item === "Our Faculties") return activePage === "tutors"
        if (item === "About") return activePage === "about"
        if (item === "Infrastructure") return activePage === "infrastructure"
        if (item === "Achievements") return activePage === "achievements"
        if (item === "Contact") return activePage === "contact"
        if (item === "Dashboard") return activePage === "home"
        if (item === "BlogSpot") return activePage === "blogspot" || location.pathname.includes("blogspot") || location.pathname.includes("portal")
        return false
    }

    const handleNavigation = (item) => {
        if (item === "Our Faculties") {
            goToHomeSection("tutors")
            setMenuOpen(false)
            return
        }

        if (item === "About") {
            goToHomeSection("about")
            setMenuOpen(false)
            return
        }

        if (item === "Infrastructure") {
            goToHomeSection("infrastructure")
            setMenuOpen(false)
            return
        }

        if (item === "Achievements") {
            goToHomeSection("achievements")
            setMenuOpen(false)
            return
        }

        if (item === "Contact") {
            goToHomeSection("contact")
            setMenuOpen(false)
            return
        }

        if (item === "Dashboard") {
            goToHomeSection("home")
            setMenuOpen(false)
            return
        }

        if (item === "BlogSpot") {
            navigate("/blogspot/portal")
        }

        setMenuOpen(false)
    }

    return (
        <>
            <header className="fixed top-0 left-0 right-0 w-full z-50">
                <nav className="w-full bg-gradient-to-b from-slate-700 to-slate-800 shadow-lg">
                    <div className="hidden xl:flex mx-auto h-[70px] w-full max-w-[1600px] items-center justify-between px-6 lg:px-14">
                        <div className="flex items-center gap-2 text-[20px] w-[200px] font-black tracking-tight text-white leading-none">
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

                        <div className="flex items-center gap-10 text-[15px] font-semibold text-gray-100">
                            {navItems.map((item, index) => (
                                <button
                                    key={`${item}-${index}`}
                                    type="button"
                                    onClick={() => handleNavigation(item)}
                                    className={`whitespace-nowrap hover:text-white ${isItemActive(item) ? "text-orange-300" : ""}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {isBlogspotExperienceRoute ? (
                        <div className="xl:hidden h-[64px] flex items-center gap-3 px-3 sm:px-5">
                            <button
                                type="button"
                                onClick={() => {
                                    goToHomeSection("home")
                                    setMenuOpen(false)
                                }}
                                className="h-10 w-10 shrink-0 rounded-full overflow-hidden border border-white/25"
                                aria-label="Go to dashboard"
                            >
                                <img src={ksrlogo} alt="KSRCT Logo" className="h-full w-full object-cover" />
                            </button>

                            <button
                                type="button"
                                onClick={() => handleNavigation("Dashboard")}
                                className="flex-1 h-10 rounded-full border border-white/20 bg-slate-900/45 px-4 text-left text-sm text-gray-200 inline-flex items-center gap-2"
                                aria-label="Search"
                            >
                                <Search size={16} className="text-gray-300" />
                                <span>Search</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setMenuOpen((prev) => !prev)}
                                aria-label="Open menu"
                                aria-expanded={menuOpen}
                                className="h-10 w-10 shrink-0 rounded-full border border-white/25 inline-flex items-center justify-center"
                            >
                                <Menu size={20} className="text-white" />
                            </button>
                        </div>
                    ) : (
                        <div className="xl:hidden mx-auto flex h-[70px] w-full max-w-[1600px] items-center justify-between px-6 lg:px-14">
                            <div className="flex items-center gap-2 text-[20px] w-[200px] font-black tracking-tight text-white leading-none">
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
                                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/30"
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
                        </div>
                    )}
                </nav>
            </header>

            {isBlogspotExperienceRoute ? (
                <>
                    <div className={`xl:hidden fixed inset-0 z-40 transition ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                        <div
                            onClick={() => setMenuOpen(false)}
                            className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
                        />

                        <aside
                            className={`absolute right-0 top-[64px] h-[calc(100vh-64px)] w-[86%] max-w-[320px] bg-slate-900 text-gray-100 border-l border-white/10 p-5 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
                        >
                            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-300">Menu</h3>
                            <div className="mt-5 flex flex-col gap-2">
                                {navItems.map((item, index) => (
                                    <button
                                        key={`drawer-${item}-${index}`}
                                        type="button"
                                        onClick={() => handleNavigation(item)}
                                        style={{ transitionDelay: menuOpen ? `${index * 70}ms` : "0ms" }}
                                        className={`rounded-lg px-3 py-3 text-left text-sm font-semibold transition duration-300 ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"} ${isItemActive(item) ? "bg-white/10 text-orange-300" : "hover:bg-white/5"}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </aside>
                    </div>

                    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-900 text-gray-300">
                        <div className="grid grid-cols-5 px-1 py-1">
                            {mobileQuickItems.map((item) => {
                                const Icon = item.icon
                                const active = isItemActive(item.label)

                                return (
                                    <button
                                        key={`quick-${item.label}`}
                                        type="button"
                                        onClick={() => handleNavigation(item.label)}
                                        className={`flex flex-col items-center justify-center gap-1 rounded-md py-2 text-[11px] font-medium ${active ? "text-orange-300" : "hover:text-white"}`}
                                    >
                                        <Icon size={18} />
                                        <span>{item.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </>
            ) : (
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
                                className={`origin-left transform rounded-md px-2 py-3 text-left text-sm font-semibold text-gray-100 transition duration-300 ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"} ${isItemActive(item)
                                    ? "text-orange-300"
                                    : "hover:text-white"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
