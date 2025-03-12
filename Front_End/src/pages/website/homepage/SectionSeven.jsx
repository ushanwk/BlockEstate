import {useState} from "react";

export const SectionSeven = () => {

    const testimonials = [
        {
            name: "James Mitchell",
            role: "Real Estate Investor",
            text: "BlockEstate has completely changed the way I invest in properties. The seamless blockchain transactions and passive income model make it a game-changer!",
            img: "https://i.pravatar.cc/45"
        },
        {
            name: "Sophia Reynolds",
            role: "Home Buyer",
            text: "Finding my dream property has never been easier! The platform is intuitive, secure, and filled with top-tier listings from trusted agencies.",
            img: "https://i.pravatar.cc/40"
        },
        {
            name: "Daniel Carter",
            role: "Estate Agency Owner",
            text: "As an estate agency, working with BlockEstate has been fantastic. The approval process ensures only verified agencies list properties, maintaining quality and trust.",
            img: "https://i.pravatar.cc/50"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-16 bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)] flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Side - Title and Description */}
                <div className="text-center lg:text-left flex items-center flex-col lg:items-start">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">What Our Clients Say</h1>
                    <p className="text-gray-500 dark:text-gray-300 mt-4 text-sm sm:text-base">
                        Real experiences from satisfied property owners & investors. See why our clients trust BlockEstate.
                    </p>
                    <div className="w-16 h-[2px] bg-gray-400 mt-6 dark:bg-white"></div>
                </div>

                {/* Right Side - Testimonial Slider */}
                <div className="relative bg-white dark:bg-[var(--color-dark-bg-primary)] shadow-md p-6 sm:p-8 rounded-lg">

                    {/* Testimonial Content */}
                    <p className="text-gray-700 dark:text-gray-200 text-base sm:text-lg text-center">{testimonials[currentIndex].text}</p>

                    {/* User Info */}
                    <div className="flex items-center justify-center mt-6">
                        <img
                            src={testimonials[currentIndex].img}
                            alt={testimonials[currentIndex].name}
                            className="w-12 h-12 rounded-full border-2 border-gray-400"
                        />
                        <div className="ml-4">
                            <p className="text-gray-900 dark:text-white text-lg font-semibold">{testimonials[currentIndex].name}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonials[currentIndex].role}</p>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={prevTestimonial}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
