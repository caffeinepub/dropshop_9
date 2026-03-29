import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Mail, Zap } from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiTiktok, SiX } from "react-icons/si";
import { toast } from "sonner";

const SOCIAL_ICONS = [
  { Icon: SiInstagram, label: "Instagram" },
  { Icon: SiX, label: "X (Twitter)" },
  { Icon: SiFacebook, label: "Facebook" },
  { Icon: SiTiktok, label: "TikTok" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("You're subscribed!");
      setEmail("");
    }
  };

  const year = new Date().getFullYear();

  const links = {
    Shop: [
      { label: "All Products", to: "/catalog" },
      { label: "Tech & Gear", to: "/catalog" },
      { label: "Lifestyle", to: "/catalog" },
      { label: "Trending", to: "/catalog" },
    ],
    Support: [
      { label: "Track Order", to: "/track" },
      { label: "Returns", to: "/track" },
      { label: "FAQs", to: "/track" },
      { label: "Contact", to: "/track" },
    ],
    About: [
      { label: "Our Story", to: "/" },
      { label: "Sustainability", to: "/" },
      { label: "Careers", to: "/" },
    ],
  };

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <span className="block text-xs font-extrabold tracking-widest text-teal uppercase">
                  Lumina
                </span>
                <span className="block text-xs font-bold tracking-[0.2em] uppercase">
                  Market
                </span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              Premium curated products delivered to your door. Quality you can
              trust, prices you'll love.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-teal"
                  data-ocid="footer.input"
                />
              </div>
              <Button
                type="submit"
                className="bg-teal hover:bg-teal-hover text-white rounded-lg shrink-0"
                data-ocid="footer.submit_button"
              >
                Subscribe
              </Button>
            </form>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_ICONS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://caffeine.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-teal transition-colors flex items-center justify-center"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title, cols]) => (
            <div key={title}>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-white/80">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {cols.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>PayPal</span>
            <span>·</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
