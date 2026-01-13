# StoreIt - E-commerce Next.js Template

A beginner-friendly e-commerce template built with **Next.js 15**, **Tailwind CSS**, and **Supabase**. Perfect for learning how to build a full-stack e-commerce application.

---

## 📁 Project Structure

```
dashboard/
├── public/                    # Static assets (images, icons, fonts)
│   └── asset/
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (shop)/            # 🛒 Public storefront (customers)
│   │   ├── (auth)/            # 🔐 Authentication pages
│   │   ├── (dashboard)/       # 👤 Customer account area
│   │   ├── (admin)/           # ⚙️ Admin panel
│   │   ├── globals.css        # Global styles & Tailwind
│   │   ├── layout.tsx         # Root layout
│   │   └── providers.tsx      # Context providers
│   │
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Base UI components (buttons, inputs, etc.)
│   │   ├── header/            # Header components
│   │   ├── sidebar/           # Sidebar navigation
│   │   └── modal/             # Modal components
│   │
│   ├── lib/                   # Utilities & helpers
│   │   ├── utils.ts           # Helper functions
│   │   └── types/             # TypeScript type definitions
│   │
│   ├── hooks/                 # Custom React hooks
│   │
│   └── datasource/            # Data fetching & API
│       └── api/               # API client configuration
│
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.js             # Next.js configuration
└── package.json               # Dependencies & scripts
```

---

## 🛒 Route Groups Explained

Next.js uses **route groups** (folders in parentheses) to organize routes without affecting the URL structure.

### 1. `(shop)` - Public Storefront
The main customer-facing store pages.

```
(shop)/
├── layout.tsx          # Shop layout (header, footer)
├── page.tsx            # Home page (/)
├── products/
│   ├── page.tsx        # Product listing (/products)
│   └── [id]/
│       └── page.tsx    # Product detail (/products/123)
├── cart/
│   └── page.tsx        # Shopping cart (/cart)
└── checkout/
    └── page.tsx        # Checkout (/checkout)
```

**URLs:** `/`, `/products`, `/products/[id]`, `/cart`, `/checkout`

---

### 2. `(auth)` - Authentication
Login and registration pages.

```
(auth)/
├── _components/        # Auth-specific components
│   └── signin-form.tsx
└── (routes)/
    ├── signin/
    │   └── page.tsx    # Login page (/signin)
    └── signup/
        └── page.tsx    # Register page (/signup)
```

**URLs:** `/signin`, `/signup`

---

### 3. `(dashboard)` - Customer Account
Protected area for logged-in customers to manage their account.

```
(dashboard)/
├── layout.tsx          # Dashboard layout with sidebar
├── _components/        # Dashboard-specific components
└── (routes)/
    └── page.tsx        # Customer dashboard (/dashboard)
```

**URLs:** `/dashboard`, `/dashboard/orders`, `/dashboard/wishlist`, etc.

---

### 4. `(admin)` - Admin Panel
Store management for administrators.

```
(admin)/
├── layout.tsx          # Admin layout with navigation
└── (routes)/
    ├── page.tsx        # Admin dashboard (/admin)
    ├── products/
    │   ├── page.tsx    # Product list (/admin/products)
    │   └── new/
    │       └── page.tsx # Add product (/admin/products/new)
    ├── orders/
    │   └── page.tsx    # Order management (/admin/orders)
    ├── customers/
    │   └── page.tsx    # Customer list (/admin/customers)
    └── settings/
        └── page.tsx    # Store settings (/admin/settings)
```

**URLs:** `/admin`, `/admin/products`, `/admin/orders`, `/admin/customers`, `/admin/settings`

---

## 🔄 Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         STOREIT FLOW                            │
└─────────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │   Visitor    │
                    └──────┬───────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌────────────┐  ┌────────────┐  ┌────────────┐
    │  (shop)/   │  │  (auth)/   │  │  (admin)/  │
    │  Browse    │  │  Login/    │  │  Manage    │
    │  Products  │  │  Register  │  │  Store     │
    └─────┬──────┘  └─────┬──────┘  └────────────┘
          │               │
          ▼               ▼
    ┌────────────┐  ┌────────────┐
    │  Add to    │  │ Logged In  │
    │  Cart      │  │  Customer  │
    └─────┬──────┘  └─────┬──────┘
          │               │
          ▼               ▼
    ┌────────────┐  ┌────────────┐
    │  Checkout  │◄─┤(dashboard)/│
    │  Process   │  │  My Orders │
    └─────┬──────┘  │  Wishlist  │
          │         │  Account   │
          ▼         └────────────┘
    ┌────────────┐
    │   Order    │
    │  Complete  │
    └────────────┘
```

---

## 📝 Page Descriptions

### Shop Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with featured products and categories |
| Products | `/products` | Product listing with filters and search |
| Product Detail | `/products/[id]` | Single product view with images, description, add to cart |
| Cart | `/cart` | Shopping cart with item management |
| Checkout | `/checkout` | Shipping, payment, and order confirmation |

### Auth Pages
| Page | Route | Description |
|------|-------|-------------|
| Sign In | `/signin` | Email/password login with social options |
| Sign Up | `/signup` | New user registration |

### Customer Dashboard
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard` | Order history, quick links |
| Orders | `/dashboard/orders` | View and track orders |
| Wishlist | `/dashboard/wishlist` | Saved products |
| Account | `/dashboard/account` | Profile settings |

### Admin Panel
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/admin` | Sales overview, recent orders, top products |
| Products | `/admin/products` | CRUD for products |
| Add Product | `/admin/products/new` | Create new product |
| Orders | `/admin/orders` | Order management and fulfillment |
| Customers | `/admin/customers` | Customer list and details |
| Settings | `/admin/settings` | Store configuration |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For admin features
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 🎨 Styling

This project uses **Tailwind CSS** with:
- Custom color palette via CSS variables
- Dark mode support (`dark:` prefix)
- Responsive design (`sm:`, `md:`, `lg:`, `xl:`)

### Color Variables (globals.css)
```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}
```

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` | React framework with App Router |
| `react` | UI library |
| `tailwindcss` | Utility-first CSS |
| `lucide-react` | Icon library |
| `zod` | Schema validation |
| `react-hook-form` | Form handling |
| `zustand` | State management |

---

## 🗄️ Database Schema (Supabase)

```sql
-- Users (handled by Supabase Auth)

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  shipping_address JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);
```

---

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Hook Form](https://react-hook-form.com/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
