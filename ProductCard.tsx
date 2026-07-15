"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: string;
  originalPrice: string | null;
  imageUrl: string;
  medium: string | null;
  category: string | null;
  index?: number;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  originalPrice,
  imageUrl,
  medium,
  category,
  index = 0,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={`/product/${slug}`}
      className={`group block opacity-0 animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
      style={{ animationFillMode: "forwards" }}
    >
      <div className="relative bg-brand-charcoal rounded-lg overflow-hidden border border-white/5 hover:border-brand-gold/20 transition-all duration-500">
        {/* Image */}
        <div className="img-zoom relative aspect-[4/5] bg-brand-dark">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

          {/* Quick add button */}
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-4 left-4 right-4 py-3 text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              added
                ? "bg-green-600 text-white translate-y-0 opacity-100"
                : "bg-brand-gold text-brand-dark translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            }`}
          >
            <ShoppingBag size={14} />
            {added ? "Added to Cart" : "Add to Cart"}
          </button>

          {/* Sale badge */}
          {originalPrice && (
            <span className="absolute top-3 left-3 bg-red-500/90 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1">
              Sale
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          {category && (
            <p className="text-brand-gold/70 text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">
              {category}
            </p>
          )}
          <h3 className="text-white font-serif font-medium text-base group-hover:text-brand-gold transition-colors duration-300">
            {name}
          </h3>
          {medium && (
            <p className="text-white/30 text-xs mt-1 font-light">{medium}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-white font-semibold text-sm">
              ${parseFloat(price).toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-white/30 text-xs line-through">
                ${parseFloat(originalPrice).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
