import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

function Product({ match }) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function mount() {
      const { id } = match.params;

      const response = await api.get(`/products/${id}`);

      setProduct(response.data);
    }

    mount()
  }, []);

  return (
    <div className="product-info">
      <h1>{product.title}</h1>
      <p>{product.description}</p>

      <p>
        URL: <a href={product.url}>{product.url}</a>
      </p>
    </div>
  );
}

export default Product;