import { useState } from "react";
import { AppShell } from "./AppShell";
import { OfferButton } from "./OfferButton";
import type { MicroloanOffers } from "../data/offers";

type Props = {
  offers: MicroloanOffers;
  onBack: () => void;
  onConsumerCredit?: () => void;
};

export function MicroloanOffersView({
  offers,
  onBack,
  onConsumerCredit,
}: Props) {
  const [showFallbacks, setShowFallbacks] = useState(false);

  return (
    <div className="app">
      <AppShell className="app-shell--compact">
        <div className="app-panel app-panel--flush-top">
          <button type="button" className="back-link" onClick={onBack}>
            ← Изменить сумму
          </button>
          <p className="offer-intro__headline">{offers.headline}</p>
          <p className="hint offer-intro__subtitle">{offers.subtitle}</p>
        </div>

        {offers.suggestConsumerCredit ? (
          <div className="app-panel">
            <p style={{ margin: "0 0 12px" }}>
              Микрозаймы в подборке рассчитаны до 100 000 ₽. Для большей суммы
              откройте раздел потребительского кредитования.
            </p>
            {onConsumerCredit && (
              <button
                type="button"
                className="btn-primary"
                onClick={onConsumerCredit}
              >
                Потребительский кредит
              </button>
            )}
          </div>
        ) : (
          <>
            {offers.sections.map((section) => (
              <section key={section.title} className="offer-section">
                <h3 className="offer-section__title">{section.title}</h3>
                <ul className="lender-list">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <OfferButton item={item} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <div className="app-panel offer-fallbacks">
              {!showFallbacks ? (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowFallbacks(true)}
                >
                  Не взял — другие варианты
                </button>
              ) : (
                <>
                  <h3 className="offer-section__title">Дополнительно</h3>
                  <ul className="lender-list">
                    {offers.fallbacks.map((item) => (
                      <li key={item.id}>
                        <OfferButton item={item} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <p className="hint offer-footer">
              Ниже варианты — откройте подходящий. 18+.
            </p>
          </>
        )}
      </AppShell>
    </div>
  );
}
