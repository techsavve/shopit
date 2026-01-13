interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="aspect-square bg-muted rounded-lg" />
                    <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((img) => (
                            <div key={img} className="aspect-square bg-muted rounded-md cursor-pointer hover:ring-2 ring-primary" />
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Product Name {id}</h1>
                    <p className="text-2xl font-bold text-primary mb-4">$99.99</p>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">(128 reviews)</span>
                    </div>

                    <p className="text-muted-foreground mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                    </p>

                    {/* Quantity Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Quantity</label>
                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 border rounded-md hover:bg-muted">-</button>
                            <input
                                type="number"
                                defaultValue={1}
                                min={1}
                                className="w-20 h-10 text-center border rounded-md"
                            />
                            <button className="w-10 h-10 border rounded-md hover:bg-muted">+</button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex gap-4 mb-8">
                        <button className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90">
                            Add to Cart
                        </button>
                        <button className="py-3 px-6 border rounded-md hover:bg-muted">
                            ♡
                        </button>
                    </div>

                    {/* Product Details */}
                    <div className="border-t pt-6">
                        <h2 className="font-semibold mb-4">Product Details</h2>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Category: Electronics</li>
                            <li>• SKU: PRD-{id}</li>
                            <li>• In Stock: Yes</li>
                            <li>• Shipping: Free delivery</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <a key={item} href={`/products/${item}`} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                            <div className="aspect-square bg-muted rounded-md mb-4" />
                            <h3 className="font-semibold mb-1">Related Product</h3>
                            <p className="font-bold">$79.99</p>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
