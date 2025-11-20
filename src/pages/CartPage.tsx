import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <i className="bi bi-cart-x display-1 text-muted"></i>
          <h2 className="mt-3">Tu carrito está vacío</h2>
          <p className="text-muted">Agrega algunos productos para continuar</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/')}
          >
            Explorar Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>
      <p className="text-muted">{getTotalItems()} productos en el carrito</p>
      
      <div className="row">
        <div className="col-md-8">
          {cartItems.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ height: '60px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h6 className="card-title mb-1">{item.name}</h6>
                    <p className="text-muted small mb-0">S/. {item.price}</p>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <h6 className="text-primary mb-0">S/. {item.price * item.quantity}</h6>
                  </div>
                  <div className="col-md-1">
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            className="btn btn-outline-danger"
            onClick={clearCart}
          >
            <i className="bi bi-trash me-1"></i>
            Vaciar Carrito
          </button>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Resumen de Compra</h5>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>S/. {getTotalPrice()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total:</span>
                <span className="text-primary">S/. {getTotalPrice()}</span>
              </div>
              
              {/* ✅ BOTÓN MODIFICADO */}
              <button 
                className="btn btn-success w-100 mt-3"
                onClick={() => navigate('/checkout')}
                disabled={cartItems.length === 0}
              >
                <i className="bi bi-credit-card me-2"></i>
                Finalizar Compra
              </button>
              
              <button 
                className="btn btn-outline-primary w-100 mt-2"
                onClick={() => navigate('/')}
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}