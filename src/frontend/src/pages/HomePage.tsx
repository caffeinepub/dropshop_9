import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/products";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  ChevronRight,
  RefreshCw,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";

const FEATURED_DEALS = [
  {
    title: "Tech Essentials",
    subtitle: "Up to 30% off on premium gadgets",
    image: "/assets/generated/deal-tech.dim_600x360.jpg",
    to: "/catalog",
    tag: "Tech & Gear",
  },
  {
    title: "Lifestyle Collection",
    subtitle: "Curated accessories for modern living",
    image: "/assets/generated/deal-lifestyle.dim_600x360.jpg",
    to: "/catalog",
    tag: "Lifestyle",
  },
  {
    title: "Home & Living",
    subtitle: "Transform your space with style",
    image: "/assets/generated/deal-home.dim_600x360.jpg",
    to: "/catalog",
    tag: "Home",
  },
];

const BENEFITS = [
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Dispatched within 24h, delivered in 3–7 days worldwide",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    desc: "Not happy? Return hassle-free within 30 days, no questions asked",
  },
  {
    icon: Award,
    title: "Curated Quality",
    desc: "Every product is hand-selected by our team for premium quality",
  },
];

export default function HomePage() {
  const catalogProducts = PRODUCTS.slice(0, 8);
  const favorites = PRODUCTS.filter((p) => p.trending).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "520px" }}
      >
        <img
          src="/assets/generated/hero-banner.dim_1400x560.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-start justify-center"
          style={{ minHeight: "520px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="inline-block bg-teal/20 border border-teal/40 text-teal text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              New Collection 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              Discover Products
              <br />
              <span className="text-teal">Worth Having</span>
            </h1>
            <p className="text-white/75 text-lg mb-8 leading-relaxed">
              Premium curated goods shipped globally. Quality you can trust at
              prices you'll love.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-teal hover:bg-teal-hover text-white rounded-full px-8 h-12 font-semibold text-base"
                data-ocid="hero.primary_button"
              >
                <Link to="/catalog">
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 h-12 font-semibold text-base border-white/40 text-white hover:bg-white/10"
                data-ocid="hero.secondary_button"
              >
                <Link to="/catalog">View Trending</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="bg-background py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-foreground">
              Explore Our Catalog
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Hand-picked products from top suppliers worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {catalogProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-10 h-11 font-semibold border-teal text-teal hover:bg-teal hover:text-white transition-colors"
              data-ocid="catalog.primary_button"
            >
              <Link to="/catalog">
                View All Products <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-16 px-4 sm:px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-foreground">
                Featured Deals
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Limited time offers you can't miss
              </p>
            </div>
            <Link
              to="/catalog"
              className="text-sm font-semibold text-teal hover:underline flex items-center gap-1"
            >
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_DEALS.map((deal, i) => (
              <motion.div
                key={deal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={deal.to}
                  className="block relative rounded-2xl overflow-hidden group shadow-card hover:shadow-card-hover transition-shadow"
                  style={{ aspectRatio: "16/10" }}
                >
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <span className="inline-block bg-teal text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                      {deal.tag}
                    </span>
                    <h3 className="text-white font-bold text-xl">
                      {deal.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1">
                      {deal.subtitle}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Favorites + Why Shop */}
      <section className="py-16 px-4 sm:px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <h2 className="text-xl font-extrabold tracking-tight uppercase text-foreground mb-6">
              Customer Favorites
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {favorites.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-extrabold tracking-tight uppercase text-foreground mb-6">
              Why Shop With Us?
            </h2>
            <div className="flex flex-col gap-5">
              {BENEFITS.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-4 bg-card rounded-2xl p-5 shadow-card"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
