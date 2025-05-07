import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Product Manager</Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Products</Link>
          <Link to="/create" className="nav-link">Create Product</Link>
        </div>
      </div>
    </nav>
  );
}