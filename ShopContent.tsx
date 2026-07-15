"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, LayoutGrid, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  originalPrice: string | null;
  imageUrl: string;
  medium: string | null;
  category: string | null;
  categorySlug: string | null;
  reviewCount: number;
  avgRating: number;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name", label: "Name A–Z" },
];

const priceRanges = [
  { value: "0-500", label: "Under $500", min: 0, max: 500 },
  { value: "500-2000", label: "$500 – $2,000", min: 500, max: 2000 },
  { value: "2000-4000", label: "$2,000 – $4,000", min: 2000, max: 4000 },
  { value: "4000-99999", label: "$4,000+", min: 4000, max: 99999 },
];

export function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [gridCols, setGridCols] = useState(3);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (sortBy) params.set("sort", sortBy);
    try {
      const res = await fetch(`/api/products?${params}`);
      if (res.ok) {
        let data = await res.json();
        if (selectedPriceRange) {
          const range = priceRanges.find((r) => r.value === selectedPriceRange);
          if (range) {
            data = data.filter(
              (p: Product) =>
                parseFloat(p.price) >= range.min && parseFloat(p.price) <= range.max
            );
          }
        }
        setProducts(data);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, [selectedCategory, sortBy, selectedPriceRange]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRange("");
    setSortBy("newest");
  };

  const hasFilters = selectedCategory || selectedPriceRange;

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-48 sm:h-64 bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/50" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <span className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase">
              The Gallery
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-2">
              {selectedCategory
                ? categories.find((c) => c.slug === selectedCategory)?.name || "Shop"
                : "All Artwork"}
            </h1>
            <p className="text-white/40 text-sm font-light mt-3">
              {products.length} piece{products.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-white/10 text-sm font-light hover:border-brand-gold/30 hover:text-brand-gold transition-all lg:hidden"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-white/40 hover:text-brand-gold transition-colors"
              >
                <X size={12} />
                Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-brand-charcoal border border-white/10 text-sm text-white/70 px-3 py-2 focus:outline-none focus:border-brand-gold/30"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Grid toggle */}
            <div className="hidden sm:flex items-center border border-white/10">
              <button
                onClick={() => setGridCols(2)}
                className={`p-2 transition-colors ${
                  gridCols === 2 ? "text-brand-gold" : "text-white/30 hover:text-white/60"
                }`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 transition-colors ${
                  gridCols === 3 ? "text-brand-gold" : "text-white/30 hover:text-white/60"
                }`}
              >
                <Grid3X3 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              filtersOpen ? "block" : "hidden"
            } lg:block w-full lg:w-56 flex-shrink-0`}
          >
            <div className="space-y-8 lg:sticky lg:top-24">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/50 mb-4">
                  Category
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`block w-full text-left py-2 px-3 text-sm font-light transition-all ${
                      !selectedCategory
                        ? "text-brand-gold bg-brand-gold/10"
                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    All Artwork
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`block w-full text-left py-2 px-3 text-sm font-light transition-all ${
                        selectedCategory === cat.slug
                          ? "text-brand-gold bg-brand-gold/10"
                          : "text-white/50 hover:text-white/80 hover:bg-white/5"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/50 mb-4">
                  Price Range
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedPriceRange("")}
                    className={`block w-full text-left py-2 px-3 text-sm font-light transition-all ${
                      !selectedPriceRange
                        ? "text-brand-gold bg-brand-gold/10"
                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    All Prices
                  </button>
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setSelectedPriceRange(range.value)}
                      className={`block w-full text-left py-2 px-3 text-sm font-light transition-all ${
                        selectedPriceRange === range.value
                          ? "text-brand-gold bg-brand-gold/10"
                          : "text-white/50 hover:text-white/80 hover:bg-white/5"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div
                className={`grid gap-6 ${
                  gridCols === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="aspect-[4/5] shimmer rounded-lg" />
                    <div className="h-4 w-3/4 shimmer rounded" />
                    <div className="h-3 w-1/2 shimmer rounded" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/30 text-lg font-light mb-4">
                  No pieces found matching your criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="text-brand-gold text-sm hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridCols === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    imageUrl={product.imageUrl}
                    medium={product.medium}
                    category={product.category}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
