import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
import './Navbar.css';

export default function Navbar() {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const itemCount = getTotalItems();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        {/* ✅ Tu logo aparecerá aquí */}
        <Logo size="md" color="light" />
        
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door me-2"></i>Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                <i className="bi bi-grid me-2"></i>Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/servicios">
                <i className="bi bi-tools me-2"></i>Servicios
              </Link>
            </li>
          </ul>
          
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={() => navigate('/login')}
              >
                <i className="bi bi-person me-2"></i>Login
              </button>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link position-relative">
                <i className="bi bi-cart3 me-2"></i>Carrito
                {itemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate-bounce">
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}