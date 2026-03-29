import { useMemo, useState } from 'react'
import { FaStar } from 'react-icons/fa'

const alumniReviews = [
    {
        review:
            'Studying at the IT Department gave me a strong practical foundation. The faculty support and hands-on labs prepared me well for real project work.',
        name: 'Karthik M.',
        company: 'TCS - Software Engineer',
    },
    {
        review:
            'The placement guidance and coding culture were excellent. I built confidence in problem solving and teamwork throughout my final year.',
        name: 'Nivetha R.',
        company: 'Infosys - Systems Engineer',
    },
    {
        review:
            'Our department encouraged innovation and hackathons, which helped me grow beyond academics. That experience directly helped in my interviews.',
        name: 'Praveen S.',
        company: 'Zoho - Product Developer',
    },
    {
        review:
            'The curriculum balance between theory and implementation was very useful. I still use many concepts learned during mini and major projects.',
        name: 'Rithika P.',
        company: 'Accenture - Associate Developer',
    },
    {
        review:
            'From communication training to technical mentoring, the department shaped my career path. The faculty always guided us in the right direction.',
        name: 'Arun K.',
        company: 'Wipro - Full Stack Engineer',
    },
    {
        review:
            'I am grateful for the supportive learning environment. The exposure to modern tools and teamwork made my transition to industry smooth.',
        name: 'Divya L.',
        company: 'Cognizant - Programmer Analyst',
    },
    {
        review:
            'The industry-oriented workshops gave me practical clarity. I entered my first job with confidence in both development and collaboration.',
        name: 'Harish V.',
        company: 'HCLTech - Software Developer',
    },
    {
        review:
            'Our alumni mentoring sessions were very motivating. I improved my technical depth and interview skills significantly in my final semester.',
        name: 'Janani B.',
        company: 'Capgemini - Analyst',
    },
    {
        review:
            'The department always promoted consistency and discipline in learning. It helped me build a strong professional mindset early in my career.',
        name: 'Sanjay T.',
        company: 'Tech Mahindra - Cloud Associate',
    },
    {
        review:
            'I appreciated the project review process and faculty feedback. It improved my ability to build clean solutions and present ideas clearly.',
        name: 'Keerthana S.',
        company: 'IBM - Associate Engineer',
    },
    {
        review:
            'The technical clubs and coding events were game changers for me. They gave me practical confidence and leadership experience.',
        name: 'Vignesh R.',
        company: 'LTIMindtree - Data Engineer',
    },
    {
        review:
            'My department experience was truly career-defining. The guidance, discipline, and encouragement helped me become industry-ready.',
        name: 'Monisha N.',
        company: 'Deloitte - Technology Analyst',
    },
]

function WhatOurAlumniesSays() {
    const [showAllReviews, setShowAllReviews] = useState(false)

    const visibleReviews = useMemo(
        () => (showAllReviews ? alumniReviews : alumniReviews.slice(0, 6)),
        [showAllReviews],
    )

    return (
        <section id="alumni-reviews" className="bg-white px-4 py-14 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-center text-3xl font-bold text-slate-800 sm:text-4xl">
                    What Our Alumni <span className="text-orange-500">Says</span>
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {visibleReviews.map((item, index) => (
                        <article
                            key={`${item.name}-${index}`}
                            className="flex min-h-56 flex-col justify-between rounded-lg border border-orange-300 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                            <p className="text-[15px] leading-7 text-slate-700">"{item.review}"</p>

                            <div className="mt-5">
                                <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                                <p className="text-sm font-medium text-gray-500">{item.company}</p>

                                <div className="mt-3 flex items-center gap-1 text-orange-500" aria-label="5 star review">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {!showAllReviews && (
                    <div className="mt-8 text-center">
                        <button
                            type="button"
                            onClick={() => setShowAllReviews(true)}
                            className="rounded-md bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600"
                        >
                            Read All Reviews
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default WhatOurAlumniesSays
