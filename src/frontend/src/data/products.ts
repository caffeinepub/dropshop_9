export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  stock: number;
  featured?: boolean;
  trending?: boolean;
  badge?: string;
}

export const CATEGORIES = [
  "All",
  "Tech & Gear",
  "Lifestyle",
  "Home & Living",
  "Fitness",
  "Accessories",
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "ProSound Elite Headphones",
    price: 89.99,
    originalPrice: 129.99,
    category: "Tech & Gear",
    rating: 4.8,
    reviewCount: 324,
    image: "/assets/generated/product-headphones.dim_400x320.jpg",
    description:
      "Experience studio-quality sound with active noise cancellation and 30-hour battery life. Designed for audiophiles who demand the best.",
    stock: 42,
    featured: true,
    trending: true,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "FitPulse Smart Watch",
    price: 64.99,
    originalPrice: 89.99,
    category: "Tech & Gear",
    rating: 4.6,
    reviewCount: 198,
    image: "/assets/generated/product-smartwatch.dim_400x320.jpg",
    description:
      "Track your fitness goals with precision. Heart rate monitoring, sleep tracking, and 7-day battery life in a sleek AMOLED display.",
    stock: 76,
    trending: true,
    badge: "New",
  },
  {
    id: "3",
    name: "SoundWave BT Speaker",
    price: 44.99,
    category: "Tech & Gear",
    rating: 4.5,
    reviewCount: 156,
    image: "/assets/generated/product-speaker.dim_400x320.jpg",
    description:
      "360-degree immersive sound in a portable aluminum shell. IPX7 waterproof, 20-hour playtime, perfect for adventures.",
    stock: 58,
  },
  {
    id: "4",
    name: "TactileFlow Keyboard",
    price: 79.99,
    originalPrice: 99.99,
    category: "Tech & Gear",
    rating: 4.9,
    reviewCount: 445,
    image: "/assets/generated/product-keyboard.dim_400x320.jpg",
    description:
      "Mechanical keyboard with customizable RGB, hot-swappable switches, and ultra-responsive tactile feedback for gaming and productivity.",
    stock: 33,
    featured: true,
    badge: "Top Rated",
  },
  {
    id: "5",
    name: "Heritage Slim Wallet",
    price: 34.99,
    category: "Accessories",
    rating: 4.7,
    reviewCount: 287,
    image: "/assets/generated/product-wallet.dim_400x320.jpg",
    description:
      "Full-grain leather bifold wallet with RFID blocking. Holds 8 cards and fits perfectly in any pocket without the bulk.",
    stock: 120,
    trending: true,
  },
  {
    id: "6",
    name: "Thermal Explorer Mug",
    price: 28.99,
    originalPrice: 39.99,
    category: "Lifestyle",
    rating: 4.6,
    reviewCount: 203,
    image: "/assets/generated/product-mug.dim_400x320.jpg",
    description:
      "Double-wall vacuum insulation keeps drinks hot 12 hours, cold 24 hours. BPA-free stainless steel with a leak-proof lid.",
    stock: 89,
  },
  {
    id: "7",
    name: "Luminary Desk Lamp",
    price: 54.99,
    category: "Home & Living",
    rating: 4.4,
    reviewCount: 134,
    image: "/assets/generated/product-lamp.dim_400x320.jpg",
    description:
      "Adjustable brightness LED lamp with wireless charging base. 5 color temperatures for focused work or relaxed ambiance.",
    stock: 47,
    featured: true,
  },
  {
    id: "8",
    name: "Soleille Scented Candle",
    price: 22.99,
    category: "Home & Living",
    rating: 4.8,
    reviewCount: 521,
    image: "/assets/generated/product-candle.dim_400x320.jpg",
    description:
      "Hand-poured soy wax candle with premium fragrance oils. 50-hour burn time, amber glass vessel you'll reuse forever.",
    stock: 200,
    badge: "Fan Favorite",
  },
  {
    id: "9",
    name: "FlowState Yoga Mat",
    price: 49.99,
    originalPrice: 69.99,
    category: "Fitness",
    rating: 4.7,
    reviewCount: 392,
    image: "/assets/generated/product-yogamat.dim_400x320.jpg",
    description:
      '6mm non-slip natural rubber mat with alignment guides. Extra-wide 72" x 26" surface for full range of movement.',
    stock: 65,
    trending: true,
  },
];
