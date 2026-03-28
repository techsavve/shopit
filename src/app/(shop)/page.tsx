import Link from "next/link"
import { ProductCard } from "@/components/shop/productcard"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">

      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to StoreIt
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover amazing products at great prices. Your one-stop shop for everything you need.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Electronics", "Clothing", "Home & Garden", "Sports"].map((category) => (
            <Link
              key={category}
              href={`/products?category=${category.toLowerCase()}`}
              className="p-8 border rounded-lg text-center hover:bg-muted transition-colors"
            >
              <h3 className="font-semibold">{category}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Recent Listings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <ProductCard
              key={item}
              id={String(item)}
              name="Product Name"
              price={99.99}
            />
          ))}
        </div>
      </section>

    </div>
  )
}
