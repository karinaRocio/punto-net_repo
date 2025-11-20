import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    alert(`${product.name} agregado al carrito!`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img 
          src={product.image} 
          className="card-img-top" 
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted small flex-grow-1">
            {product.description}
          </p>
          <div className="mt-auto">
            <p className="card-text fw-bold text-primary fs-5">S/. {product.price}</p>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary btn-sm flex-fill"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                Ver detalles
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleAddToCart}
              >
                <i className="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}