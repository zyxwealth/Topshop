"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { ArrowLeft, Lock, Check } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const shipping = totalPrice > 2000 ? 0 : 150;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          total,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrderId(data.orderId);
        clearCart();
        setStep("success");
      }
    } catch {
      setStep("form");
    }
  };

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-fade-in-up">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check className="text-green-400" size={40} />
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
          Order Confirmed
        </h1>
        <p className="text-white/50 font-light mb-2">
          Thank you for your purchase. Your order #{orderId} has been placed
          successfully.
        </p>
        <p className="text-white/30 text-sm font-light mb-10">
          A confirmation email has been sent. Your artwork will be carefully
          packaged and shipped with our white glove service.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-8 py-3.5 text-sm font-bold tracking-wider uppercase hover:bg-brand-gold-light transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0 && step === "form") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-white/40 font-light mb-8">
          Add some artwork to your cart before checking out.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-6 py-3 text-sm font-bold tracking-wider uppercase hover:bg-brand-gold-light transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-white/40 text-sm font-light hover:text-brand-gold transition-colors mb-4"
        >
          <ArrowLeft size={14} />
          Continue Shopping
        </Link>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact */}
            <div>
              <h2 className="text-lg font-serif font-semibold mb-4">
                Contact Information
              </h2>
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full bg-brand-charcoal border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors rounded"
              />
            </div>

            {/* Shipping */}
            <div>
              <h2 className="text-lg font-serif font-semibold mb-4">
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  required
                  className="bg-brand-charcoal border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors rounded"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  required
                  className="bg-brand-charcoal border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors rounded"
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
                className="w-full mt-4 bg-brand-charcoal border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors rounded"
              />
              <div className="grid grid-cols-3 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                  className="bg-brand-charcoal border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors rounded"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  required
                  className="bg-brand-charcoal border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors rounded"
                />
                <input
                  type="text"
                  placeholder="ZIP code"
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  required
                  className="bg-brand-charcoal border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors rounded"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={step === "processing"}
              className="w-full bg-brand-gold text-brand-dark py-4 text-sm font-bold tracking-wider uppercase hover:bg-brand-gold-light transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Lock size={14} />
              {step === "processing" ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-brand-charcoal border border-white/10 rounded-lg p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-serif font-semibold mb-6">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-brand-dark">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    <span className="absolute -top-1 -right-1 bg-white/20 text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{item.name}</h3>
                    <p className="text-white/40 text-xs">
                      ${(parseFloat(item.price) * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/40 font-light">Subtotal</span>
                <span>${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40 font-light">
                  Shipping
                </span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-400">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40 font-light">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="font-serif font-semibold">Total</span>
                <span className="text-brand-gold font-serif font-bold text-lg">
                  ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {totalPrice >= 2000 && (
              <p className="mt-4 text-green-400/80 text-xs font-light text-center">
                ✓ Free white glove shipping on orders over $2,000
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
