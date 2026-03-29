import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Clock, Package, Search, Truck } from "lucide-react";
import { useState } from "react";

const MOCK_ORDERS = [
  {
    id: "LM-2026-0042",
    status: "shipped",
    items: "ProSound Elite Headphones × 1",
    date: "Mar 25, 2026",
    eta: "Mar 30, 2026",
    carrier: "DHL Express",
  },
  {
    id: "LM-2026-0038",
    status: "delivered",
    items: "Heritage Slim Wallet × 1, Thermal Explorer Mug × 2",
    date: "Mar 20, 2026",
    eta: "Mar 25, 2026",
    carrier: "Royal Mail",
  },
];

const STATUS_CONFIG = {
  processing: {
    icon: Clock,
    label: "Processing",
    color: "text-amber-500 bg-amber-50",
  },
  shipped: { icon: Truck, label: "Shipped", color: "text-blue-500 bg-blue-50" },
  delivered: {
    icon: CheckCircle2,
    label: "Delivered",
    color: "text-teal bg-teal/10",
  },
};

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<
    (typeof MOCK_ORDERS)[0] | null | undefined
  >(undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const found = MOCK_ORDERS.find(
      (o) => o.id.toLowerCase() === query.toLowerCase(),
    );
    setResult(found ?? null);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-4">
            <Package className="w-7 h-7 text-teal" />
          </div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-foreground">
            Track Your Order
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Enter your order number to get live tracking information
          </p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. LM-2026-0042"
              className="pl-9"
              data-ocid="track.search_input"
            />
          </div>
          <Button
            type="submit"
            className="bg-teal text-white hover:bg-teal-hover rounded-lg px-6"
            data-ocid="track.primary_button"
          >
            Track
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mb-8">
          Try:{" "}
          <button
            type="button"
            onClick={() => setQuery("LM-2026-0042")}
            className="text-teal hover:underline"
          >
            LM-2026-0042
          </button>{" "}
          or{" "}
          <button
            type="button"
            onClick={() => setQuery("LM-2026-0038")}
            className="text-teal hover:underline"
          >
            LM-2026-0038
          </button>
        </p>
        {result === null && (
          <div
            className="bg-card rounded-2xl p-8 text-center shadow-card"
            data-ocid="track.error_state"
          >
            <p className="font-semibold text-foreground">Order not found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Double-check your order number or contact support.
            </p>
          </div>
        )}
        {result &&
          (() => {
            const cfg =
              STATUS_CONFIG[result.status as keyof typeof STATUS_CONFIG];
            const Icon = cfg.icon;
            return (
              <div
                className="bg-card rounded-2xl p-6 shadow-card"
                data-ocid="track.card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Order ID
                    </p>
                    <p className="font-bold text-lg">{result.id}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${cfg.color}`}
                  >
                    <Icon className="w-4 h-4" /> {cfg.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Items</p>
                    <p className="font-medium mt-0.5">{result.items}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Carrier</p>
                    <p className="font-medium mt-0.5">{result.carrier}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Order Date</p>
                    <p className="font-medium mt-0.5">{result.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Est. Delivery
                    </p>
                    <p className="font-medium mt-0.5">{result.eta}</p>
                  </div>
                </div>
              </div>
            );
          })()}
      </div>
    </main>
  );
}
