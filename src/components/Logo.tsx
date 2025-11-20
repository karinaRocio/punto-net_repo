import { Link } from 'react-router-dom';
import logo from '../img/logo.png'; // ✅ RUTA CORRECTA - sin "scr"
import './Logo.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'light' | 'dark';
  showTagline?: boolean;
}

export default function Logo({ size = 'md', color = 'light', showTagline = false }: LogoProps) {
  return (
    <Link to="/" className={`logo logo--${size} logo--${color}`}>
      <img src={logo} alt="PuntoNet" className="logo__image" />
      {showTagline && <span className="logo__tagline">Compra y vende con confianza</span>}
    </Link>
  );
}