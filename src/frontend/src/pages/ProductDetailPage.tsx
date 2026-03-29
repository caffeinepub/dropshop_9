import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS } from "@/data/products";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const STARS = [0, 1, 2, 3, 4];

export default function ProductDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id);
  const related = PRODUCTS.filter(
    (p) => p.id !== id && p.category === product?.category,
  ).slice(0, 4);

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Button
          asChild
          className="mt-4 bg-teal text-white hover:bg-teal-hover rounded-full"
        >
          <Link to="/catalog">Back to Catalog</Link>
        </Button>
      </main>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-teal transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-teal transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden bg-card shadow-card"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-teal text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.badge}
              </Badge>
            )}
            {product.originalPrice && (
              <Badge className="absolute top-4 right-4 bg-destructive text-white px-3 py-1 rounded-full text-sm font-semibold">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}
                % OFF
              </Badge>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-extrabold text-foreground mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {STARS.map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-extrabold">
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-sm font-bold text-destructive">
                  Save £{(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>
            <Separator className="mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>
            <div className="flex items-center gap-2 mb-6 text-sm">
              <Package className="w-4 h-4 text-teal" />
              {product.stock > 20 ? (
                <span className="text-teal font-medium">
                  In Stock ({product.stock} available)
                </span>
              ) : product.stock > 0 ? (
                <span className="text-amber-500 font-medium">
                  Only {product.stock} left!
                </span>
              ) : (
                <span className="text-destructive font-medium">
                  Out of Stock
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold">Quantity</span>
              <div className="flex items-center border border-border rounded-full overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 hover:bg-secondary transition-colors"
                  data-ocid="product.secondary_button"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-2 font-bold text-sm min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="px-3.5 py-2 hover:bg-secondary transition-colors"
                  data-ocid="product.secondary_button"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full h-14 rounded-full font-bold text-base transition-colors ${added ? "bg-green-500 text-white" : "bg-teal text-white hover:bg-teal-hover"}`}
              data-ocid="product.primary_button"
            >
              {added ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart · £
                  {(product.price * quantity).toFixed(2)}
                </>
              )}
            </Button>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                "Free Shipping over £75",
                "30-Day Returns",
                "Secure Checkout",
              ].map((t) => (
                <div
                  key={t}
                  className="bg-secondary rounded-xl p-3 text-center text-xs font-medium text-muted-foreground"
                >
                  {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-foreground mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
        <div className="mt-6">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-teal transition-colors"
            data-ocid="nav.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
