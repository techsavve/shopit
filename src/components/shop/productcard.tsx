import Link from "next/link"

type ProductCardProps = {
  id: string
  name: string
  price: number
}

export function ProductCard({ id, name, price }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      {/* Image placeholder */}
      <div className="aspect-square bg-muted rounded-md mb-4" />

      {/* Product info */}
      <h3 className="font-semibold mb-2">{name}</h3>
      <p className="text-muted-foreground mb-4">${price}</p>

      {/* CTA */}
      <Link
        href={`/products/${id}`}
        className="block text-center py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        View Product
      </Link>
    </div>
  )
}
