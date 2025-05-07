import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import ProductListPage from './pages/ProductListPage';
import CreateProductPage from './pages/CreateProductPage';
import ProductDetail from './components/ProductDetail';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/create" element={<CreateProductPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}