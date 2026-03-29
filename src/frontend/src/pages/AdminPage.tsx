import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, PRODUCTS as INITIAL_PRODUCTS } from "@/data/products";
import type { Product } from "@/data/products";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useQueryClient } from "@tanstack/react-query";
import {
  Edit,
  Loader2,
  LogOut,
  Package,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type PF = Omit<Product, "id" | "rating" | "reviewCount">;
const EMPTY: PF = {
  name: "",
  price: 0,
  category: "Tech & Gear",
  image: "",
  description: "",
  stock: 0,
};

export default function AdminPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<PF>(EMPTY);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleLogin = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (err: any) {
        if (err.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const openAdd = () => {
    setEditingProduct(null);
    setForm(EMPTY);
    setDialogOpen(true);
  };
  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      category: p.category,
      image: p.image,
      description: p.description,
      stock: p.stock,
      badge: p.badge,
      featured: p.featured,
      trending: p.trending,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || form.price <= 0) {
      toast.error("Name and price are required");
      return;
    }
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...form } : p)),
      );
      toast.success("Product updated");
    } else {
      setProducts((prev) => [
        { ...form, id: Date.now().toString(), rating: 4.5, reviewCount: 0 },
        ...prev,
      ]);
      toast.success("Product added");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
    toast.success("Product deleted");
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-card rounded-2xl shadow-card p-10 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck className="w-8 h-8 text-teal" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground text-sm mb-7">
            Securely manage your products and orders with Internet Identity.
          </p>
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full bg-teal text-white hover:bg-teal-hover rounded-full h-12 font-semibold"
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging in…
              </>
            ) : (
              "Login to Admin"
            )}
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-teal" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">
                {identity?.getPrincipal().toString().slice(0, 20)}…
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogin}
            className="rounded-full gap-2"
            data-ocid="admin.secondary_button"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Products", value: products.length },
            {
              label: "In Stock",
              value: products.filter((p) => p.stock > 0).length,
            },
            {
              label: "Trending",
              value: products.filter((p) => p.trending).length,
            },
            {
              label: "Featured",
              value: products.filter((p) => p.featured).length,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-card rounded-2xl p-4 shadow-card text-center"
            >
              <p className="text-3xl font-extrabold text-teal">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-teal" />
              <h2 className="font-bold text-lg">Products</h2>
              <Badge variant="secondary">{products.length}</Badge>
            </div>
            <Button
              onClick={openAdd}
              className="bg-teal text-white hover:bg-teal-hover rounded-full gap-2"
              data-ocid="admin.primary_button"
            >
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table data-ocid="admin.table">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, idx) => (
                  <TableRow key={product.id} data-ocid={`admin.row.${idx + 1}`}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-secondary"
                        />
                        <span className="font-medium text-sm">
                          {product.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold">
                      £{product.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          product.stock > 20
                            ? "text-teal"
                            : product.stock > 0
                              ? "text-amber-500"
                              : "text-destructive"
                        }
                      >
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {product.trending && (
                          <Badge className="bg-teal/10 text-teal text-xs">
                            Trending
                          </Badge>
                        )}
                        {product.featured && (
                          <Badge className="bg-amber-100 text-amber-700 text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(product)}
                          className="h-8 w-8 text-muted-foreground hover:text-teal"
                          data-ocid={`admin.edit_button.${idx + 1}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(product.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          data-ocid={`admin.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Product name"
                data-ocid="admin.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Price (£)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      price: Number.parseFloat(e.target.value) || 0,
                    }))
                  }
                  data-ocid="admin.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      stock: Number.parseInt(e.target.value) || 0,
                    }))
                  }
                  data-ocid="admin.input"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full h-9 rounded-lg border border-border bg-card px-3 text-sm"
                data-ocid="admin.select"
              >
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Image URL</Label>
              <Input
                value={form.image}
                onChange={(e) =>
                  setForm((f) => ({ ...f, image: e.target.value }))
                }
                placeholder="https://…"
                data-ocid="admin.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Product description…"
                rows={3}
                data-ocid="admin.textarea"
              />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!form.trending}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, trending: e.target.checked }))
                  }
                  className="rounded"
                  data-ocid="admin.checkbox"
                />{" "}
                Trending
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!form.featured}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, featured: e.target.checked }))
                  }
                  className="rounded"
                  data-ocid="admin.checkbox"
                />{" "}
                Featured
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="flex-1 rounded-full"
                data-ocid="admin.cancel_button"
              >
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-teal text-white hover:bg-teal-hover rounded-full"
                data-ocid="admin.save_button"
              >
                <Save className="w-4 h-4 mr-2" />{" "}
                {editingProduct ? "Save Changes" : "Add Product"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm" data-ocid="admin.dialog">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              className="flex-1 rounded-full"
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteId && handleDelete(deleteId)}
              className="flex-1 bg-destructive text-white hover:bg-destructive/90 rounded-full"
              data-ocid="admin.delete_button"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
