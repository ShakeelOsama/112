"use client";

import FoodCard from "./FoodCard";

function ProductGrid({ products, sectionRef }) {
  if (!products || products.length === 0) {
    console.warn("No products available to display.");
    
    return null;
  }

  return (
    <div 
      ref={sectionRef}
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
    >
      {products.map((product, index) => (
        <FoodCard
          key={product.id}
          food={product}
          priority={index < 4}
        />
      ))}
    </div>
  );
}

export default ProductGrid;