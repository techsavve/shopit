import Link from "next/link";



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

            {/* Featured Products Section */}
            <section className="py-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Product cards will be mapped here */}
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                            <div className="aspect-square bg-muted rounded-md mb-4" />
                            <h3 className="font-semibold mb-2">Product Name</h3>
                            <p className="text-muted-foreground mb-2">$99.99</p>
                            <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
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

        </div>
    );
}
