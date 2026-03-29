import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let products = [...PRODUCTS];
    if (activeCategory !== "All")
      products = products.filter((p) => p.category === activeCategory);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    if (sortBy === "price-asc") products.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc")
      products.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") products.sort((a, b) => b.rating - a.rating);
    return products;
  }, [searchTerm, activeCategory, sortBy]);

  return (
    <main className="min-h-screen">
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-foreground">
            Full Catalog
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-7">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products…"
              className="pl-9"
              data-ocid="catalog.search_input"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 rounded-lg border border-border bg-card px-3 text-sm text-foreground"
            data-ocid="catalog.select"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeCategory === cat ? "bg-teal text-white" : "bg-card text-muted-foreground border border-border hover:border-teal hover:text-teal"}`}
              data-ocid="catalog.tab"
            >
              {cat}
            </button>
          ))}
          {(searchTerm || activeCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground border border-border hover:text-destructive hover:border-destructive flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
        {(activeCategory !== "All" || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-5">
            {activeCategory !== "All" && (
              <Badge variant="secondary" className="gap-1">
                <SlidersHorizontal className="w-3 h-3" /> {activeCategory}
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                <Search className="w-3 h-3" /> "{searchTerm}"
              </Badge>
            )}
          </div>
        )}
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="catalog.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Search className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-lg text-foreground">
              No products found
            </h3>
            <p className="text-muted-foreground text-sm mt-1 mb-5">
              Try adjusting your filters or search term
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
              className="bg-teal text-white hover:bg-teal-hover rounded-full"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
