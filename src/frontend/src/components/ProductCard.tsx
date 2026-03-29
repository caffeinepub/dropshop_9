import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/products";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const STARS = [0, 1, 2, 3, 4];

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden group flex flex-col"
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block relative overflow-hidden bg-secondary"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-teal text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {product.badge}
          </Badge>
        )}
        {product.originalPrice && (
          <Badge className="absolute top-3 right-3 bg-destructive text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </Badge>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link to="/product/$id" params={{ id: product.id }}>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2 hover:text-teal transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {STARS.map((s) => (
              <Star
                key={s}
                className={`w-3.5 h-3.5 ${s < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-border"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-base font-bold text-foreground">
            £{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              £{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <Button
          onClick={() => addItem(product)}
          variant="outline"
          className="mt-auto w-full rounded-full border-teal text-teal hover:bg-teal hover:text-white font-semibold text-sm h-9 transition-colors"
          data-ocid="product.button"
        >
          <ShoppingCart className="w-3.5 h-3.5 mr-2" /> Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
