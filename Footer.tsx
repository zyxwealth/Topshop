"use client";

import Link from "next/link";
import { Globe, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-charcoal border-t border-white/5">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-brand-gold text-xl font-serif font-bold tracking-wide">
                TOPSHOP
              </span>
              <span className="text-white/60 text-xs font-light tracking-[0.3em] uppercase ml-1">
                graffiti
              </span>
            </Link>
            <p className="mt-4 text-white/40 text-sm leading-relaxed font-light">
              Hand crafted artwork for discerning collectors. Each piece tells a
              story of urban culture, raw expression, and uncompromising vision.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="text-white/30 hover:text-brand-gold transition-colors"
                aria-label="Website"
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                className="text-white/30 hover:text-brand-gold transition-colors"
                aria-label="Favorites"
              >
                <Heart size={18} />
              </a>
              <a
                href="#"
                className="text-white/30 hover:text-brand-gold transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Collections
            </h4>
            <ul className="space-y-3">
              {["Graffiti Art", "Abstract Expressionism", "Mixed Media", "Limited Edition Prints", "Urban Portraits"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/shop?category=${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-white/40 hover:text-brand-gold text-sm font-light transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Information
            </h4>
            <ul className="space-y-3">
              {["About Us", "Artist Bios", "Commission a Piece", "Shipping & Returns", "Authentication"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/shop"
                      className="text-white/40 hover:text-brand-gold text-sm font-light transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Stay Connected
            </h4>
            <p className="text-white/40 text-sm font-light mb-4">
              Be the first to know about new drops and exclusive offers.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors rounded-l"
              />
              <button
                type="submit"
                className="bg-brand-gold text-brand-dark px-4 py-2.5 text-sm font-semibold hover:bg-brand-gold-light transition-colors rounded-r"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-light">
            © {new Date().getFullYear()} Topshopgraffiti. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/shop"
              className="text-white/20 hover:text-white/40 text-xs font-light transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/shop"
              className="text-white/20 hover:text-white/40 text-xs font-light transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
