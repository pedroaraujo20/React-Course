import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

function Main() {
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {    
    loadProducts();
  }, []);

  async function loadProducts(page = 1) {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo  } = response.data;
    setProducts(docs);
    setProductInfo(productInfo);
  }

  function prevPage() {
    if(page === 1) return;
    const pageNumber = page - 1;    
    setPage(pageNumber);
    loadProducts(pageNumber);
  }

  function nextPage() {
    if (page === productInfo.pages) return;
    const pageNumber = page + 1;    
    setPage(pageNumber);
    loadProducts(pageNumber);   
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <article key={product._id}>
          <strong>{product.title}</strong>
          <p>{product.description}</p>
          <Link to={`/products/${product._id}`}>Acessar</Link>
        </article>
      ))}
      <div className="actions">
        <button disabled={page === 1} onClick={prevPage}>Anterior</button>
        <button disabled={page === productInfo.pages} onClick={nextPage}>Próxima</button>
      </div>
    </div>
  );
}

export default Main;