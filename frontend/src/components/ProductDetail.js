import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetails } from '../api/productApi';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductDetails(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <h2>Product Details</h2>
      
      <div className="detail-item">
        <strong>ID:</strong> {product.id}
      </div>
      
      <div className="detail-item">
        <strong>Name:</strong> {product.name}
      </div>
      
      <div className="detail-item">
        <strong>Type:</strong> {product.productType.name}
      </div>
      
      <div className="detail-item">
        <strong>Colours:</strong> {product.colours.map(c => c.name).join(', ')}
      </div>
      
      <Link to="/" className="back-link">
        Back to Products
      </Link>
    </div>
  );
}