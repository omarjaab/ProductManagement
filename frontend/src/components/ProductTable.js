import { Link } from 'react-router-dom';

export default function ProductTable({ products }) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Colours</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.productType.name}</td>
            <td>
              {product.colours.map(c => c.name).join(', ')}
            </td>
            <td>
              <Link to={`/products/${product.id}`} className="view-link">
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}