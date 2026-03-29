const quickNav = [
    { label: "Profile", href: "#profile" },
    { label: "Programmes Offered", href: "#programmes" },
    { label: "Vision & Mission", href: "#vision-mission" },
    { label: "PEOs, POs & PSOs", href: "#outcomes" },
    { label: "Contact", href: "#contact" },
];

const programmes = [
    "B.Tech. Information Technology",
    "M.Tech. Data Science",
    "Ph.D. Information and Communication Engineering",
    "B.Tech. Information Technology",
];

const btechIt = {
    vision:
        "To emerge as an Information Technology knowledge hub by imparting quality education, promoting research and innovation.",
    mission: [
        "To provide holistic education through curriculum update, inspired and experiential learning.",
        "To mould the students as responsible professionals to compete with the emerging global challenges.",
    ],
    peos: [
        "PEO1: Core Competence: Graduates will have core competence in engineering fundamentals and computing to solve hardware and software engineering problems.",
        "PEO2: Successful Career: Graduates will demonstrate successful professional practices in industry, academia and e-governance.",
        "PEO3: Ethics and life-long learning: Graduates will continue to advance in their career through life-long learning with a social and ethical concern.",
    ],
    pos: [
        "PO1: Engineering knowledge: Apply knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to solve complex engineering problems.",
        "PO2: Problem analysis: Identify, formulate, review research literature, and analyze complex engineering problems to reach substantiated conclusions using principles of mathematics, natural sciences, and engineering sciences.",
        "PO3: Design/development of solutions: Design solutions for complex engineering problems and design system components or processes that meet specified needs with consideration for public health, safety, cultural, societal, and environmental factors, including project management and finance.",
        "PO4: Conduct investigations of complex problems: Use research-based knowledge and research methods, including experiment design, data analysis and interpretation, and synthesis of information, to provide valid conclusions.",
        "PO5: Engineering Tool Usage: Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modeling, to complex engineering activities with an understanding of their limitations.",
        "PO6: The Engineer and The World: Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues, and understand responsibilities relevant to engineering practice.",
        "PO7: Ethics: Apply ethical principles and commit to professional ethics, responsibilities, and norms of engineering practice.",
        "PO8: Individual and team work: Function effectively as an individual, and as a member or leader in diverse teams and in multidisciplinary settings.",
        "PO9: Communication: Communicate effectively with the engineering community and with society at large, through effective reports, presentations, and clear instructions.",
        "PO10: Project management and finance: Demonstrate knowledge and understanding of management and financial principles and apply these to one's own work as a member and leader in a team, to manage projects in multidisciplinary environments.",
        "PO11: Life-long learning: Recognize the need for, and have the preparation and ability to engage in, independent and lifelong learning in the broadest context of technological change.",
    ],
    psos: [
        "PSO1: Develop IT infrastructure: Develop suitable IT infrastructure in diverse domains through acquired foundation skills and knowledge.",
        "PSO2: Design / Develop software products: Apply necessary tools and methodologies to design and develop software products.",
        "PSO3: Innovative Career: Create a zest for innovative career path through value-based software courses and entrepreneurial skills resulting in competent IT solution providers.",
    ],
};

const mtechDs = {
    vision:
        "To emerge as an Information Technology knowledge hub by imparting quality education, promoting research and innovation.",
    mission: [
        "To provide holistic education through curriculum update, inspired and experiential learning.",
        "To Mold the students as responsible professionals to compete with the emerging global challenges.",
    ],
    peos: [
        "PEO1: Core Competence: Graduates will demonstrate their technical skills and competency in various applications through the use of Data Science.",
        "PEO2: Successful Career: Graduates will establish their knowledge by adopting Data Science technologies to solve the real world problems.",
        "PEO3: Ethics and life-long learning: Graduates will continue to advance in their career through life-long learning with a social and ethical concern.",
    ],
    pos: [
        "PO1: An ability to independently carry out research /investigation and development work to solve practical problems.",
        "PO2: An ability to write and present a substantial technical report/document.",
        "PO3: Students should be able to demonstrate a degree of mastery over the area as per the specialization of the program. The mastery should be at a level higher than the requirements in the appropriate bachelor program.",
        "PO4: Create and develop computer programmes and computer-based systems in the fields of security, web design, and artificial intelligence.",
        "PO5: Demonstrate the impact of the professional engineering solutions in societal and environmental contexts for sustainable development.",
        "PO6: Recognize the need of autonomous, lifelong learning in the context of technological change, and possess the necessary skills and readiness.",
    ],
    psos: [
        "PSO1: Develop IT infrastructure: Develop suitable IT infrastructure in diverse domains through acquired foundation skills and knowledge.",
        "PSO2: Design / Develop software products: Apply necessary tools and methodologies to design and develop software products.",
        "PSO3: Innovative Career: Create a zest for innovative career path through value-based software courses and entrepreneurial skills resulting in competent IT solution providers.",
    ],
};

const contacts = [
    {
        title: "Department HoD",
        name: "Dr.R.Poonkuzhali",
        phone: "95976 12312",
        email: "hodit@ksrct.ac.in",
    },
    {
        title: "Training & Placement Co-ordinator",
        name: "Dr.C.Nallusamy",
        phone: "87542 54805",
        email: "tpit@ksrct.ac.in",
    },
    {
        title: "Alumni Co-ordinator",
        name: "Mr.M.Thilakraj",
        phone: "98428 15665",
        email: "mthilakraj@ksrct.ac.in",
    },
];

function About() {
    return (
        <section className="bg-[#f8fafc] px-4 pb-16 pt-24 sm:px-6 lg:px-10" id="about-page">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="rounded-3xl bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-10 text-white shadow-xl sm:px-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300 text-center">About</p>
                    <h1 className="mt-3 text-3xl font-black sm:text-5xl text-center">Department of Information Technology</h1>
                    <p className="mt-4 max-w-7xl text-sm leading-7 text-slate-100 sm:text-base text-center">
                        Excellence in academics, research, innovation, and industry collaboration since 1998.
                    </p>
                </div>

                <div className="sticky top-[72px] z-30 rounded-2xl border border-orange-200 bg-white/95 p-3 shadow-sm backdrop-blur">
                    <div className="flex flex-wrap gap-2 justify-center">
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

                <article id="profile" className="scroll-mt-32 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Profile</h2>
                    <p className="mt-4 text-base leading-8 text-slate-700">
                        The Department of Information Technology has been successfully functioning since 1998. Department excels in
                        academic performance and also in research activities. Department has signed MOU with leading organizations
                        to bridge the gap between the academics and industry scenario. Department has well experienced and dedicated
                        faculty team to provide quality education to the students and impart IT excellence in them. The lab amenities
                        and experiments are designed to gain parallel growth in theoretical as well as practical skills, keeping in mind
                        the current trends and developments. Department has been recognized as a Research Centre for carrying out
                        research programme under Anna University, Chennai. Department specific Centre for Excellence offers scholars to
                        do their research activities under the guidance of Ph.D. Professors. Faculty members have published more than
                        200 papers in the reputed international journals and conferences. The major research areas include Wireless
                        Networks, Data Analytics, Image Processing, Internet of Things, Bioinformatics, Machine Learning, Deep Learning
                        and Cloud Computing. Department of IT aspires to make our technocrats as good citizens of our nation to serve
                        the industry and society constructively.
                    </p>
                </article>

                <article id="programmes" className="scroll-mt-32 rounded-3xl border border-orange-200 bg-orange-50/40 p-6 sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Programmes Offered</h2>
                    <ul className="mt-5 grid gap-3 md:grid-cols-2">
                        {programmes.map((programme, index) => (
                            <li
                                key={`${programme}-${index}`}
                                className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-base font-semibold text-slate-700"
                            >
                                {programme}
                            </li>
                        ))}
                    </ul>
                </article>

                <article id="vision-mission" className="scroll-mt-32 space-y-6">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Vision & Mission</h2>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-orange-500">B.Tech. Information Technology</h3>
                            <h4 className="mt-4 text-lg font-bold text-slate-800">Vision</h4>
                            <p className="mt-2 text-base leading-7 text-slate-700">{btechIt.vision}</p>
                            <h4 className="mt-5 text-lg font-bold text-slate-800">Mission</h4>
                            <ul className="mt-2 space-y-2 text-base leading-7 text-slate-700">
                                {btechIt.mission.map((item) => (
                                    <li key={item}>• {item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-orange-500">M.Tech. Data Science</h3>
                            <h4 className="mt-4 text-lg font-bold text-slate-800">Vision</h4>
                            <p className="mt-2 text-base leading-7 text-slate-700">{mtechDs.vision}</p>
                            <h4 className="mt-5 text-lg font-bold text-slate-800">Mission</h4>
                            <ul className="mt-2 space-y-2 text-base leading-7 text-slate-700">
                                {mtechDs.mission.map((item) => (
                                    <li key={item}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </article>

                <article id="outcomes" className="scroll-mt-32 space-y-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">PEOs, POs & PSOs</h2>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <h3 className="text-xl font-bold text-orange-500">B.Tech. Information Technology</h3>

                        <h4 className="mt-5 text-lg font-bold text-slate-800">Programme Educational Objectives (PEOs)</h4>
                        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                            {btechIt.peos.map((item) => (
                                <li key={item}>• {item}</li>
                            ))}
                        </ul>

                        <h4 className="mt-6 text-lg font-bold text-slate-800">Programme Outcomes (POs)</h4>
                        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                            {btechIt.pos.map((item) => (
                                <li key={item}>• {item}</li>
                            ))}
                        </ul>

                        <h4 className="mt-6 text-lg font-bold text-slate-800">Programme Specific Outcomes (PSOs)</h4>
                        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                            {btechIt.psos.map((item) => (
                                <li key={item}>• {item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-orange-200 bg-orange-50/30 p-6 shadow-sm sm:p-8">
                        <h3 className="text-xl font-bold text-orange-500">M.Tech. Data Science</h3>

                        <h4 className="mt-5 text-lg font-bold text-slate-800">Programme Educational Objectives (PEOs)</h4>
                        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                            {mtechDs.peos.map((item) => (
                                <li key={item}>• {item}</li>
                            ))}
                        </ul>

                        <h4 className="mt-6 text-lg font-bold text-slate-800">Programme Outcomes (POs)</h4>
                        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                            {mtechDs.pos.map((item) => (
                                <li key={item}>• {item}</li>
                            ))}
                        </ul>

                        <h4 className="mt-6 text-lg font-bold text-slate-800">Programme Specific Outcomes (PSOs)</h4>
                        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                            {mtechDs.psos.map((item) => (
                                <li key={item}>• {item}</li>
                            ))}
                        </ul>
                    </div>
                </article>

                <article id="contact" className="scroll-mt-32 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Contact Details</h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {contacts.map((person) => (
                            <div key={person.email} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">{person.title}</p>
                                <h3 className="mt-2 text-lg font-bold text-slate-800">{person.name}</h3>
                                <p className="mt-3 text-sm text-slate-700">📞 {person.phone}</p>
                                <p className="mt-1 text-sm text-slate-700">📧 {person.email}</p>
                            </div>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
}

export default About;
