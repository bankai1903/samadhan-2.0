import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

// initial hardcoded products (you can replace with fetch later)
const initialProducts = [
  {
    id: 1, name: "Wireless Bluetooth Headphones", price: 79.99, originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop",
    rating: 4.5, reviews: 128, discount: 20, isNew: false, isFavorite: true
  },
  {
    id: 2, name: "Smart Fitness Watch", price: 199.99, originalPrice: null,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop",
    rating: 4.8, reviews: 89, discount: null, isNew: true, isFavorite: false
  },
  {
    id: 3, name: "USB-C Fast Charging Cable", price: 24.99, originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80&auto=format&fit=crop",
    rating: 4.2, reviews: 256, discount: 28, isNew: false, isFavorite: false
  },
  {
    id: 4, name: "Portable Power Bank 20000mAh", price: 49.99, originalPrice: null,
    image: "https://images.unsplash.com/photo-1609592806475-bb8a2c0b3977?w=800&q=80&auto=format&fit=crop",
    rating: 4.6, reviews: 167, discount: null, isNew: true, isFavorite: true
  },
  {
    id: 5, name: "Mechanical Gaming Keyboard", price: 129.99, originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&q=80&auto=format&fit=crop",
    rating: 4.7, reviews: 94, discount: 18, isNew: false, isFavorite: false
  },
  {
    id: 6, name: "4K Webcam for Streaming", price: 89.99, originalPrice: null,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80&auto=format&fit=crop",
    rating: 4.4, reviews: 203, discount: null, isNew: true, isFavorite: false
  }
];

export default function ProductCardList() {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState('all'); // all | new | sale
  const [sortOption, setSortOption] = useState('featured'); // featured | lowToHigh | highToLow | rating
  const [query, setQuery] = useState('');

  const toggleFavorite = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const addToCart = (product) => {
    // placeholder - wire into your cart flow
    console.log('add to cart', product);
    alert(`Added ${product.name} to cart`);
  };

  const filtered = useMemo(() => {
    let list = products;

    if (filter === 'new') list = list.filter(p => p.isNew);
    if (filter === 'sale') list = list.filter(p => p.discount);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    if (sortOption === 'lowToHigh') list = [...list].sort((a,b)=>a.price-b.price);
    if (sortOption === 'highToLow') list = [...list].sort((a,b)=>b.price-a.price);
    if (sortOption === 'rating') list = [...list].sort((a,b)=>b.rating-a.rating);

    return list;
  }, [products, filter, sortOption, query]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Featured Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Handpicked tech accessories to enhance your digital life.</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex gap-2 items-center">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg font-medium ${filter==='all'?'bg-blue-600 text-white':'bg-gray-200 text-gray-700'}`}>All Products</button>
            <button onClick={() => setFilter('new')} className={`px-4 py-2 rounded-lg font-medium ${filter==='new'?'bg-blue-600 text-white':'bg-gray-200 text-gray-700'}`}>New Arrivals</button>
            <button onClick={() => setFilter('sale')} className={`px-4 py-2 rounded-lg font-medium ${filter==='sale'?'bg-blue-600 text-white':'bg-gray-200 text-gray-700'}`}>On Sale</button>
          </div>

          <div className="flex gap-3 items-center">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..." className="px-3 py-2 border border-gray-300 rounded-md" />
            <select value={sortOption} onChange={e=>setSortOption(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="featured">Sort by: Featured</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button onClick={() => alert('Load more placeholder')} className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
}
