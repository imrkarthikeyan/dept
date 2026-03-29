

import campusImage from "../assets/whyitimg.jpeg";
import whyitimg1 from "../assets/whyitimg1.jpg";
import whyitimg2 from "../assets/whyitimg2.jpeg";
import whyitimg3 from "../assets/whyitimg3.jpeg";
import whyitimg4 from "../assets/whyitimg4.jpg";
import whyitimg5 from "../assets/whyitimg5.jpg";
import whyitimg6 from "../assets/whyitimg6.png";
import "./WhyIT.css";

const highlights = [
    "Top Ranked IT Department - Among the best in Tamil Nadu",
    "Academic Excellence - Updated curriculum with modern technologies",
    "Modern Labs - AI, Data Science, IoT, Networking, Programming",
    "Experienced Faculty - PhDs and industry-research experts",
    "Placement Success - 90%+ placed in top IT companies",
    "Accreditation - NBA Accredited | NAAC 'A' Grade | Anna University",
    "Student Focused - Mentorship, internships, hackathons, skill-building",
];

const icons = ["🏆", "📚", "💻", "🎓", "💼", "🏅", "👨‍🎓"];

const galleryImages = [
    { src: whyitimg1, alt: "IT department event group photo" },
    { src: whyitimg2, alt: "IT department achievement ceremony" },
    { src: whyitimg3, alt: "IT department award recognition" },
    { src: whyitimg4, alt: "IT department cultural performance" },
    { src: whyitimg5, alt: "IT block campus view" },
    { src: whyitimg6, alt: "IT department corridor" },
];

function WhyIT() {
    return (
        <section
            className="whyit-section flex min-h-screen items-center bg-white px-4 py-16 sm:px-6 lg:px-12"
            id="why-information-technology"
        >
            <div className="mx-auto w-full max-w-7xl space-y-16">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
                    <div className="whyit-image-wrap whyit-reveal" style={{ animationDelay: "0.08s" }}>
                        <img
                            src={campusImage}
                            alt="K.S.Rangasamy College campus"
                            className="whyit-image h-[250px] w-full rounded-3xl border-[5px] border-[#ff6b35] object-cover shadow-lg sm:h-[350px] lg:h-[400px] lg:w-[500px] xl:h-[450px] xl:w-[550px]"
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="whyit-reveal" style={{ animationDelay: "0.14s" }}>
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff6b35]">Discover</p>
                            <h2 className="mt-2 text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-4xl">
                                Why Information Technology?
                            </h2>
                            <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
                                Build future-ready technical skills with strong academics, modern infrastructure, and industry-oriented learning.
                            </p>
                        </div>

                        <ul className="space-y-3">
                            {highlights.map((point, index) => (
                                <li
                                    key={index}
                                    className="whyit-reveal whyit-item flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-700 sm:text-base"
                                    style={{ animationDelay: `${0.2 + index * 0.06}s` }}
                                >
                                    <span className="text-xl leading-none">{icons[index]}</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="whyit-reveal rounded-3xl border border-orange-300 bg-white/95 p-5 shadow-[0_20px_45px_rgba(15,23,42,0.08)] sm:p-8" style={{ animationDelay: "0.2s" }}>
                    <div className="grid items-center gap-6 md:grid-cols-[230px,1fr]">
                        <img
                            src={campusImage}
                            alt="IT department years of excellence"
                            className="h-44 w-full rounded-2xl object-cover shadow-sm"
                        />
                        <div>
                            <h3 className="text-3xl font-extrabold leading-tight text-orange-500 sm:text-4xl">
                                IT - 32+ Years of Excellence
                            </h3>
                            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
                                The IT Department has proudly completed 32+ years of academic excellence and innovation, empowering students with industry-ready technical skills and strong professional values.
                            </p>
                            <p className="mt-4 inline-flex items-center gap-3 text-lg font-semibold text-slate-800">
                                <span className="h-3 w-3 rounded-full bg-orange-500" aria-hidden="true"></span>
                                Expertise Team to Empower Students
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-center text-3xl font-bold text-slate-900 sm:text-5xl">
                        IT @ KSRCT <span className="text-orange-500"> Gallery</span>
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {galleryImages.map((image, index) => (
                            <div
                                key={image.alt}
                                className="whyit-reveal overflow-hidden rounded-[2.2rem]"
                                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className={`w-full object-cover ${index === 0 || index === 1 || index === 2
                                            ? "h-[280px] md:h-[330px]"
                                            : "h-[320px] md:h-[400px]"
                                        }`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyIT;