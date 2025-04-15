import ProductCard from "../../components/ProductCard"

export default function SimilarProducts({ products }) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
