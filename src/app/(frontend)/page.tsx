import Link from "next/link";
import ContactForm from "./components/ContactForm";
import Navbar from "./components/Navbar";
import MediaShowcase from "./components/MediaShowcase";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffafc] overflow-x-hidden">

      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-[#fde8ed] flex items-center justify-center overflow-hidden px-6 pt-24">

        {/* animated floating dots */}
        <div className="absolute w-64 h-64 bg-[#fcd0db] rounded-full -top-16 -left-16 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-40 h-40 bg-[#fcd0db] rounded-full top-10 right-10 animate-[pulse_3s_ease-in-out_infinite]" />
        <div className="absolute w-72 h-72 bg-[#fcd0db] rounded-full -bottom-20 -right-20 animate-[pulse_5s_ease-in-out_infinite]" />
        <div className="absolute w-20 h-20 bg-[#f9b8c8] rounded-full bottom-20 left-20 animate-[bounce_3s_ease-in-out_infinite]" />
        <div className="absolute w-10 h-10 bg-[#f498b0] rounded-full top-32 left-40 animate-[bounce_2.5s_ease-in-out_infinite]" />
        <div className="absolute w-6 h-6 bg-[#f498b0] rounded-full top-48 right-32 animate-[bounce_4s_ease-in-out_infinite]" />
        <div className="absolute w-3 h-3 bg-[#f498b0] rounded-full top-24 right-56 animate-[ping_3s_ease-in-out_infinite]" />
        <div className="absolute w-5 h-5 bg-[#f9b8c8] rounded-full bottom-32 right-24 animate-[bounce_3.5s_ease-in-out_infinite]" />
        <div className="absolute w-8 h-8 bg-[#fcd0db] rounded-full top-1/2 left-8 animate-[pulse_4.5s_ease-in-out_infinite]" />

        <div className="relative z-10 text-center max-w-xl">

          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#f5d0da] rounded-full px-4 py-1.5 mb-6 animate-[fadeIn_0.6s_ease-out]">
            <div className="w-2 h-2 bg-[#f9869f] rounded-full animate-ping" />
            <span className="text-[11.5px] font-semibold text-[#c0687a] tracking-wide uppercase">New arrivals just dropped</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#3d1f2a] leading-tight mb-5 tracking-tight animate-[fadeInUp_0.7s_ease-out]">
            Everything your<br />
            <span className="text-[#e8829a]">little one</span> needs
          </h1>

          <p className="text-[15px] text-[#c0849a] mb-8 leading-relaxed animate-[fadeInUp_0.8s_ease-out]">
            Soft, safe, and adorable baby products handpicked by parents, for parents. From newborns to toddlers.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap animate-[fadeInUp_0.9s_ease-out]">
            <Link href="/products" className="bg-[#f9869f] hover:bg-[#f06b88] text-white font-semibold rounded-full px-7 py-3 text-[14px] transition-all active:scale-95 hover:scale-105">
              Shop now
            </Link>
            <Link href="/products" className="bg-white border border-[#f5c6d4] text-[#e8829a] font-semibold rounded-full px-7 py-3 text-[14px] hover:bg-[#fde8ed] transition-all hover:scale-105">
              View collections
            </Link>
          </div>

          {/* cute scrolling stars */}
          <div className="flex items-center justify-center gap-1 mt-10">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" fill="#f9869f" viewBox="0 0 24 24"
                className="animate-[bounce_1s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className="text-[11.5px] text-[#d4a0b0] mt-2">Loved by 10,000+ happy parents</p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-6 bg-[#fffafc]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-[22px] font-semibold text-[#3d1f2a] mb-2 tracking-tight">
            Why parents love us
          </h2>
          <p className="text-center text-[13px] text-[#c0849a] mb-12">
            Built around what matters most — safety, softness, and smiles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Safety first",
                desc: "Every product is tested to meet the highest safety standards for babies.",
                delay: "0s",
              },
              {
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                title: "Made with love",
                desc: "Curated by real parents who know exactly what babies need.",
                delay: "0.15s",
              },
              {
                icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10",
                title: "Fast delivery",
                desc: "Get your order in 2–3 days. Because babies can't wait.",
                delay: "0.3s",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-3xl border border-[#f5d0da] p-7 text-center hover:scale-105 hover:shadow-sm transition-all duration-300"
                style={{ animationDelay: f.delay }}
              >
                <div className="w-12 h-12 bg-[#fde8ed] rounded-full flex items-center justify-center mx-auto mb-4 animate-[pulse_3s_ease-in-out_infinite]">
                  <svg width="22" height="22" fill="none" stroke="#e8829a" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-[15px] font-semibold text-[#3d1f2a] mb-2">{f.title}</h3>
                <p className="text-[12.5px] text-[#c0849a] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="bg-[#f9869f] py-3 overflow-hidden">
        <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-white text-[12.5px] font-semibold tracking-widest uppercase mx-8 shrink-0">
              Safe for babies &nbsp;·&nbsp; Soft materials &nbsp;·&nbsp; Free returns &nbsp;·&nbsp; Trusted by parents &nbsp;·&nbsp; New arrivals weekly &nbsp;·&nbsp; Certified products &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="py-20 px-6 bg-[#fde8ed]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-[22px] font-semibold text-[#3d1f2a] mb-2 tracking-tight">Shop by category</h2>
          <p className="text-center text-[13px] text-[#c0849a] mb-12">Find exactly what your little one needs.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Clothing", path: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" },
              { label: "Toys", path: "M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5zm-5 0c-.83 0-1.5-.67-1.5-1.5v-5C8 2.67 8.67 2 9.5 2S11 2.67 11 3.5v5c0 .83-.67 1.5-1.5 1.5zm-5 0c-.83 0-1.5-.67-1.5-1.5v-5C3 2.67 3.67 2 4.5 2S6 2.67 6 3.5v5c0 .83-.67 1.5-1.5 1.5z" },
              { label: "Feeding", path: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" },
              { label: "Sleep", path: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" },
            ].map((cat) => (
              <div key={cat.label}
                className="bg-white rounded-3xl border border-[#f5d0da] p-6 text-center cursor-pointer hover:scale-105 hover:border-[#e8829a] transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#fde8ed] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#f9869f] transition-colors duration-300">
                  <svg width="24" height="24" fill="none" stroke="#e8829a" strokeWidth="1.6" viewBox="0 0 24 24"
                    className="group-hover:stroke-white transition-colors duration-300">
                    <path d={cat.path} />
                  </svg>
                </div>
                <p className="text-[13px] font-semibold text-[#3d1f2a] group-hover:text-[#e8829a] transition-colors">{cat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MediaShowcase />

      {/* ── CONTACT ── */}
      <div id="contact">
        <ContactForm />
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-[#3d1f2a] py-12 px-6">
        <div className="max-w-4xl mx-auto">

          {/* top */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-[#5a3a4a]">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#fde8ed] rounded-full flex items-center justify-center">
                <svg width="16" height="16" fill="none" stroke="#e8829a" strokeWidth="1.6" viewBox="0 0 24 24">
                  <path d="M3 12h13l-2-7H6L3 12z" />
                  <circle cx="7" cy="17" r="1.5" />
                  <circle cx="14" cy="17" r="1.5" />
                  <path d="M3 12c0 2.8 2.2 5 5 5h4c2.8 0 5-2.2 5-5" />
                </svg>
              </div>
              <span className="text-white font-semibold text-[16px] tracking-tight">littlenest</span>
            </div>

            <div className="flex items-center gap-6">
              {["Shop", "Collections", "About", "Blog"].map((item) => (
                <a key={item} href={item === "Blog" ? "/blogs" : "/products"} className="text-[#c0849a] hover:text-white text-[13px] font-medium transition-colors">
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {[
                "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
                "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
              ].map((path, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 bg-[#5a3a4a] hover:bg-[#f9869f] rounded-full flex items-center justify-center transition-colors duration-300">
                  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6">
            <p className="text-[#c0849a] text-[12px]">© 2026 littlenest. Made with love for little ones.</p>
            <div className="flex gap-5">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a key={item} href="#" className="text-[#c0849a] hover:text-white text-[12px] transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
