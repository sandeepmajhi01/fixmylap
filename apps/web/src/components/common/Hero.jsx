import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Check,
  Wrench,
  Clock,
  Monitor,
  Battery,
  Thermometer,
  Cpu,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import herobgPng from "../../assets/herobg.png";

export default function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRepairClick = () => {
    if (location.pathname === "/") {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#contact");
    }
  };

  const coreFeatures = [
    { icon: ShieldCheck, line1: "Certified", line2: "Refurbished" },
    { icon: Award, line1: "Warranty", line2: "on Laptops" },
    { icon: Check, line1: "Quality", line2: "Checked" },
    { icon: Wrench, line1: "Expert", line2: "Technicians" },
    { icon: Clock, line1: "Quick & Reliable", line2: "Repairs" }
  ];

  const repairServices = [
    { icon: Monitor, line1: "Screen", line2: "Replacement" },
    { icon: Battery, line1: "Battery", line2: "Replacement" },
    { icon: Thermometer, line1: "Overheating", line2: "Solutions" },
    { icon: Cpu, line1: "Performance", line2: "Upgrades" },
    { icon: ShieldAlert, line1: "Virus Removal &", line2: "Software Support" }
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#050505] text-white overflow-x-hidden flex flex-col justify-between">

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-[150px] pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex-grow flex items-center">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 w-full">

          {/* LEFT COLUMN: Content & Details */}
          {/* <div className="lg:col-span-7 flex flex-col justify-center"> */}

          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center">

            {/* Top Pill Badge */}
            <div className="w-fit mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-black/40 px-4 py-2 text-xs font-bold tracking-wider text-white backdrop-blur-md">
                <ShieldCheck className="text-primary shrink-0" size={16} />
                <span>INDIA&apos;S TRUSTED REFURBISHED STORE</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6.5xl lg:text-6xl xl:text-7xl leading-[1.08]">
              Refurbished laptops.
              <br />
              <span className="text-primary font-black">Expert care. Smarter value.</span>
            </h1>

            {/* Sub-headline / Description */}
            <p className="mt-5 max-w-2xl text-base text-gray-400 sm:text-lg leading-relaxed">
              Certified refurbished laptops with warranty, quality checks, and expert repair support - all under one roof.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              {/* Shop Refurbished Laptops */}
              <Link
                to="/products"
                className="group flex items-center justify-between gap-4 rounded-xl border border-primary bg-black/40 px-6 py-3.5 text-xs font-bold tracking-wider text-primary hover:bg-primary hover:text-black transition-all duration-300 w-full sm:w-auto"
              >
                <span>SHOP REFURBISHED LAPTOPS</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 group-hover:bg-black/10 transition-colors duration-300">
                  <ArrowRight size={14} className="text-primary group-hover:text-black transition-colors duration-300" />
                </span>
              </Link>

              {/* Repair Your Laptop */}
              <button
                onClick={handleRepairClick}
                className="group flex items-center justify-between gap-4 rounded-xl border border-gray-700 bg-black/40 px-6 py-3.5 text-xs font-bold tracking-wider text-white hover:border-gray-500 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Wrench size={16} className="text-primary" />
                  <span>REPAIR YOUR LAPTOP</span>
                </div>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                  <ArrowRight size={14} className="text-white" />
                </span>
              </button>
            </div>

            {/* Horizontal Core Features Badges */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5 md:gap-3">
              {coreFeatures.map((feat, idx) => (
                <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-black/20 text-primary mb-2.5">
                    <feat.icon size={18} />
                  </div>
                  <div className="text-xs font-semibold text-gray-300 leading-snug">
                    <p>{feat.line1}</p>
                    <p className="text-gray-400 font-normal">{feat.line2}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Repair Services Card Container */}
            <div className="relative mt-10 rounded-2xl border border-gray-800/80 bg-black/50 p-5 sm:p-6 backdrop-blur-sm">

              {/* Absolutely Positioned Badge */}
              <div className="absolute -top-3 left-6">
                <span className="rounded bg-primary px-2.5 py-1 text-[9px] font-black tracking-widest text-black uppercase">
                  REPAIR SERVICES
                </span>
              </div>

              {/* Grid of 5 Services */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 py-2 border-b border-gray-800/80 sm:grid-cols-5">
                {repairServices.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-900 border border-gray-800 shrink-0 text-white">
                      <service.icon size={16} />
                    </div>
                    <div className="text-[10.5px] font-bold text-white leading-tight">
                      <p>{service.line1}</p>
                      <p className="text-gray-400 font-medium">{service.line2}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Trust checklist */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-6 mt-4 text-xs text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>Genuine Parts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>
                    <span className="text-primary font-bold">90-Day</span> Repair Warranty
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>Doorstep Pickup & Drop</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Visual crop of mockup */}
          {/* <div className="lg:col-span-5 flex items-center justify-center lg:-translate-y-28 transition-transform duration-500"> */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex items-center justify-center lg:-translate-y-28 transition-transform duration-500">
            <div className="relative overflow-hidden aspect-[1024/816] rounded-3xl w-full max-w-[520px] lg:max-w-none shadow-[0_20px_50px_rgba(37,180,37,0.15)] border border-gray-900/60 bg-[#080808]">
              {/* Double-width image alignment trick to display right half */}
              <img
                src={herobgPng}
                className="w-full h-full object-cover select-none pointer-events-none"
                alt="Refurbished laptop showcase"
              />
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BRAND PARTNERS BAR */}
      <div className="w-full bg-white py-4.5 sm:py-5.5 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3.5 text-xs sm:text-[13px] font-black text-[#111111] tracking-widest uppercase">
            <span>Thinkpad</span>
            <span className="text-gray-300 font-light select-none">-</span>
            <span>Dell</span>
            <span className="text-gray-300 font-light select-none">-</span>
            <span>HP</span>
            <span className="text-gray-300 font-light select-none">-</span>
            <span>Lenovo</span>
            <span className="text-gray-300 font-light select-none">-</span>
            <span>Asus</span>
            <span className="text-gray-300 font-light select-none">-</span>
            <span>Acer</span>
            <span className="text-gray-300 font-light select-none">-</span>
            <span>Apple</span>
            <span className="text-gray-300 font-light select-none">-</span>
            <span>MSI</span>
            <span className="text-gray-300 font-light select-none">-</span>
            <span>Samsung</span>
            <span className="text-gray-300 font-light select-none">-</span>
            <span>Microsoft</span>
          </div>
        </div>
      </div>

      {/* FLOATING WHATSAPP CHAT WIDGET */}
      <a
        href="https://wa.me/9822186822" // Placeholder WhatsApp link
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110 active:scale-95 duration-300 hover:bg-[#22c35e]"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.457 3.473 1.328 4.988L2 22l5.176-1.358A9.91 9.91 0 0 0 12.012 22c5.506 0 9.988-4.482 9.988-9.988S17.518 2 12.012 2zm4.721 14.199c-.227.641-1.121 1.223-1.633 1.281-.453.053-.949.074-1.58-.129-2.585-.828-4.254-3.486-4.383-3.658-.129-.172-1.047-1.395-1.047-2.658s.664-1.875.902-2.129c.238-.254.512-.316.684-.316l.488.012c.152.004.363-.059.57.449.207.508.719 1.758.781 1.887.062.129.102.277.016.449-.086.172-.129.277-.258.426-.129.148-.27.332-.387.445-.129.125-.262.262-.113.516.148.254.66 1.086 1.418 1.758.977.867 1.797 1.137 2.055 1.266.258.129.406.109.559-.066.152-.176.66-.77 1.344-1.285.453-.332.617-.18.887-.082s1.719.859 2.012 1.004c.293.145.488.219.559.344.07.125.07.723-.156 1.363z" />
        </svg>
      </a>

    </section>
  );
}
