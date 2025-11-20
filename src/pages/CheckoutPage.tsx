import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const total = getTotalPrice();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handlePayment = () => {
    clearCart();
    navigate(`/orden-exitosa?payment_intent=sim_${Date.now()}`);
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Preparando pasarela de pago...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Pasarela de Pago</h4>
            </div>
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Total: S/. {total.toFixed(2)}</h3>
              
              {/* Opciones de pago - Visual para prototipo */}
              <div className="mb-4">
                <h6 className="mb-3">Métodos de pago disponibles</h6>
                
                {/* Tarjeta - Simulada */}
                <div className="d-flex align-items-center p-3 border rounded mb-2 bg-light">
                  <i className="bi bi-credit-card me-3 fs-4 text-primary"></i>
                  <div className="flex-grow-1">
                    <strong>Tarjeta de crédito o débito</strong>
                    <small className="d-block text-muted">Visa, Mastercard, Amex, etc.</small>
                  </div>
                  <span className="badge bg-success">Aqui</span>
                </div>

                {/* PayPal - Visual desactivado */}
                <div className="d-flex align-items-center p-3 border rounded mb-2 opacity-50">
                  <i className="bi bi-paypal me-3 fs-4 text-info"></i>
                  <div className="flex-grow-1">
                    <strong>PayPal</strong>
                    <small className="d-block text-muted">Integración</small>
                  </div>
                  <span className="badge bg-secondary">Activa</span>
                </div>

                {/* Código de descuento - Visual desactivado */}
                <div className="d-flex align-items-center p-3 border rounded opacity-50">
                  <i className="bi bi-gift me-3 fs-4 text-success"></i>
                  <div className="flex-grow-1">
                    <strong>Canjear código de descuento</strong>
                    <small className="d-block text-muted">Funcionalidad en desarrollo</small>
                  </div>
                  <span className="badge bg-secondary">Activa</span>
                </div>
              </div>

              <button 
                className="btn btn-success btn-lg w-100 mt-3"
                onClick={handlePayment}
              >
                <i className="bi bi-check-circle me-2"></i>
                Procesar Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;