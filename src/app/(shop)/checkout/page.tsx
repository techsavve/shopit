export default function CheckoutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Checkout Form */}
                <div className="space-y-8">
                    {/* Shipping Information */}
                    <section className="border rounded-lg p-6">
                        <h2 className="font-semibold text-lg mb-4">Shipping Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">First Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Doe"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="123 Main Street"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">City</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="New York"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="10001"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Payment Information */}
                    <section className="border rounded-lg p-6">
                        <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 border rounded-md cursor-pointer hover:bg-muted">
                                <input type="radio" name="payment" id="card" defaultChecked />
                                <label htmlFor="card" className="cursor-pointer">Credit/Debit Card</label>
                            </div>
                            <div className="flex items-center gap-3 p-4 border rounded-md cursor-pointer hover:bg-muted">
                                <input type="radio" name="payment" id="paypal" />
                                <label htmlFor="paypal" className="cursor-pointer">PayPal</label>
                            </div>
                        </div>

                        {/* Card Details */}
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Card Number</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="4242 4242 4242 4242"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="MM/YY"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">CVC</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="123"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Order Review */}
                <div>
                    <div className="border rounded-lg p-6 sticky top-4">
                        <h2 className="font-semibold text-lg mb-4">Order Review</h2>

                        {/* Order Items */}
                        <div className="space-y-3 mb-6">
                            {[1, 2].map((item) => (
                                <div key={item} className="flex gap-3">
                                    <div className="w-16 h-16 bg-muted rounded-md shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-medium">Product {item}</p>
                                        <p className="text-sm text-muted-foreground">Qty: 1</p>
                                    </div>
                                    <p className="font-medium">$99.99</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>$199.98</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>$9.99</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <span>$20.00</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>$229.97</span>
                            </div>
                        </div>

                        <button className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-md font-semibold mt-6 hover:bg-primary/90">
                            Place Order
                        </button>

                        <p className="text-xs text-muted-foreground text-center mt-4">
                            By placing your order, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
