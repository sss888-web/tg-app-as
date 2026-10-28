import WebApp from "@twa-dev/sdk";
import type { Product } from "../data/products";

type Props = {
  product: Product;
  onBack: () => void;
  onApply: () => void;
};

export function ProductDetail({ product, onBack, onApply }: Props) {
  const openChannel = () => {
    const url = import.meta.env.VITE_CHANNEL_URL as string | undefined;
    if (url) WebApp.openTelegramLink(url);
    else WebApp.showAlert("Добавьте VITE_CHANNEL_URL в .env");
  };

  return (
    <div className="screen">
      <button type="button" className="back-link" onClick={onBack}>
        ← Все продукты
      </button>

      <div className="hero card">
        <span className="hero__emoji" aria-hidden>{product.emoji}</span>
        <h2 className="hero__title">{product.title}</h2>
        <p className="hero__tagline">{product.tagline}</p>
      </div>

      <div className="stats">
        <div className="stat card">
          <span className="stat__label">Сумма</span>
          <span className="stat__value">{product.amount}</span>
        </div>
        <div className="stat card">
          <span className="stat__label">Срок</span>
          <span className="stat__value">{product.term}</span>
        </div>
      </div>

      <div className="card">
        <h3 className="card__heading">Преимущества</h3>
        <ul className="feature-list">
          {product.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      <button type="button" className="btn-primary" onClick={onApply}>
        Оформить заявку
      </button>
      <button type="button" className="btn-secondary" onClick={openChannel}>
        Новости и акции в канале
      </button>
    </div>
  );
}
