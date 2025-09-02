import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

export default function ProductCard({ product, onToggleFavorite, onAddToCart }) {
  const { id, name, price, originalPrice, image, rating, reviews, discount, isNew, isFavorite } = product;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">NEW</span>}
          {discount && <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">-{discount}%</span>}
        </div>

        <button
          aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
          onClick={() => onToggleFavorite(id)}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200"
        >
          <Heart
            size={16}
            className={`${isFavorite ? 'text-red-500' : 'text-gray-600'} `}
            fill={isFavorite ? 'currentColor' : 'none'}
          />
        </button>

        <button
          aria-label="Add to cart"
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700"
        >
          <ShoppingCart size={16} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
          {name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">({reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-800">${price}</span>
          {originalPrice && <span className="text-sm text-gray-500 line-through">${originalPrice}</span>}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
