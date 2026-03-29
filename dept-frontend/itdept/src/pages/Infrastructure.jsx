import al1 from "../assets/al1.jpg";
import al2 from "../assets/al2.png";
import al3 from "../assets/al3.jpg";
import al4 from "../assets/al4.png";
import isl1 from "../assets/isl1.jpg";
import isl2 from "../assets/isl2.png";
import isl3 from "../assets/isl3.jpg";
import isl4 from "../assets/isl4.jpg";
import sc1 from "../assets/sc1.jpg";
import sc2 from "../assets/sc2.jpeg";
import sc3 from "../assets/sc3.jpeg";
import cr1 from "../assets/cr1.jpg";
import cr2 from "../assets/cr2.jpg";
import cr3 from "../assets/cr3.jpeg";
import dl1 from "../assets/dl1.jpg";
import dl2 from "../assets/dl2.jpg";
import dl3 from "../assets/dl3.jpeg";

const tabs = [
    { label: "Academic Labs", href: "#academic-labs" },
    { label: "Industry Supported Labs", href: "#industry-labs" },
    { label: "Conference Halls", href: "#conference-halls" },
    { label: "Class Rooms", href: "#class-rooms" },
    { label: "Library", href: "#library" },
];

const academicLabs = [
    {
        title: "Full Stack Development Laboratory Supported by Aspire Systems",
        area: "14.2 m x 8.4 m",
        incharge: "Mr.Dinesh Kumar R.T., M.Tech., AP /IT",
    },
    {
        title: "Software Testing Laboratory Supported by Virtusa",
        area: "14.2 m x 8.4 m",
        incharge: "Mr.Saravanan K M.E., AP /IT",
    },
    {
        title: "Robotic Process Automation Laboratory Supported by UiPath",
        area: "21.5 m x 12.8 m",
        incharge: "Mr.Saravanan K M.E., AP /IT",
    },
    {
        title: "Project / Product Development Laboratory",
        area: "21.5 m x 12.8 m",
        incharge: "Ms.Dhivya V.P M.E., AP /IT",
    },
];

const industryLabs = [
    {
        title: "Research Laboratory",
        area: "21.5 m x 12.8 m",
        incharge: "Mr.Saravanan K M.E., AP /IT",
    },
    {
        title: "Data Science Laboratory",
        area: "21.5 m x 12.8 m",
        incharge: "Dr. Chithra R, M.E., Ph.D ASP/IT",
    },
    {
        title: "Shine Learning Center Supported by Aspire Systems",
        area: "14.2 m x 8.4 m",
        incharge: "Ms. Sathiya Priya N, M.E., AP/IT",
    },
    {
        title: "Digital Skilling Center",
        area: "14.2 m x 8.4 m",
        incharge: "Dr. Nallusamy C, M.E., Ph.D. ASP/IT",
    },
];

const conferenceHalls = [
    {
        title: "Seminar / Conference Hall",
        details: "Modern hall facility for symposiums, technical talks, and department events.",
    },
    // {
    //     title: "Seminar / Conference Hall",
    //     details: "AV-enabled hall for guest lectures, placements sessions, and workshops.",
    // },
    // {
    //     title: "Seminar / Conference Hall",
    //     details: "Seating Capacity: 240",
    // },
];

const classRooms = [
    {
        title: "Tutorial Hall",
        details: "Area Size: 7.9 m x 10.2 m",
    },
    {
        title: "Classroom",
        details: "Area Size: 7.9 m x 10.2 m",
    },
    {
        title: "Classroom",
        details: "No of classes: 09",
    },
];

const libraryInfo = [
    {
        title: "Department Library",
        details: "Area Size: 7.9 m x 10.2 m",
    },
    {
        title: "Department Library",
        details: "Area Size: 7.9 m x 10.2 m",
    },
    {
        title: "Department Library",
        details: "Dedicated reading and reference support for IT students and researchers.",
    },
];

function InfoCard({ title, lineOne, lineTwo }) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md">
            <h4 className="text-lg font-bold text-slate-800">{title}</h4>
            {lineOne && <p className="mt-2 text-sm text-slate-700">{lineOne}</p>}
            {lineTwo && <p className="mt-1 text-sm text-slate-700">{lineTwo}</p>}
        </article>
    );
}

function ImageStrip({ images }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((image, index) => (
                <div key={`${image.alt}-${index}`} className="overflow-hidden rounded-2xl">
                    <img src={image.src} alt={image.alt} className="h-52 w-full object-cover" />
                </div>
            ))}
        </div>
    );
}

function Infrastructure() {
    return (
        <section className="bg-[#f8fafc] px-4 pb-16 pt-24 sm:px-6 lg:px-10" id="infrastructure-page">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="rounded-3xl bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-10 text-white shadow-xl sm:px-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300 text-center
                    ">Infrastructure</p>
                    <h1 className="mt-3 text-3xl font-black sm:text-5xl text-center">Department Infrastructure</h1>
                    <p className="mt-4 max-w-7xl text-sm leading-7 text-slate-100 sm:text-base text-center">
                        Academic Labs, Industry Supported Labs, Conference Halls, Class Rooms and Department Library designed for complete IT learning.
                    </p>
                </div>

                <div className="sticky top-[72px] z-30 rounded-2xl border border-orange-200 bg-white/95 p-3 shadow-sm backdrop-blur">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {tabs.map((item) => (
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

                <article id="academic-labs" className="scroll-mt-32 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Academic Laboratory</h2>
                    <ImageStrip
                        images={[
                            { src: al1, alt: "Academic lab 1" },
                            { src: al2, alt: "Academic lab 2" },
                            { src: al3, alt: "Academic lab 3" },
                            { src: al4, alt: "Academic lab 4" },
                        ]}
                    />
                    <div className="grid gap-4 lg:grid-cols-2">
                        {academicLabs.map((lab) => (
                            <InfoCard
                                key={lab.title}
                                title={lab.title}
                                lineOne={`Area: ${lab.area}`}
                                lineTwo={`Lab Incharge - Faculty & staff: ${lab.incharge}`}
                            />
                        ))}
                    </div>
                </article>

                <article id="industry-labs" className="scroll-mt-32 space-y-5 rounded-3xl border border-orange-200 bg-orange-50/30 p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Industry Supported Laboratory</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[isl1, isl2, isl3, isl4].map((src, index) => (
                            <div key={index} className="overflow-hidden rounded-2xl border border-orange-200">
                                <img src={src} alt={`Industry lab ${index + 1}`} className="h-52 w-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                        {industryLabs.map((lab) => (
                            <InfoCard
                                key={lab.title}
                                title={lab.title}
                                lineOne={`Area: ${lab.area}`}
                                lineTwo={`Lab Incharge - Faculty & staff: ${lab.incharge}`}
                            />
                        ))}
                    </div>
                </article>

                <article id="conference-halls" className="scroll-mt-32 grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1.2fr,1fr]">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Seminar / Conference Hall</h2>
                        {conferenceHalls.map((hall, index) => (
                            <InfoCard key={`${hall.title}-${index}`} title={hall.title} lineOne={hall.details} />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        <div className="overflow-hidden rounded-2xl">
                            <img src={sc1} alt="Conference hall 1" className="h-56 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-2xl">
                            <img src={sc2} alt="Conference hall 2" className="h-56 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-2xl">
                            <img src={sc3} alt="Conference hall 3" className="h-56 w-full object-cover" />
                        </div>
                    </div>
                </article>

                <article id="class-rooms" className="scroll-mt-32 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Class Rooms</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="overflow-hidden rounded-2xl">
                            <img src={cr1} alt="Tutorial hall" className="h-56 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-2xl">
                            <img src={cr2} alt="Class room" className="h-56 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-2xl">
                            <img src={cr3} alt="Classroom block" className="h-56 w-full object-cover" />
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {classRooms.map((room, index) => (
                            <InfoCard key={`${room.title}-${index}`} title={room.title} lineOne={room.details} />
                        ))}
                    </div>
                </article>

                <article id="library" className="scroll-mt-32 space-y-5 rounded-3xl border border-orange-200 bg-orange-50/30 p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Department Library</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="overflow-hidden rounded-2xl border border-orange-200">
                            <img src={dl1} alt="Library view 1" className="h-56 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-orange-200">
                            <img src={dl2} alt="Library view 2" className="h-56 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-orange-200">
                            <img src={dl3} alt="Library view 3" className="h-56 w-full object-cover" />
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {libraryInfo.map((item, index) => (
                            <InfoCard key={`${item.title}-${index}`} title={item.title} lineOne={item.details} />
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Infrastructure;
