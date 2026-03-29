import { useState } from "react";
import admissionImage from "../assets/admission.jpeg";
import "./ApplyAdmission.css";

const programOptions = [
  "B.Tech Information Technology",
  "B.Tech Computer Science",
  "B.Tech Computer Science & AI",
  "B.Tech Computer Science & Cyber Security",
  "M.Tech Information Technology",
];

function ApplyAdmission() {
  const [formData, setFormData] = useState({
    fullName: "",
    parentName: "",
    email: "",
    mobile: "",
    program: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, _subject: "New Admission Application", _replyto: formData.email }),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ fullName: "", parentName: "", email: "", mobile: "", program: "" });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <section className="admission-section flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-12 bg-gray-100">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="admission-content flex flex-col justify-center space-y-6 order-1">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 admission-reveal animate-fadeIn">

              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6b35]">Apply Now</p>
                <h2 className="mt-2 text-3xl font-black text-gray-900 sm:text-4xl">Short Admission Form</h2>
                <p className="mt-1 text-sm text-gray-700">Fill your details and our team will contact you.</p>
              </div>

              {["fullName", "parentName", "email", "mobile"].map((field, index) => (
                <div key={field} className="admission-reveal animate-fadeIn" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                  <label className="block text-sm font-semibold text-gray-800">
                    {field === "fullName" ? "Full Name *" :
                     field === "parentName" ? "Parent / Guardian Name *" :
                     field === "email" ? "Email Address *" : "Mobile Number *"}
                  </label>
                  <input
                    type={field === "email" ? "email" : field === "mobile" ? "tel" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="admission-input mt-2 w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition shadow-sm hover:shadow-md"
                    placeholder={field === "fullName" ? "Your full name" : field === "parentName" ? "Parent/guardian name" : field === "email" ? "you@example.com" : "10-digit mobile number"}
                  />
                </div>
              ))}

              <div className="admission-reveal animate-fadeIn" style={{ animationDelay: "0.35s" }}>
                <label className="block text-sm font-semibold text-gray-800">Program Applying *</label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className="admission-input mt-2 w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-900 focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition shadow-sm hover:shadow-md"
                >
                  <option value="">Select a program</option>
                  {programOptions.map((prog) => <option key={prog} value={prog}>{prog}</option>)}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="admission-btn w-full rounded-lg bg-gradient-to-r from-[#005bbb] to-[#0b74dd] px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-70 mt-4"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          ) : (
            <div className="admission-reveal space-y-6 animate-fadeIn text-left">
              <div className="p-6 text-center lg:text-left">
                <div className="mb-2 text-4xl text-green-600">✓</div>
                <h2 className="text-2xl font-black text-gray-900">Thank You!</h2>
                <p className="mt-1 text-sm text-gray-700">Our team will contact you soon.</p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full rounded-lg border-2 border-[#005bbb] px-6 py-3 font-bold text-[#005bbb] hover:bg-[#005bbb]/10 transition"
              >
                Submit Another Application
              </button>
            </div>
          )}
        </div>

        <div className="admission-image-container order-2 relative h-[300px] w-full rounded-3xl overflow-hidden shadow-2xl sm:h-[400px] lg:h-[500px] admission-reveal animate-fadeIn" style={{ animationDelay: "0.12s" }}>
          <img src={admissionImage} alt="College Admission" className="h-full w-full object-cover rounded-3xl transform transition-transform duration-500 hover:scale-105"/>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/25 to-transparent" />
        </div>

      </div>
    </section>
  );
}

export default ApplyAdmission;