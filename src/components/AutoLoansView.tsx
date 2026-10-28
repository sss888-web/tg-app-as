import WebApp from "@twa-dev/sdk";
import { AUTO_LOANS } from "../data/autoLoans";
import type { ConsumerLoanOffer } from "../data/consumerLoans";
import { openPartnerLink } from "../utils/openPartnerLink";
import { AppShell } from "./AppShell";
import { ConsumerLoanTile } from "./ConsumerLoanTile";
import { PanelHead } from "./PanelHead";

type Props = {
  onBack: () => void;
};

function openOffer(offer: ConsumerLoanOffer) {
  WebApp.HapticFeedback.impactOccurred("medium");
  if (!offer.url) {
    WebApp.showAlert(`Ссылка для «${offer.title}» пока не задана.`);
    return;
  }
  openPartnerLink(offer.url);
}

export function AutoLoansView({ onBack }: Props) {
  return (
    <div className="app">
      <AppShell className="app-shell--compact">
        <div className="app-panel app-panel--flush-top">
          <button type="button" className="back-link" onClick={onBack}>
            ← На главную
          </button>
          <PanelHead
            title="Автокредиты"
            description="Кредит на покупку автомобиля. Точные условия и одобрение — на сайте банка."
          />
        </div>

        <section className="offer-section offer-section--tiles">
          <ul className="credit-cards-list">
            {AUTO_LOANS.map((item) => (
              <ConsumerLoanTile
                key={item.id}
                loan={item}
                onApply={() => openOffer(item)}
              />
            ))}
          </ul>
        </section>

        <p className="disclaimer app-shell__disclaimer">
          Не оферта. Оценивайте финансовые возможности и риски. 18+.
        </p>
      </AppShell>
    </div>
  );
}
