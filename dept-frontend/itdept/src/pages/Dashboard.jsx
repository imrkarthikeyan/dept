import { useMemo, useState } from "react";
import ksrbg from "../assets/ksrbg.jpeg";
import collegeImage from "../assets/ksrcollegeoftec_cover.jpg";

function Dashboard() {
    const [spotlight, setSpotlight] = useState({ x: 50, y: 40 });
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

    const imageTransform = useMemo(
        () =>
            `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.05)`,
        [tilt]
    );

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setSpotlight({ x, y });
    };

    const handleTilt = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setTilt({
            rx: (0.5 - y) * 10,
            ry: (x - 0.5) * 10,
        });
    };

    return (
        <div
            // onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full overflow-hidden text-white"
        >
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${ksrbg})` }}
            />

            <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-gray-900/85 to-black/85" />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.1), transparent 50%)`,
                }}
            />

            <div className="relative z-10 flex min-h-screen items-center px-6 lg:px-16">
                <div className="grid w-full max-w-7xl mx-auto grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-12">

                    <div className="space-y-6 animate-fadeInUp">

                        <p className="text-sm uppercase tracking-widest text-gray-300">
                            Welcome to
                        </p>

                        <h1 className="leading-tight">
                            <span className="block text-lg font-light">
                                Department of
                            </span>

                            <span className="block whitespace-nowrap bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight pr-1">
                                Information Technology
                            </span>
                        </h1>

                        <p className="text-lg text-gray-300 md:text-xl">
                            Empowering Innovation Through Technology
                        </p>

                        <div className="flex flex-wrap gap-4 border-y border-white/10 py-4 text-sm font-semibold">
                            <span className="text-orange-400">🏅 NBA Accredited</span>
                            <span className="text-yellow-400">⭐ NAAC A Grade</span>
                            <span className="text-blue-300">🎓 Anna University</span>
                        </div>

                        <div className="space-y-3 text-sm md:text-base">
                            <div className="flex items-start gap-3">
                                <span>🏆</span>
                                <p>
                                    <span className="font-semibold">
                                        Top Engineering Department
                                    </span>{" "}
                                    – Ranked among best in Tamil Nadu
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <span>⭐</span>
                                <p>
                                    <span className="font-semibold">
                                        Excellence in Academics
                                    </span>{" "}
                                    – Research & Placement
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40">
                                Explore Opportunities
                            </button>

                            <button className="rounded-lg border border-white/70 px-8 py-3 text-sm font-bold backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105">
                                Login Portal
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end animate-fadeIn lg:ml-7 lg:mt-10">
                        <div
                            onMouseMove={handleTilt}
                            onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
                            style={{ transform: imageTransform }}
                            className="relative w-full max-w-xs sm:max-w-sm lg:max-w-[340px] xl:max-w-md"
                        >
                            <div
                                className="overflow-hidden border border-white/20 shadow-2xl backdrop-blur-xl"
                                style={{
                                    clipPath:
                                        "polygon(20% 0%, 80% 5%, 100% 30%, 90% 90%, 60% 100%, 20% 90%, 0% 80%, 5% 20%)",
                                }}
                            >
                                <img
                                    src={collegeImage}
                                    alt="College"
                                    className="w-full h-[320px] sm:h-[380px] xl:h-[420px] object-cover transition duration-500 hover:scale-110"
                                />
                            </div>

                            <div
                                className="absolute -inset-4 bg-blue-500/20 blur-3xl -z-10"
                                style={{
                                    clipPath:
                                        "polygon(20% 0%, 80% 5%, 100% 30%, 90% 90%, 60% 100%, 20% 90%, 0% 80%, 5% 20%)",
                                }}
                            ></div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <style>
                {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.9s ease forwards;
          }

          .animate-fadeIn {
            animation: fadeIn 1.2s ease forwards;
          }
        `}
            </style>
        </div>
    );
}

export default Dashboard;