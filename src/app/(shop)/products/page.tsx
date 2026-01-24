import Link from "next/link";
import { TestControls } from "@/components/dev/TestControls"

export default function ProductsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="border rounded-lg p-4">
                        <h2 className="font-semibold mb-4">Filters</h2>

                        {/* Categories */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-2">Categories</h3>
                            <div className="space-y-2">
                                {["All", "Electronics", "Clothing", "Home & Garden", "Sports"].map((cat) => (
                                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-sm">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-2">Price Range</h3>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                />
                            </div>
                        </div>

                        <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                            Apply Filters
                        </button>
                    </div>
                </aside>

                {/* Products Grid */}
                <main className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">All Products</h1>
                        <select className="px-3 py-2 border rounded-md">
                            <option>Sort by: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest First</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Product cards - will be replaced with real data */}
                        {Array.from({ length: 9 }).map((_, i) => (
                            <Link
                                key={i}
                                href={`/products/${i + 1}`}
                                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                            >
                                <div className="aspect-square bg-muted rounded-md mb-4" />
                                <h3 className="font-semibold mb-1">Product Name {i + 1}</h3>
                                <p className="text-sm text-muted-foreground mb-2">Short description here</p>
                                <p className="font-bold text-lg">${(99.99 + i * 10).toFixed(2)}</p>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-2 mt-8">
                        <button className="px-4 py-2 border rounded-md hover:bg-muted">Previous</button>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">1</button>
                        <button className="px-4 py-2 border rounded-md hover:bg-muted">2</button>
                        <button className="px-4 py-2 border rounded-md hover:bg-muted">3</button>
                        <button className="px-4 py-2 border rounded-md hover:bg-muted">Next</button>
                    </div>
                </main>
            </div>
        </div>
    );
}
