import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import './AuthPages.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (email === 'usuario@punto.net' && password === '123456') {
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify({ email, name: 'Usuario Demo' }));
        }
        sessionStorage.setItem('isAuthenticated', 'true');
        navigate('/');
      } else {
        setError('Credenciales incorrectas. Usa: usuario@punto.net / 123456');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('usuario@punto.net');
    setPassword('123456');
  };

  return (
    <div className="auth-container">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          {/* Logo centrado y responsive */}
          <div className="auth-logo">
            <Logo size="lg" color="dark" showTagline={true} />
          </div>

          <div className="card auth-card">
            <div className="card-body">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              <p className="text-center text-muted mb-4">Accede a tu cuenta PuntoNet</p>
              
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              <div className="alert alert-info alert-dismissible fade show">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <small><strong>Demo:</strong> usuario@punto.net / 123456</small>
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleDemoLogin}>
                    Usar demo
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                  <div className="form-check mb-0">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Recordarme
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-decoration-none">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 btn-lg mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Iniciando sesión...
                    </>
                  ) : (
                    'Ingresar'
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span>O continúa con</span>
              </div>

              <div className="d-grid gap-2 mb-3">
                <button type="button" className="btn btn-outline-dark">
                  <i className="bi bi-google me-2"></i>Google
                </button>
                <button type="button" className="btn btn-outline-primary">
                  <i className="bi bi-facebook me-2"></i>Facebook
                </button>
              </div>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="text-muted mb-3">¿No tienes una cuenta?</p>
                <Link to="/register" className="btn btn-outline-success w-100">
                  <i className="bi bi-person-plus me-2"></i>Crear Cuenta
                </Link>
              </div>

              <div className="text-center mt-4">
                <small className="text-muted">
                  Al iniciar sesión aceptas nuestros{' '}
                  <a href="/terms" className="text-decoration-none">Términos</a>
                  {' '}y{' '}
                  <a href="/privacy" className="text-decoration-none">Privacidad</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}