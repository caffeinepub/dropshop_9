import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle2, Loader2, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.postcode.trim()) errs.postcode = "Postcode is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setStep("success");
    clearCart();
    toast.success("Order placed successfully!");
  };

  const handleClose = () => {
    setStep("form");
    setForm({ name: "", email: "", address: "", city: "", postcode: "" });
    setErrors({});
    onClose();
  };

  const shipping = subtotal >= 75 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="checkout.dialog"
      >
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Checkout</DialogTitle>
            </DialogHeader>
            <div className="bg-secondary rounded-xl p-4 space-y-2">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    £{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-teal font-semibold">Free</span>
                  ) : (
                    `£${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="co-name">Full Name</Label>
                <Input
                  id="co-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Jane Smith"
                  data-ocid="checkout.input"
                />
                {errors.name && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="checkout.error_state"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="co-email">Email Address</Label>
                <Input
                  id="co-email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="jane@example.com"
                  data-ocid="checkout.input"
                />
                {errors.email && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="checkout.error_state"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="co-addr">Street Address</Label>
                <Input
                  id="co-addr"
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  placeholder="123 High Street"
                  data-ocid="checkout.input"
                />
                {errors.address && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="checkout.error_state"
                  >
                    {errors.address}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="co-city">City</Label>
                  <Input
                    id="co-city"
                    value={form.city}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, city: e.target.value }))
                    }
                    placeholder="London"
                    data-ocid="checkout.input"
                  />
                  {errors.city && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.error_state"
                    >
                      {errors.city}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="co-post">Postcode</Label>
                  <Input
                    id="co-post"
                    value={form.postcode}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, postcode: e.target.value }))
                    }
                    placeholder="SW1A 1AA"
                    data-ocid="checkout.input"
                  />
                  {errors.postcode && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.error_state"
                    >
                      {errors.postcode}
                    </p>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-teal text-white hover:bg-teal-hover rounded-full h-12 font-semibold text-base"
                data-ocid="checkout.submit_button"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Processing…
                  </>
                ) : (
                  `Place Order · £${total.toFixed(2)}`
                )}
              </Button>
            </form>
          </>
        ) : (
          <div
            className="flex flex-col items-center text-center py-8 gap-4"
            data-ocid="checkout.success_state"
          >
            <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-teal" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Order Confirmed!</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Thank you, {form.name}! You'll receive a confirmation email at{" "}
                {form.email}.
              </p>
            </div>
            <div className="bg-secondary rounded-xl p-4 w-full text-left">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Package className="w-4 h-4 text-teal" /> Estimated delivery:
                3–7 business days
              </div>
            </div>
            <Button
              onClick={handleClose}
              className="bg-teal text-white hover:bg-teal-hover rounded-full px-8"
              data-ocid="checkout.close_button"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
