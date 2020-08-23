/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import './styles.css';

export interface Product {
  name: string;
  image: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card">
      <img className="card-img-top" src={product.image} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          R$ {product.price.toLocaleString('pt-BR')}
        </li>
      </ul>
      <div className="card-footer">
        <slot />
      </div>
    </div>
  );
};

export default ProductCard;
