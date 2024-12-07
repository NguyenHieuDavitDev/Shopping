import React from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../components/ProductData";

function CategoryProductList() {
  const { categoryName } = useParams();
  const products = getProducts();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(categoryName.toLowerCase())
  );

  return (
    <div>
      <h2>Products: {categoryName}</h2>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price.toLocaleString()}đ</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryProductList;
