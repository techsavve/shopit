import Link from "next/link";

export default function CartPage() {
    // Sample cart items - will be replaced with state/context
    const cartItems = [
        { id: 1, name: "Product 1", price: 99.99, quantity: 2 },
        { id: 2, name: "Product 2", price: 149.99, quantity: 1 },
    ];

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 9.99;
    const total = subtotal + shipping;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-12 border rounded-lg">
                            <p className="text-muted-foreground mb-4">Your cart is empty</p>
                            <Link href="/products" className="text-primary hover:underline">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                                    <div className="w-24 h-24 bg-muted rounded-md shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button className="w-8 h-8 border rounded hover:bg-muted">-</button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button className="w-8 h-8 border rounded hover:bg-muted">+</button>
                                        </div>
                                    </div>
                                    <button className="text-red-500 hover:text-red-700">Remove</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 sticky top-4">
                        <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="block w-full py-3 px-6 bg-primary text-primary-foreground rounded-md font-semibold text-center hover:bg-primary/90"
                        >
                            Proceed to Checkout
                        </Link>

                        <Link
                            href="/products"
                            className="block w-full py-3 px-6 border rounded-md text-center mt-3 hover:bg-muted"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
