import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Instagram,
    Facebook,
    Linkedin,
    Twitter,
    Send,
    Users
} from "lucide-react";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const FORM_ENDPOINT = "https://formspree.io/f/mnjjjwkb";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alert("Message sent successfully! Our team will contact you soon.");
                setForm({ name: "", email: "", message: "" });
            }
            else {
                alert("Failed to send message. Please try again.");
            }
        }
        catch (err) {
            alert("⚠️ Network error. Please check your connection.");
        }
    };


    return (
        <main className="min-h-screen bg-gradient-to-br from-[#071a33] to-[#020b18] text-white overflow-hidden">


            <section className="min-h-[100vh] flex flex-col justify-center items-center text-center px-4 sm:px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-orange-400"
                >
                    Contact IT Department
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-300 mt-6 max-w-2xl text-base sm:text-lg"
                >
                    Reach out to our faculty and staff for admissions, academic inquiries, and technical support.
                </motion.p>

                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="mt-16 text-orange-400 text-xl"
                >
                    ↓ Scroll to Explore ↓
                </motion.div>
            </section>


            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid md:grid-cols-3 gap-6 sm:gap-10">
                {[
                    { icon: Phone, title: "Phone", value: "+91 98428 90256" },
                    { icon: Mail, title: "Email", value: "itdept@ksrct.in" },
                    { icon: MapPin, title: "Location", value: "Siliconvalley Campus, Tiruchengode" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        className="bg-[#0b2a55] rounded-2xl p-6 sm:p-8 shadow-xl border-t-4 border-orange-400"
                    >
                        <item.icon size={40} className="text-orange-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-300">{item.value}</p>
                    </motion.div>
                ))}
            </section>


            <section className="px-4 sm:px-6 pb-16 sm:pb-24">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto overflow-hidden rounded-3xl border-4 border-orange-400 shadow-2xl"
                >
                    <iframe
                        title="IT Department Location"
                        className="w-full h-[300px] sm:h-[420px] md:h-[450px]"
                        src="https://maps.google.com/maps?q=tiruchengode&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    />
                </motion.div>
            </section>


            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-24 grid md:grid-cols-2 gap-10 sm:gap-16 items-center">


                <motion.div
                    initial={{ x: -120, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-6">
                        Send Us a Message
                    </h2>
                    <p className="text-gray-300 mb-10">
                        Have questions about admissions, courses, or research opportunities?
                        Our team responds within 24 hours.
                    </p>

                    <div className="flex gap-5">
                        {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                            <motion.button
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                key={i}
                                className="p-4 rounded-xl bg-[#0b2a55] hover:bg-orange-400 hover:text-black transition"
                            >
                                <Icon />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>


                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ x: 120, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="bg-white text-black rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
                >
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                        className="w-full border px-4 py-3 rounded-lg"
                    />

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Your Email"
                        className="w-full border px-4 py-3 rounded-lg"
                    />

                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Your Message"
                        className="w-full border px-4 py-3 rounded-lg"
                    />

                    <button
                        className="w-full flex justify-center items-center gap-2
                       bg-orange-400 hover:bg-orange-500
                       font-semibold py-3 rounded-lg transition"
                    >
                        <Send size={18} /> Send Message
                    </button>
                </motion.form>
            </section>


            <section className="bg-[#071a33] py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-10 sm:mb-14 flex justify-center items-center gap-2">
                        <Users /> Contact Team
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 sm:gap-10">
                        {[
                            { name: "Dr.R.Poonguzhali", role: "HOD - IT Department" },
                            { name: "Prof. Nithya", role: "Vice HOD - IT Department" },
                            { name: "Asst. Prof. Arulmurugan", role: "Admissions Coordinator" }
                        ].map((member, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10, scale: 1.05 }}
                                initial={{ opacity: 0, y: 80 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-[#0b2a55] rounded-2xl p-8 shadow-xl border-b-4 border-orange-400"
                            >
                                <div className="w-20 h-20 mx-auto rounded-full bg-orange-400 mb-4" />
                                <h3 className="font-semibold">{member.name}</h3>
                                <p className="text-gray-300 text-sm mt-2">
                                    {member.role}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
