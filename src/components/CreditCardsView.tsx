import WebApp from "@twa-dev/sdk";
import { CREDIT_CARDS, type CreditCardOffer } from "../data/creditCards";
import { openPartnerLink } from "../utils/openPartnerLink";
import { AppShell } from "./AppShell";
import { CreditCardTile } from "./CreditCardTile";
import { PanelHead } from "./PanelHead";

type Props = {
  onBack: () => void;
};

function openCard(offer: CreditCardOffer) {
  WebApp.HapticFeedback.impactOccurred("medium");
  openPartnerLink(offer.url);
}

export function CreditCardsView({ onBack }: Props) {
  return (
    <div className="app">
      <AppShell className="app-shell--compact">
        <div className="app-panel app-panel--flush-top">
          <button type="button" className="back-link" onClick={onBack}>
            ← На главную
          </button>
          <PanelHead
            title="Кредитные карты"
            description="Кредитные карты и рассрочка. Условия и ПСК — на сайте банка."
          />
        </div>

        <ul className="credit-cards-list">
          {CREDIT_CARDS.map((card) => (
            <CreditCardTile
              key={card.id}
              card={card}
              onApply={() => openCard(card)}
            />
          ))}
        </ul>

        <p className="disclaimer app-shell__disclaimer">
          Оценивайте финансовые возможности и риски. Условия и ПСК — на сайтах банков.
          Не является публичной офертой. 18+.
        </p>
      </AppShell>
    </div>
  );
}
