import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { Product } from '../lib/store'

// Sample products data - in a real app, this would come from an API
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    stock: 15,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Electronics',
    stock: 8,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    description: 'Durable laptop backpack with multiple compartments',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'Accessories',
    stock: 22,
    rating: 4.4,
    reviews: 67
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    description: 'Portable bluetooth speaker with powerful bass',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    category: 'Electronics',
    stock: 12,
    rating: 4.5,
    reviews: 156
  },
  {
    id: '5',
    name: 'Gaming Mouse',
    description: 'High-precision gaming mouse with RGB lighting',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    category: 'Gaming',
    stock: 18,
    rating: 4.7,
    reviews: 93
  },
  {
    id: '6',
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub for laptops and tablets',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop',
    category: 'Accessories',
    stock: 25,
    rating: 4.3,
    reviews: 45
  }
]

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts)
      setLoading(false)
    }, 1000)
  }, [])

  const categories = ['all', ...new Set(products.map(p => p.category.toLowerCase()))]
  
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === filter)

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-600 mt-2">Discover our latest collection</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 rounded-lg h-64 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-gray-600 mt-2">Discover our latest collection</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}