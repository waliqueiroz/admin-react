/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import './styles.css';

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, children }) => {
  return (
    <div className="card">
      <img className="card-img-top" src={product.image} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          R$ {Number(product.price).toLocaleString('pt-BR')}
        </li>
      </ul>
      <div className="card-footer">{children}</div>
    </div>
  );
};

export default ProductCard;
