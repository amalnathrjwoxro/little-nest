"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

type CurrentUser = {
  name?: string;
  email?: string;
};

type NavItem = {
  label: string;
  slug: string;
};

export default function NavbarClient({ navItems }: { navItems: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const logoIconRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // ── fetch current user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/users/me", { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        setUser(data.user || null);
      } catch {
        setUser(null);
      }
    };
    loadUser();
  }, []);

  const logout = async () => {
    await fetch("/api/users/logout", { method: "POST", credentials: "include" });
    setUser(null);
    window.location.href = "/";
  };

  // ── entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(logoIconRef.current,
        { scale: 0, rotate: -20 },
        { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.3 }
      );
      gsap.fromTo(logoTextRef.current,
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.45 }
      );
      gsap.fromTo(
        linksRef.current?.children ? Array.from(linksRef.current.children) : [],
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.08, delay: 0.5 }
      );
      gsap.fromTo(ctaRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.65 }
      );
    });
    return () => ctx.revert();
  }, []);

  // ── scroll shrink
  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        if (isScrolled) {
          gsap.to(navRef.current, {
            paddingTop: "8px", paddingBottom: "8px",
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 12px rgba(249,134,160,0.12)",
            duration: 0.35, ease: "power2.out",
          });
          gsap.to(logoIconRef.current, { width: "32px", height: "32px", duration: 0.3, ease: "power2.out" });
          gsap.to(logoTextRef.current, { fontSize: "15px", duration: 0.3, ease: "power2.out" });
        } else {
          gsap.to(navRef.current, {
            paddingTop: "20px", paddingBottom: "20px",
            backgroundColor: "transparent", boxShadow: "none",
            duration: 0.35, ease: "power2.out",
          });
          gsap.to(logoIconRef.current, { width: "40px", height: "40px", duration: 0.3, ease: "power2.out" });
          gsap.to(logoTextRef.current, { fontSize: "17px", duration: 0.3, ease: "power2.out" });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  // ── mobile menu toggle
  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      setTimeout(() => {
        if (!mobileMenuRef.current) return;
        gsap.fromTo(mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
        );
        gsap.fromTo(Array.from(mobileMenuRef.current.children),
          { x: -16, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.06, ease: "power2.out", delay: 0.1 }
        );
      }, 10);
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0, opacity: 0, duration: 0.25, ease: "power2.in",
        onComplete: () => setMenuOpen(false),
      });
    }
  };

  const handleLogoHover = () => {
    gsap.fromTo(logoIconRef.current,
      { rotate: 0 },
      { keyframes: { rotate: [0, -10, 10, -6, 6, 0] }, duration: 0.5, ease: "power1.inOut" }
    );
  };

  const handleLinkHover  = (e: React.MouseEvent<HTMLAnchorElement>) =>
    gsap.to(e.currentTarget, { y: -2, duration: 0.15, ease: "power2.out" });

  const handleLinkLeave  = (e: React.MouseEvent<HTMLAnchorElement>) =>
    gsap.to(e.currentTarget, { y:  0, duration: 0.15, ease: "power2.out" });

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
      style={{ paddingTop: "20px", paddingBottom: "20px" }}
    >
      {/* ── inner wrapper ── */}
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* logo */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer"
          onMouseEnter={handleLogoHover}
        >
          <div
            ref={logoIconRef}
            className="bg-[#fde8ed] rounded-full flex items-center justify-center overflow-hidden"
            style={{ width: "40px", height: "40px" }}
          >
            <svg width="20" height="20" fill="none" stroke="#e8829a" strokeWidth="1.6" viewBox="0 0 24 24">
              <path d="M3 12h13l-2-7H6L3 12z" />
              <circle cx="7" cy="17" r="1.5" />
              <circle cx="14" cy="17" r="1.5" />
              <path d="M3 12c0 2.8 2.2 5 5 5h4c2.8 0 5-2.2 5-5" />
            </svg>
          </div>
          <span
            ref={logoTextRef}
            className="font-semibold text-[#3d1f2a] tracking-tight"
            style={{ fontSize: "17px" }}
          >
            littlenest
          </span>
        </Link>

        {/* desktop links */}
        <div ref={linksRef} className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
              className="text-[14px] text-[#c0849a] hover:text-[#e8829a] font-medium transition-colors inline-block"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* cta */}
        <div ref={ctaRef} className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-[13.5px] text-[#3d1f2a] font-semibold">
                {user.name || user.email}
              </span>
              <button
                type="button"
                onClick={logout}
                className="bg-[#f9869f] hover:bg-[#f06b88] text-white font-semibold rounded-full px-5 py-2 text-[13px] transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
                className="text-[13.5px] text-[#e8829a] font-semibold hover:text-[#f06b88] transition-colors inline-block"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.18, ease: "power2.out" })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1,    duration: 0.18, ease: "power2.out" })}
                className="bg-[#f9869f] hover:bg-[#f06b88] text-white font-semibold rounded-full px-5 py-2 text-[13px] transition-colors inline-block"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* hamburger */}
        <button
          className="md:hidden text-[#e8829a] p-1"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen
              ? <path d="M6 18L18 6M6 6l12 12" />
              : <path d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>

      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t border-[#f5d0da] px-6 py-4 flex flex-col gap-3 overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="text-[13.5px] text-[#c0849a] font-medium hover:text-[#e8829a]"
            >
              {item.label}
            </Link>
          ))}

          <div className="h-px bg-[#faeaee]" />

          {user ? (
            <>
              <span className="text-[13px] text-[#3d1f2a] font-semibold">
                {user.name || user.email}
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-center bg-[#f9869f] text-white text-[13px] font-semibold rounded-full py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-[13px] text-[#e8829a] font-semibold">
                Log in
              </Link>
              <Link href="/register" className="text-center bg-[#f9869f] text-white text-[13px] font-semibold rounded-full py-2">
                Get started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
