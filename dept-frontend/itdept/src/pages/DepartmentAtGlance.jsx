import { useEffect, useMemo, useRef, useState } from "react";
import {
    FaAward,
    FaBookOpen,
    FaBriefcase,
    FaBuilding,
    FaChalkboardTeacher,
    FaUserGraduate,
} from "react-icons/fa";
import "./DepartmentAtGlance.css";

const metricConfig = [
    { id: "students", icon: FaUserGraduate, label: "Students", value: 500, suffix: "+" },
    { id: "faculty", icon: FaChalkboardTeacher, label: "Faculty", value: 25, suffix: "+" },
    { id: "labs", icon: FaBuilding, label: "Labs", value: 8, suffix: "+" },
    { id: "publications", icon: FaBookOpen, label: "Publications", value: 50, suffix: "+" },
    { id: "placement", icon: FaBriefcase, label: "Placement", value: 90, suffix: "%" },
    { id: "excellence", icon: FaAward, label: "Years of Academic Excellence", value: 32, suffix: "" },
];

function DepartmentAtGlance() {
    const sectionRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);
    const [counts, setCounts] = useState(() =>
        metricConfig.reduce((acc, metric) => {
            acc[metric.id] = 0;
            return acc;
        }, {}),
    );

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.9 },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!hasStarted) {
            return undefined;
        }

        const durationMs = 1800;
        let frameId = 0;
        const start = performance.now();

        const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setCounts(() =>
                metricConfig.reduce((acc, metric) => {
                    acc[metric.id] = Math.round(metric.value * eased);
                    return acc;
                }, {}),
            );

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            }
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [hasStarted]);

    const metrics = useMemo(
        () =>
            metricConfig.map((metric, index) => ({
                ...metric,
                display: `${counts[metric.id] ?? 0}${metric.suffix}`,
                delay: `${index * 0.08}s`,
            })),
        [counts],
    );

    return (
        <section ref={sectionRef} className="dept-glance-section" id="department-at-a-glance">
            <div className="dept-glance-shell">
                {/* <p className="dept-glance-kicker">Section Title</p> */}
                <h2 className="dept-glance-title text-center">
                    Department at a Glance
                </h2>

                <div className="dept-glance-grid">
                    {metrics.map((metric) => (
                        <article key={metric.id} className="dept-glance-card" style={{ animationDelay: metric.delay }}>
                            <div className="dept-glance-icon" aria-hidden="true">
                                <metric.icon />
                            </div>
                            <p className="dept-glance-value">{metric.display}</p>
                            <p className="dept-glance-label">{metric.label}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default DepartmentAtGlance;