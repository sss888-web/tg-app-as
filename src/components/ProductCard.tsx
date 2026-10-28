import type { Product } from "../data/products";

type Props = {
  product: Product;
  onSelect: () => void;
};

export function ProductCard({ product, onSelect }: Props) {
  return (
    <button type="button" className="product-card" onClick={onSelect}>
      <span className="product-card__icon" aria-hidden>{product.emoji}</span>
      <span className="product-card__body">
        <span className="product-card__title-row">
          <span className="product-card__title">{product.title}</span>
          {product.badge ? (
            <span className="product-card__badge">{product.badge}</span>
          ) : null}
        </span>
        {product.highlight ? (
          <span className="product-card__highlight">{product.highlight}</span>
        ) : null}
        <span className="product-card__tagline">{product.tagline}</span>
      </span>
      <span className="product-card__chevron" aria-hidden>›</span>
    </button>
  );
}
