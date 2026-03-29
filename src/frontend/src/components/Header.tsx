import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, User, X, Zap } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Catalog", to: "/catalog" },
  { label: "Trending", to: "/catalog" },
  { label: "Tech & Gear", to: "/catalog" },
  { label: "Lifestyle", to: "/catalog" },
  { label: "Track Order", to: "/track" },
];

export default function Header() {
  const { totalItems, openCart } = useCart();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate({ to: "/catalog" });
      setSearch("");
    }
  };

  return (
    <>
      <div className="w-full bg-charcoal text-white text-xs font-semibold tracking-widest text-center py-2 px-4 uppercase">
        Free Shipping on Orders Over £75 &nbsp;|&nbsp; Global Delivery
        &nbsp;|&nbsp;
        <Link
          to="/catalog"
          className="underline underline-offset-2 hover:text-teal transition-colors"
        >
          Shop Now
        </Link>
      </div>
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <span className="block text-xs font-extrabold tracking-widest text-teal uppercase">
                Lumina
              </span>
              <span className="block text-xs font-bold tracking-[0.2em] text-foreground uppercase">
                Market
              </span>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1 ml-4 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                data-ocid="nav.link"
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative ml-auto"
          >
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products…"
              className="pl-9 w-56 h-9 text-sm bg-secondary border-border"
              data-ocid="header.search_input"
            />
          </form>
          <div className="flex items-center gap-1 ml-2">
            <Link to="/admin" data-ocid="nav.link">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="relative flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={openCart}
              data-ocid="cart.open_modal_button"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <Badge className="bg-teal text-white text-xs min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
                  {totalItems}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-white px-4 py-3 flex flex-col gap-1">
            <form
              onSubmit={handleSearch}
              className="flex items-center relative mb-2"
            >
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="pl-9 w-full h-9 text-sm"
              />
            </form>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
