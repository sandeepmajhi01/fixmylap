import {
  Smartphone,
  Laptop,
  Tablet,
  Network,
  Headphones,
  Home,
  Database,
  Shield,
  ArrowRight
} from "lucide-react";

export default function Grid() {
  const services = [
    { icon: Smartphone, title: "Smartphone Repair", desc: "Broken screens, battery swaps, and fluid damage cleaning." },
    { icon: Laptop, title: "PC/Mac Repair", desc: "Logic board repair, OS installation, and laptop upgrades." },
    { icon: Tablet, title: "Tablet Repair", desc: "Touchscreen replacement and battery calibration." },
    { icon: Network, title: "Network Services", desc: "Router configuration, server setup, and wiring diagnostics." },
    { icon: Headphones, title: "Live Help", desc: "24/7 technical advice and remote desktop diagnostics." },
    { icon: Home, title: "Home Computer Service", desc: "Expert tech home visits for network and system issues." },
    { icon: Database, title: "Data Backup & Recovery", desc: "Safely retrieve lost files from crashed hard drives." },
    { icon: Shield, title: "Data Protection", desc: "Antivirus installation, malware cleaning, and security audits." },
  ];

  return (
    <section id="services" className="py-20 bg-[#0a0a0a] border-t border-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Diagnostic & Hardware Remediation</span>
          <h2 className="text-3xl font-black tracking-tight text-white mt-1.5 md:text-4xl">
            EXPERT DEVICE SOLUTIONS
          </h2>
          <p className="text-sm text-gray-500 mt-3 max-w-2xl leading-relaxed">
            Professional hardware restoration services carried out by certified engineers in our anti-static laboratory environment.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="bg-[#121212] border border-gray-900/60 p-8 rounded-xl flex flex-col justify-between hover:border-primary/40 hover:bg-[#152415]/10 group transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="h-12 w-12 rounded-lg bg-[#181818] border border-gray-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300 mb-6">
                  <svc.icon size={22} />
                </div>
                <h3 className="text-base font-black uppercase text-white tracking-wider mb-2">
                  {svc.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {svc.desc}
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-primary transition-colors">
                  Learn More
                </span>
                <ArrowRight size={14} className="text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>

              {/* Decorative side line */}
              <div className="absolute top-0 right-0 w-[3px] h-0 bg-primary group-hover:h-full transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
