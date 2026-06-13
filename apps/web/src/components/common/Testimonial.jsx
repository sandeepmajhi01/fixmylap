import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function Testimonial() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const reviews = [
    {
      name: "Alex Johnson",
      role: "Software Engineer",
      text: "Outstanding repair service! My MacBook Pro logic board was declared dead by the official service center, but FixMyLap technicians diagnosed a blown capacitor and fixed it for a fraction of the cost. Truly laboratory-grade expertise.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Freelance Designer",
      text: "Bought a refurbished Lenovo ThinkPad from their store. The laptop looks brand new, runs extremely cool, and the 90-day warranty gave me peace of mind. Excellent customer service and quick reply.",
      rating: 5,
    },
    {
      name: "Marcus Brody",
      role: "Business Manager",
      text: "We use FixMyLap for all our office computer network maintenance. Their 24-hour response time is phenomenal and has saved our business operations multiple times. Highly recommended!",
      rating: 5,
    },
  ];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="bg-[#0c0c0c] py-20 border-t border-gray-900">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Image column */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/15 transform -rotate-3 scale-95 blur-lg rounded-xl" />
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
            alt="Customer review illustration"
            className="w-full h-[400px] object-cover rounded-xl filter brightness-90 grayscale hover:grayscale-0 transition-all duration-700 relative z-10 border border-gray-900 shadow-2xl"
          />
          <div className="absolute -bottom-6 -right-6 bg-primary text-black p-6 rounded-xl hidden md:block z-20 shadow-xl border border-[#25B425]/20">
            <p className="text-3xl font-black">99.4%</p>
            <p className="text-[10px] font-black uppercase tracking-wider mt-1 text-black/80">Customer Satisfaction</p>
          </div>
        </div>

        {/* Right content column */}
        <div className="space-y-6">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Client Feedback</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
            WHAT OUR CLIENTS SAY
          </h2>
          
          <div className="bg-[#111] border border-gray-900 p-8 rounded-xl relative">
            <Quote size={40} className="text-primary/10 absolute top-4 right-4" />
            <div className="flex gap-1 mb-4">
              {[...Array(reviews[currentIdx].rating)].map((_, i) => (
                <Star key={i} size={16} className="text-primary fill-primary" />
              ))}
            </div>
            
            <p className="text-sm italic text-gray-300 leading-relaxed min-h-[100px]">
              "{reviews[currentIdx].text}"
            </p>
            
            <div className="mt-6">
              <p className="text-base font-black text-white">{reviews[currentIdx].name}</p>
              <p className="text-xs text-primary font-semibold">{reviews[currentIdx].role}</p>
            </div>
          </div>

          {/* Slider controls */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 border border-gray-900 bg-[#0e0e0e] text-white flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all rounded-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 border border-gray-900 bg-[#0e0e0e] text-white flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all rounded-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Call us banner */}
      <div className="mt-20 bg-[#111111] py-8 text-center border-y border-gray-900/60">
        <p className="text-sm md:text-lg font-black uppercase text-white tracking-widest">
          Call us for diagnostic help: <span className="text-primary ml-2 font-black">9822186822</span>
        </p>
      </div>
    </section>
  );
}
