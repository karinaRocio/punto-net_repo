import React from 'react';
import './FilterSidebar.css';

interface FilterSidebarProps {
  filters: {
    priceRanges: string[];
    brands: string[];
    rating: number | null;
  };
  onPriceChange: (range: string) => void;
  onBrandChange: (brand: string) => void;
  onRatingChange: (rating: number | null) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export default function FilterSidebar({ 
  filters, 
  onPriceChange, 
  onBrandChange, 
  onRatingChange, 
  onClearFilters,
  activeFiltersCount 
}: FilterSidebarProps) {
  const priceRanges = [
    { id: '0-500', label: 'Menos de S/. 500', min: 0, max: 500 },
    { id: '500-1000', label: 'S/. 500 - S/. 1,000', min: 500, max: 1000 },
    { id: '1000-2500', label: 'S/. 1,000 - S/. 2,500', min: 1000, max: 2500 },
    { id: '3000+', label: 'Más de S/. 3,000', min: 3000, max: Infinity },
  ];

  const brands = ['Dell', 'HP', 'Victus', 'Apple', 'Asus', 'Lenovo', 'Logitech', 'Corsair', 'Samsung', 'Garmin'];
  
  const ratings = [
    { id: 4, label: '★★★★☆ y más', minRating: 4 },
    { id: 3, label: '★★★☆☆ y más', minRating: 3 },
  ];

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h5 className="mb-0">Filtros</h5>
        {activeFiltersCount > 0 && (
          <button className="btn btn-link btn-sm" onClick={onClearFilters}>
            Limpiar
          </button>
        )}
      </div>

      {/* Filtro de Precio */}
      <div className="filter-section">
        <h6 className="filter-title">Precio</h6>
        <div className="filter-options">
          {priceRanges.map(range => (
            <div key={range.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`price-${range.id}`}
                checked={filters.priceRanges.includes(range.id)}
                onChange={() => onPriceChange(range.id)}
              />
              <label className="form-check-label" htmlFor={`price-${range.id}`}>
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Filtro de Marca */}
      <div className="filter-section">
        <h6 className="filter-title">Marca</h6>
        <div className="filter-options">
          {brands.map(brand => (
            <div key={brand} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onChange={() => onBrandChange(brand)}
              />
              <label className="form-check-label" htmlFor={`brand-${brand}`}>
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Filtro de Calificación */}
      <div className="filter-section">
        <h6 className="filter-title">Calificación</h6>
        <div className="filter-options">
          {ratings.map(rating => (
            <div key={rating.id} className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id={`rating-${rating.id}`}
                name="rating"
                checked={filters.rating === rating.minRating}
                onChange={() => onRatingChange(rating.minRating)}
              />
              <label className="form-check-label" htmlFor={`rating-${rating.id}`}>
                {rating.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}