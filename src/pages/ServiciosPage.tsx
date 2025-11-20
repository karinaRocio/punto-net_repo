import { Link } from 'react-router-dom';

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  cta: string;
  path: string;
}

const ServiciosPage: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      title: 'Compra Protegida',
      description: 'Tu dinero está seguro hasta que confirmes la recepción',
      features: ['Retención 7 días', 'Disputas 24h', 'Reembolso garantizado'],
      cta: 'Saber más',
      path: '/servicios/compra-protegida'
    },
    {
      id: 2,
      title: 'Envío Express',
      description: 'Recibe tus productos en 24-48 horas',
      features: ['Rastreo en tiempo real', 'Seguro incluido', 'Entrega sin contacto'],
      cta: 'Calcular costo',
      path: '/servicios/envio'
    },
    {
      id: 3,
      title: 'Pagos Seguros',
      description: 'Tecnología Stripe con encriptación',
      features: ['PCI DSS compliance', 'Sin almacenar datos', '3D Secure'],
      cta: 'Métodos de pago',
      path: '/servicios/pagos'
    },
    {
      id: 4,
      title: 'Garantía Extendida',
      description: 'Protege tu compra hasta 12 meses adicionales',
      features: ['Cobertura total', 'Soporte técnico', 'Reemplazo inmediato'],
      cta: 'Activar garantía',
      path: '/servicios/garantia'
    },
    {
      id: 5,
      title: 'Soporte 24/7',
      description: 'Ayuda personalizada cuando la necesites',
      features: ['WhatsApp directo', 'Chat en vivo', 'Respuesta 15 min'],
      cta: 'Contactar ahora',
      path: '/servicios/soporte'
    },
    {
      id: 6,
      title: 'PuntoNet Plus',
      description: 'Suscripción premium con beneficios exclusivos',
      features: ['Envíos gratis ilimitados', '5% cashback', 'Acceso anticipado'],
      cta: 'Suscribirme',
      path: '/servicios/plus'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero minimalista */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-light text-gray-900 mb-4">
            Servicios PuntoNet
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Compra y vende con la confianza de nuestro ecosistema seguro
          </p>
        </div>
      </div>

      {/* Servicios en lista moderna */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-xl mb-8 p-8 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-start gap-6">
                <div className="text-5xl flex-shrink-0">{service.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feat, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={service.path}
                    className="inline-block text-blue-600 font-medium hover:text-blue-700"
                  >
                    {service.cta} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ⭐⭐⭐ ESTA LÍNEA ES OBLIGATORIA ⭐⭐⭐
export default ServiciosPage;