import { ArrowRight, Calendar } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      date: "24 December 2024",
      title: "Diagnosing Motherboard Short Circuits",
      desc: "Learn how professional technicians locate microscopic shorts in motherboard traces using thermal cameras and voltage injection methods.",
      // image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=600&q=80",
      image:"https://sparekarts.com/wp-content/uploads/2021/08/laptop-motherboard-repair-1.jpg",
    },
    {
      date: "22 December 2024",
      title: "Why Thermal Paste Replacement Matters",
      desc: "An in-depth study of cooling efficiency over time. Discover why high-performance laptops lose processing power when thermal interfaces degrade.",
      // image: "https://images.unsplash.com/photo-1597872200919-a51192256c5d?auto=format&fit=crop&w=600&q=80",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs1hsjTzRwi_fSSMHHSdCFe9kA9ho42zo5F4dKUWo06w&s=10"
    },
    {
      date: "20 December 2024",
      title: "Understanding Refurbished Grades (A vs B)",
      desc: "Avoid traps when buying pre-owned. We breakdown cosmetic differences, battery health parameters, and hardware warranty details.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
      
    },
  ];

  return (
    <section id="blog" className="py-20 bg-[#050505] border-t border-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-center md:text-left">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Tech Insights</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-1.5 uppercase">
              Recent News &amp; Guides
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-xl">
              Hardware maintenance tips, diagnostic checklists, and buying guides curated by our laboratory engineers.
            </p>
          </div>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3 text-xs font-black tracking-wider rounded-xl transition mt-6 md:mt-0 uppercase">
            Blog Archive
          </button>
        </div>

        {/* Blog Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="bg-[#0e0e0e] border border-gray-900/60 rounded-xl overflow-hidden group hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Zoom */}
              <div className="h-48 overflow-hidden bg-black relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Text Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-semibold mb-2">
                    <Calendar size={13} />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-base font-black text-white group-hover:text-primary transition-colors leading-snug uppercase mb-3">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-900/60">
                  <span className="text-xs font-bold text-primary inline-flex items-center gap-2 hover:translate-x-1 transition-transform cursor-pointer">
                    READ MORE <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
