import reactIcon from "../assets/react.svg";

const quickNav = [
    { label: "Academic", href: "#academic-achievements" },
    { label: "Faculty", href: "#faculty-achievements" },
    { label: "Startup", href: "#startup-achievements" },
    { label: "Milestones", href: "#department-milestones" },
    { label: "NPTEL", href: "#nptel-achievers" },
    { label: "Sports", href: "#sports-achievements" },
];

const cgpaAchievers = [
    { name: "A. Harini", details: "CGPA 9.82 - University Rank Holder in B.Tech IT" },
    { name: "S. Mahesh", details: "CGPA 9.76 - Top performer in Data Structures and AI subjects" },
    { name: "M. Naveen", details: "CGPA 9.68 - Distinction in all core semester papers" },
];

const hackathonWinners = [
    {
        name: "Team ByteBuilders",
        details: "Won 1st Prize in National Smart India Hackathon for an AI-powered campus safety solution.",
    },
    {
        name: "Team CodeNova",
        details: "Secured Runner-Up in State-Level 24hr HackFest for a real-time disaster response app.",
    },
    {
        name: "Team DevSpark",
        details: "Won Best Innovation Award in Inter-College Coding Challenge for a smart healthcare dashboard.",
    },
];

const facultyAchievements = [
    {
        name: "Dr. R. Poonkuzhali",
        details: "Received Best Faculty Excellence Award and published high-impact research in AI and Data Analytics.",
    },
    {
        name: "Dr. C. Nallusamy",
        details: "Delivered invited keynote at international conference and secured an industry-funded cloud research grant.",
    },
    {
        name: "Mr. M. Thilakraj",
        details: "Completed advanced IEEE and AWS certifications and mentored multiple student innovation teams.",
    },
];

const startupAchievements = [
    {
        name: "G. Aathavan - Founder, EduTrack",
        details: "Built a student analytics startup and secured seed support through college incubation center.",
    },
    {
        name: "P. MadhanRaj - Co-Founder, AgriSense",
        details: "Launched an IoT-enabled agri-monitoring startup and won a district-level innovation grant.",
    },
    {
        name: "K. Pradeep - Founder, QuickQueue",
        details: "Developed a smart queue management SaaS product and onboarded pilot customers from local businesses.",
    },
];

const departmentMilestones = [
    "Accreditations / Rankings: NAAC, NBA, and consistent institutional ranking improvements.",
    "Research Labs / Facilities Established: Data Science Lab, Cloud Computing Lab, and Full Stack Development Center.",
    "Major Projects Completed: Smart attendance analytics, adaptive e-learning platform, and campus automation modules.",
    "Collaborations: Tie-ups with industries and foreign universities for research, internships, and innovation programs.",
];

const nptelAchievers = [
    { sno: 1, year: "2024-25", studentName: "KAVISHKA G", prize: "ELITE + SILVER" },
    { sno: 2, year: "2024-25", studentName: "ABISHEK S", prize: "ELITE + SILVER" },
    { sno: 3, year: "2024-25", studentName: "NIKETHA M", prize: "ELITE + SILVER" },
    { sno: 4, year: "2024-25", studentName: "GOKULAKRISHAN G", prize: "ELITE" },
    { sno: 5, year: "2024-25", studentName: "SUJITHA B", prize: "ELITE" },
    { sno: 6, year: "2024-25", studentName: "VARSINI M", prize: "ELITE" },
    { sno: 7, year: "2024-25", studentName: "GOWSHIKA M", prize: "ELITE" },
    { sno: 8, year: "2024-25", studentName: "SUHITHA S M", prize: "ELITE" },
    { sno: 9, year: "2024-25", studentName: "SUJITHA S", prize: "ELITE" },
    { sno: 10, year: "2024-25", studentName: "MANIKANDAN S", prize: "ELITE" },
    { sno: 11, year: "2024-25", studentName: "RESHMA P M", prize: "ELITE" },
];

const sportsAchievers = [
    {
        sno: 1,
        year: "2023-24",
        eventName: "ANNA UNIVERSITY ZONAL TOURNAMENT",
        eventType: "CHESS COMPETITION",
        studentName: "RISMAN J",
        prize: "III Place",
    },
    {
        sno: 2,
        year: "2023-24",
        eventName: "ANNA UNIVERSITY ZONAL TOURNAMENT",
        eventType: "VOLLEY BALL",
        studentName: "THIYAGARAJAN A",
        prize: "III Place",
    },
    {
        sno: 3,
        year: "2023-24",
        eventName: "ANNA UNIVERSITY ZONAL TOURNAMENT",
        eventType: "KHO-KHO",
        studentName: "TAMILSELVAN S",
        prize: "III Place",
    },
    {
        sno: 4,
        year: "2023-24",
        eventName: "ANNA UNIVERSITY ZONAL TOURNAMENT",
        eventType: "KHO-KHO",
        studentName: "YOGESH M",
        prize: "III Place",
    },
    {
        sno: 5,
        year: "2023-24",
        eventName: "K.S.Rangasamy College of Technology",
        eventType: "CHESS COMPETITION",
        studentName: "SRIMUN S S",
        prize: "I Place",
    },
    {
        sno: 6,
        year: "2023-24",
        eventName: "K.S.Rangasamy College of Technology",
        eventType: "CHESS COMPETITION",
        studentName: "Akshaya K P",
        prize: "II Place",
    },
    {
        sno: 7,
        year: "2023-24",
        eventName: "ANNA UNIVERSITY ZONAL TOURNAMENT",
        eventType: "VOLLEY BALL",
        studentName: "PRANEESH K J",
        prize: "III Place",
    },
    {
        sno: 8,
        year: "2023-24",
        eventName: "ANNA UNIVERSITY ZONAL TOURNAMENT",
        eventType: "CRICKET",
        studentName: "HARIBASKAR R, LOGAVASIGARAN V, ABHINAV A",
        prize: "I Place",
    },
    {
        sno: 9,
        year: "2023-24",
        eventName: "ANNA UNIVERSITY INTER ZONAL TOURNAMENT",
        eventType: "CRICKET",
        studentName: "HARIBASKAR R, LOGAVASIGARAN V, ABHINAV A",
        prize: "III Place",
    },
    {
        sno:   10,
        year: "2023-24",
        eventName: "ANNA UNIVERSITY ZONAL TOURNAMENT",
        eventType: "KHO-KHO",
        studentName: "MANOJ S",
        prize: "III Place",
    },
    {
        sno: 11,
        year: "2023-24",
        eventName: "ANNA UNIVERSITY ZONAL TOURNAMENT",
        eventType: "VOLLEY BALL",
        studentName: "KARI VIKASHINI G, IYLIN ROSIYA K",
        prize: "III Place",
    },
    {
        sno: 12,
        year: "2023-24",
        eventName: "ANNA UNIVERSITY ZONAL TOURNAMENT",
        eventType: "BADMINTON",
        studentName: "IYLIN ROSIYA K",
        prize: "II Place",
    },
    {
        sno: 13,
        year: "2023-24",
        eventName: "ANNA UNIVERSITY ZONAL TOURNAMENT",
        eventType: "VOLLEY BALL",
        studentName: "GOWSHIKA R S",
        prize: "III Place",
    },
];

function AchievementList({ items }) {
    return (
        <ul className="mt-5 space-y-3">
            {items.map((item) => (
                <li key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700 sm:text-base">
                    {item}
                </li>
            ))}
        </ul>
    );
}

function NameCardList({ items }) {
    return (
        <div className="mt-5 space-y-3">
            {items.map((item) => (
                <article key={item.name} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <h3 className="text-base font-bold text-slate-800 sm:text-lg">{item.name}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-700 sm:text-base">{item.details}</p>
                </article>
            ))}
        </div>
    );
}

function ReactImagePanel({ align = "left", title }) {
    return (
        <div
            className={`rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-orange-50 p-6 shadow-sm ${align === "right" ? "lg:order-2" : ""
                }`}
        >
            <div className="flex flex-col items-center justify-center text-center">
                <div className="rounded-full border border-cyan-200 bg-cyan-50 p-8 shadow-inner">
                    <img src={reactIcon} alt={`${title} visual`} className="h-28 w-28 sm:h-36 sm:w-36" />
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-600">{title}</p>
                <p className="mt-2 text-xs text-slate-500 sm:text-sm">Technology-driven excellence and innovation highlights</p>
            </div>
        </div>
    );
}

function NptelAchieversTable() {
    return (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[760px] border-collapse">
                <thead>
                    <tr className="bg-[#001f54] text-left text-white">
                        <th className="border border-slate-300 px-4 py-3 text-sm font-bold uppercase tracking-wide">S.No.</th>
                        <th className="border border-slate-300 px-4 py-3 text-sm font-bold uppercase tracking-wide">Academic Year</th>
                        <th className="border border-slate-300 px-4 py-3 text-sm font-bold uppercase tracking-wide">Student Name</th>
                        <th className="border border-slate-300 px-4 py-3 text-sm font-bold uppercase tracking-wide">Participated / Prize Won</th>
                    </tr>
                    <tr>
                        <th colSpan="4" className="border border-slate-300 bg-slate-100 px-4 py-3 text-center text-xl font-black text-slate-800">
                            Academic Year 2024-25
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {nptelAchievers.map((student) => (
                        <tr key={`${student.sno}-${student.studentName}`} className="odd:bg-white even:bg-slate-50/70">
                            <td className="border border-slate-200 px-4 py-3 text-base font-semibold text-slate-800">{student.sno}</td>
                            <td className="border border-slate-200 px-4 py-3 text-base font-semibold text-slate-800">{student.year}</td>
                            <td className="border border-slate-200 px-4 py-3 text-base font-bold uppercase tracking-wide text-slate-800">{student.studentName}</td>
                            <td className="border border-slate-200 px-4 py-3">
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${student.prize === "ELITE + SILVER"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-cyan-100 text-cyan-700"
                                        }`}
                                >
                                    {student.prize}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function SportsAchieversTable() {
    return (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[1120px] border-collapse">
                <thead>
                    <tr className="bg-[#001f54] text-left text-white">
                        <th className="border border-slate-300 px-4 py-3 text-sm font-bold uppercase tracking-wide">S.No.</th>
                        <th className="border border-slate-300 px-4 py-3 text-sm font-bold uppercase tracking-wide">Academic Year</th>
                        <th className="border border-slate-300 px-4 py-3 text-sm font-bold uppercase tracking-wide">Name of the Event</th>
                        <th className="border border-slate-300 px-4 py-3 text-sm font-bold uppercase tracking-wide">Event Type</th>
                        <th className="border border-slate-300 px-4 py-3 text-sm font-bold uppercase tracking-wide">Student Name</th>
                        <th className="border border-slate-300 px-4 py-3 text-sm font-bold uppercase tracking-wide">Participated / Prize Won</th>
                    </tr>
                    <tr>
                        <th colSpan="6" className="border border-slate-300 bg-slate-100 px-4 py-3 text-center text-xl font-black text-slate-800">
                            Sports Achievements - Academic Year 2023-24
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sportsAchievers.map((item) => (
                        <tr key={`${item.sno}-${item.studentName}`} className="odd:bg-white even:bg-slate-50/70">
                            <td className="border border-slate-200 px-4 py-3 text-base font-semibold text-slate-800">{item.sno}</td>
                            <td className="border border-slate-200 px-4 py-3 text-base font-semibold text-slate-800">{item.year}</td>
                            <td className="border border-slate-200 px-4 py-3 text-base font-semibold uppercase tracking-wide text-slate-800">{item.eventName}</td>
                            <td className="border border-slate-200 px-4 py-3 text-base font-semibold uppercase tracking-wide text-slate-800">{item.eventType}</td>
                            <td className="border border-slate-200 px-4 py-3 text-base font-bold uppercase tracking-wide text-slate-800">{item.studentName}</td>
                            <td className="border border-slate-200 px-4 py-3">
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${item.prize === "I Place"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : item.prize === "II Place"
                                                ? "bg-orange-100 text-orange-700"
                                                : "bg-cyan-100 text-cyan-700"
                                        }`}
                                >
                                    {item.prize}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Achievements() {
    return (
        <section className="bg-[#f8fafc] px-4 pb-16 pt-24 sm:px-6 lg:px-10" id="achievements-page">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="rounded-3xl bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-10 text-white shadow-xl sm:px-10">
                    <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Achievements</p>
                    <h1 className="mt-3 text-center text-3xl font-black sm:text-5xl">Department Achievements & Recognition</h1>
                    <p className="mt-4 text-center text-sm leading-7 text-slate-100 sm:text-base">
                        Academic excellence, competition success, faculty impact and public recognition across the IT department.
                    </p>
                </div>

                <div className="sticky top-[72px] z-30 rounded-2xl border border-orange-200 bg-white/95 p-3 shadow-sm backdrop-blur">
                    <div className="flex flex-wrap justify-center gap-2">
                        {quickNav.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>

                <article id="academic-achievements" className="scroll-mt-32 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">1. Academic Achievements</h2>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                        <ReactImagePanel align="left" title="Academic Excellence" />

                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Students with CGPA Greater Than 9.5</h3>
                            <NameCardList items={cgpaAchievers} />

                            <h3 className="mt-6 text-xl font-bold text-slate-800">Hackathon Winners</h3>
                            <NameCardList items={hackathonWinners} />
                        </div>
                    </div>
                </article>

                <article id="faculty-achievements" className="scroll-mt-32 rounded-3xl border border-orange-200 bg-orange-50/30 p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">2. Faculty Achievements</h2>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                        <div>
                            <p className="text-sm leading-7 text-slate-700 sm:text-base">
                                Awards, invited talks, funded projects, and professional recognitions achieved by department faculty.
                            </p>
                            <NameCardList items={facultyAchievements} />
                        </div>

                        <ReactImagePanel align="right" title="Faculty Impact" />
                    </div>
                </article>

                <article id="startup-achievements" className="scroll-mt-32 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">3. Startup Achievements</h2>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                        <ReactImagePanel align="left" title="Startup Success" />

                        <div>
                            <p className="text-sm leading-7 text-slate-700 sm:text-base">
                                Student entrepreneurs from the IT department building products, attracting grants, and creating impact.
                            </p>
                            <NameCardList items={startupAchievements} />
                        </div>
                    </div>
                </article>

                <article id="department-milestones" className="scroll-mt-32 rounded-3xl border border-orange-200 bg-orange-50/30 p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">4. Department Milestones</h2>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                        <div>
                            <p className="text-sm leading-7 text-slate-700 sm:text-base">Department Milestones</p>
                            <AchievementList items={departmentMilestones} />
                        </div>

                        <ReactImagePanel align="right" title="Milestones" />
                    </div>
                </article>

                <article id="nptel-achievers" className="scroll-mt-32 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">5. NPTEL Achievers</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
                        Students are listed in the required order: first <span className="font-bold text-orange-600">Elite + Silver</span>, then
                        <span className="font-bold text-cyan-700"> Elite</span>.
                    </p>
                    <NptelAchieversTable />
                </article>

                <article id="sports-achievements" className="scroll-mt-32 rounded-3xl border border-orange-200 bg-orange-50/30 p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">6. Sports Achievement</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
                        Winners details are presented in tabular format similar to NPTEL achievers, with neat brand-aligned styling.
                    </p>
                    <SportsAchieversTable />
                </article>
            </div>
        </section>
    );
}

export default Achievements;