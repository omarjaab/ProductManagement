import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductTable from '../components/ProductTable';
import { getProducts, getProductDetails } from '../api/productApi';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const basicProducts = await getProducts();
        
        const detailedProducts = await Promise.all(
          basicProducts.map(p => getProductDetails(p.id))
        );
        
        setProducts(detailedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  return (
    <div className="product-list-page">
      <div className="page-header">
        <h1>Products</h1>
        <Link to="/create" className="create-button">
          Create New Product
        </Link>
      </div>
      
      {loading && <p>Loading products...</p>}
      {error && <p className="error">Error: {error}</p>}
      
      {!loading && !error && (
        <ProductTable products={products} />
      )}
    </div>
  );
}