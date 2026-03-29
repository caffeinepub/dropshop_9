import CheckoutModal from "@/components/CheckoutModal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, isOpen, closeCart } =
    useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={closeCart}
        onKeyDown={(e) => e.key === "Escape" && closeCart()}
        role="button"
        tabIndex={-1}
        aria-label="Close cart"
      />
      <aside
        className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 flex flex-col shadow-2xl animate-slide-in-right"
        data-ocid="cart.panel"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-teal" />
            <h2 className="font-bold text-lg text-foreground">Your Cart</h2>
            {items.length > 0 && (
              <span className="text-sm text-muted-foreground">
                ({items.length} item{items.length !== 1 ? "s" : ""})
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeCart}
            data-ocid="cart.close_button"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center"
            data-ocid="cart.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Discover our amazing products
              </p>
            </div>
            <Button
              asChild
              className="bg-teal text-white hover:bg-teal-hover rounded-full"
              onClick={closeCart}
            >
              <Link to="/catalog">Browse Catalog</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-5">
              <div className="flex flex-col gap-4">
                {items.map((item, idx) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3"
                    data-ocid={`cart.item.${idx + 1}`}
                  >
                    <Link
                      to="/product/$id"
                      params={{ id: item.product.id }}
                      onClick={closeCart}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-xl bg-secondary"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to="/product/$id"
                        params={{ id: item.product.id }}
                        onClick={closeCart}
                      >
                        <p className="font-medium text-sm text-foreground leading-snug hover:text-teal transition-colors line-clamp-2">
                          {item.product.name}
                        </p>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.product.category}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-full overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="px-2.5 py-1 hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="px-2.5 py-1 hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-sm">
                          £{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors self-start mt-0.5"
                      data-ocid={`cart.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-5 border-t border-border space-y-3">
              {subtotal < 75 ? (
                <div className="bg-secondary rounded-xl px-4 py-2.5 text-sm">
                  <span className="text-muted-foreground">Add </span>
                  <span className="font-bold text-teal">
                    £{(75 - subtotal).toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    more for free shipping!
                  </span>
                </div>
              ) : (
                <div className="bg-teal/10 rounded-xl px-4 py-2.5 text-sm text-teal font-semibold text-center">
                  🎉 You've unlocked free shipping!
                </div>
              )}
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-bold text-lg">
                  £{subtotal.toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full bg-teal text-white hover:bg-teal-hover rounded-full h-12 font-semibold text-base"
                onClick={() => {
                  closeCart();
                  setCheckoutOpen(true);
                }}
                data-ocid="cart.primary_button"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </aside>
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}
