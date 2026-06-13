import { CheckCircle2, PhoneCall } from "lucide-react";

export default function Emergency() {
  const problems = [
    "Broken Glass and Retina/LCD Panel Replacement",
    "Battery Replacement & Charging Port Remediations",
    "Thermal Core Overheating & Fan Cleanups",
    "Water Liquid Damage & Circuit Logic Rebuilds",
    "OS Corruption, Firmware Flash & Lock Removals",
  ];

  return (
    <section className="py-20 bg-[#111111] border-t border-gray-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left text column */}
        <div className="space-y-6">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
            Immediate Support
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            24 HOUR EMERGENCY <br />
            <span className="text-primary">HARDWARE REPAIR</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
            Critical machine down? We provide immediate expedited diagnostic repairs for work laptops, servers, and business mobiles. Call our express hotline for priority laboratory pickup.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center py-4">
            <a 
              href="tel:8880001133"
              className="flex items-center gap-3 bg-primary text-black px-6 py-4 font-black text-sm tracking-wider rounded-xl transition hover:brightness-110 shadow-lg shadow-primary/15"
            >
              <PhoneCall size={18} />
              <span>CALL NOW: 9822186822</span>
            </a>
            <div className="text-xs font-semibold text-gray-500">
              <p className="text-gray-300">ESTIMATED RESPONSE</p>
              <p>Under 30 Minutes for local pickup</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-gray-900/60">
            {problems.map((prob, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-gray-300 font-medium">{prob}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual column */}
        <div className="relative flex justify-center">
          {/* Green backdrop glow */}
          <div className="absolute inset-0 bg-primary/10 transform rotate-3 scale-95 blur-xl z-0 rounded-2xl" />
          <div className="relative z-10 border border-gray-900 bg-[#0a0a0a] p-3 rounded-2xl w-full max-w-md shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Technician repairing mobile circuitry"
              className="w-full h-80 object-cover rounded-xl filter brightness-90 grayscale-[20%] group-hover:grayscale-0 transition-all"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Laboratory Status</p>
              <p className="text-xs text-white font-semibold mt-1">Class-100 Cleanroom Diagnostics Active</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
