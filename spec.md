# DropShop

## Current State
New project. Only scaffolded backend (empty actor) and no frontend UI exists.

## Requested Changes (Diff)

### Add
- Product catalog with categories, search, and filtering
- Product detail page with images, description, price, and add-to-cart
- Shopping cart with quantity management and checkout flow
- Featured/hero section on homepage
- Admin panel (authenticated) to add/edit/remove products and view orders
- Order management: customers can place orders, admin can view them
- Sample product seed data

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Backend: Products CRUD (id, name, description, price, imageUrl, category, stock), Orders (id, items, total, status, timestamp, customerInfo), admin-only mutations via caller principal check
2. Frontend: Homepage with hero + featured products, product grid with category filter + search, product detail page, cart sidebar/drawer, checkout form, admin dashboard with product and order management
3. Authorization component for admin login
4. Sample seed data for products across multiple categories
