"use client";

import { useCart } from "@/lib/cart-context";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CartSlideOut() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-dark border-l border-white/10 z-[70] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-brand-gold" />
              <h2 className="text-lg font-serif font-semibold">Your Cart</h2>
              <span className="text-white/40 text-sm">({totalItems})</span>
            </div>
            <button
              onClick={closeCart}
              className="p-1 text-white/40 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={48} className="text-white/10 mb-4" />
                <p className="text-white/40 font-light mb-2">
                  Your cart is empty
                </p>
                <p className="text-white/20 text-sm font-light mb-6">
                  Discover our collections and find your next masterpiece
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="bg-brand-gold text-brand-dark px-6 py-2.5 text-sm font-semibold hover:bg-brand-gold-light transition-colors inline-flex items-center gap-2"
                >
                  Browse Collection
                  <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-white/[0.03] rounded-lg border border-white/5 animate-fade-in"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-brand-charcoal">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">
                        {item.name}
                      </h3>
                      <p className="text-brand-gold text-sm mt-1">
                        ${parseFloat(item.price).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center border border-white/10 text-white/50 hover:border-brand-gold/50 hover:text-brand-gold transition-colors text-xs"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center border border-white/10 text-white/50 hover:border-brand-gold/50 hover:text-brand-gold transition-colors text-xs"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white/20 hover:text-red-400 transition-colors self-start p-1"
                      aria-label="Remove item"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-white/10 px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm font-light">
                  Subtotal
                </span>
                <span className="text-lg font-serif font-semibold">
                  ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-white/30 text-xs font-light">
                Shipping & taxes calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full bg-brand-gold text-brand-dark py-3.5 text-center text-sm font-bold tracking-wider uppercase hover:bg-brand-gold-light transition-colors"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={closeCart}
                className="block w-full text-white/40 text-sm font-light hover:text-white/60 transition-colors text-center py-1"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
