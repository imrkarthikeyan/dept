import { FiCheckCircle, FiClock, FiUsers } from "react-icons/fi";
import hodMam from "../assets/hod_mam1.webp";
import nithyaMam from "../assets/nithya.webp";
import geethaMam from "../assets/geetha1.webp";
import nallusamySir from "../assets/nallusamy1.webp";
import thilakrajSir from "../assets/thilakraj1.webp";
import saravananSir from "../assets/saravanan1.webp";
import paviMam from "../assets/pavi1.webp";
import rtdSir from "../assets/rtd1.webp";
import arulmuruganSir from "../assets/arulmurugan1.webp";
import dineshSir from "../assets/dinesh1.webp";
import keerthanaMam from "../assets/keerthana1.webp";
import sangeethaMam from "../assets/sangeetha1.webp";
import sadhasivamSir from "../assets/sadasivam1.webp";
import spMam from "../assets/sathiya1.webp";
import mohanSir from "../assets/mohan1.webp";
import hemalathaMam from "../assets/Hemalatha E.webp";

const tutors = [
    {
        name: "Dr.R.Poonkuzhali",
        image: hodMam,
        role: "Head of The Department",
        subjects: ["Data Structures", "DBMS", "Software Engineering"],
        badges: ["UG", "PG", "Research"],
        experience: "18+ yrs",
        students: "5000+",
    },
    {
        name: "Dr.J.Nithya",
        image: nithyaMam,
        role: "Professor",
        subjects: ["Embedded Systems", "Microprocessors",],
        badges: ["UG", "PG", "Research"],
        experience: "22+ yrs",
        students: " 5000+",
    },
    {
        name: "Dr.M.Sangeetha",
        image: sangeethaMam,
        role: "Professor",
        subjects: ["Data Science", "NLP", "Deep Learning"],
        badges: ["Data Science", "NLP", "Research"],
        experience: "19+ yrs",
        students: "5000+",
    },
    {
        name: "Sqn Ldr Dr. V.R.Sadasivam",
        image: sadhasivamSir,
        role: "Professor, NCC Coordinator",
        subjects: ["Data Mining"],
        badges: ["Data Science", "NLP", "Research"],
        experience: "24+ yrs",
        students: "5000+",
    },
    {
        name: "Dr.C.Nallusamy",
        image: nallusamySir,
        role: " Associate Professor, Placement Coordinator",
        subjects: ["Java"],
        badges: ["Networking", "Cloud", "Mentor"],
        experience: "14+ yrs",
        students: "700+",
    },
    {
        name: "Mr.M. Thilak Raj",
        image: thilakrajSir,
        role: "Assistant Professor, Alumni Coordinator",
        subjects: ["AI", "Web Mining"],
        badges: ["AI", "ML", "Python"],
        experience: "12+ yrs",
        students: "640+",
    },
    {
        name: "Ms.S.Geetha",
        image: geethaMam,
        role: "Assistant Professor",
        subjects: ["Machine Learning"],
        badges: ["Frontend", "Backend", "Projects"],
        experience: "11+ yrs",
        students: "620+",
    },
    {
        name: "Mr.K.C. Mohanraj",
        image: mohanSir,
        role: "Assistant Professor",
        subjects: ["Data Science", "NLP", "Deep Learning"],
        badges: ["Data Science", "NLP", "Research"],
        experience: "13+ yrs",
        students: "2000+",
    },
    {
        name: "Mr.K.Saravanan",
        image: saravananSir,
        role: "Assistant Professor",
        subjects: ["Java", "OOP", "Problem Solving"],
        badges: ["Java", "DSA", "Labs"],
        experience: "10+ yrs",
        students: "560+",
    },
    {
        name: "Mr.S.Arulmurugan",
        image: arulmuruganSir,
        role: "Assistant Professor",
        subjects: ["Data Analytics", "R Programming", "Statistics"],
        badges: ["Analytics", "R", "Projects"],
        experience: "44+ yrs",
        students: "1500+",
    },
    {
        name: "Dr.P.Dineshkumar",
        image: dineshSir,
        role: "Assistant Professor",
        subjects: ["Wireless Sensors"],
        badges: ["Networks", "Innovation"],
        experience: "8+ yrs",
        students: "440+",
    },
    {
        name: "Mr.R.T.Dinrshkumar",
        image: rtdSir,
        role: "Assistant Professor",
        subjects: ["Operating Systems", "Compiler Design", "Unix"],
        badges: ["Systems", "Unix", "Mentoring"],
        experience: "4+ yrs",
        students: "1000+",
    },
    {
        name: "Prof. Keerthana",
        image: keerthanaMam,
        role: "Assistant Professor",
        subjects: ["Data Science", "NLP", "Deep Learning"],
        badges: ["Data Science", "NLP", "Research"],
        experience: "8+ yrs",
        students: "430+",
    },
    {
        name: "Ms.N.Sathyapriya",
        image: spMam,
        role: "Assistant Professor",
        subjects: ["Edge Computing"],
        badges: ["Java"],
        experience: "2+ yrs",
        students: "560+",
    },
    {
        name: "Ms.S. Pavithra",
        image: paviMam,
        role: "Assistant Professor",
        subjects: ["Python", "OOP", "Problem Solving"],
        badges: ["Python", "DSA", "Labs"],
        experience: "10+ yrs",
        students: "1000+",
    },
    {
        name: "Ms.E. Hemalatha",
        image: hemalathaMam,
        role: "Assistant Professor",
        subjects: ["Java", "OOP", "Problem Solving"],
        badges: ["Java", "DSA", "Labs"],
        experience: "1+ yrs",
        students: "560+",
    },



];

function OurTutors() {
    return (
        <section id="our-tutors" className="bg-[#f7f5f1] px-4 pb-16 pt-24 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-orange-500 sm:text-base">
                        --our faculties--
                    </p>
                    <h2 className="text-4xl font-black tracking-tight text-slate-800 sm:text-6xl">
                        Meet Your Expert Faculties
                    </h2>
                    <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                        Hand-picked, verified IT department educators who transform complex concepts into clear,
                        confident understanding.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {tutors.map((tutor) => (
                        <article
                            key={tutor.name}
                            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_45px_rgba(2,6,23,0.08)] transition hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(2,6,23,0.14)]"
                        >
                            <div className="relative pb-3">
                                <img src={tutor.image} alt={tutor.name} className="h-[280px] w-full scale-115 bg-slate-100 object-contain object-top" />
                                <div className="absolute bottom-0 left-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                                    <FiCheckCircle className="text-sm" />
                                    Verified Faculty
                                </div>
                            </div>

                            <div className="space-y-4 p-5">
                                <div>
                                    <h3 className="text-3xl font-extrabold tracking-tight text-slate-800">{tutor.name}</h3>
                                    <p className="mt-1 text-sm font-medium text-slate-500">{tutor.role}</p>
                                </div>

                                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-orange-500">
                                    {tutor.subjects.join(", ")}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {tutor.badges.map((badge) => (
                                        <span
                                            key={`${tutor.name}-${badge}`}
                                            className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-6 border-t border-slate-200 pt-4 text-sm text-slate-600">
                                    <p className="inline-flex items-center gap-2">
                                        <FiClock className="text-slate-500" />
                                        <span className="font-semibold text-slate-800">{tutor.experience}</span>
                                        exp.
                                    </p>
                                    <p className="inline-flex items-center gap-2">
                                        <FiUsers className="text-slate-500" />
                                        <span className="font-semibold text-slate-800">{tutor.students}</span>
                                        students
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurTutors;
