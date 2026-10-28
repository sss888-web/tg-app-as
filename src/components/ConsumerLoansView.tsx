import { useState } from "react";
import WebApp from "@twa-dev/sdk";
import {
  CONSUMER_LOAN_SECTIONS,
  loansByCategory,
  type ConsumerLoanOffer,
} from "../data/consumerLoans";
import type { CreditEstimateKind } from "../utils/creditCalc";
import { openPartnerLink } from "../utils/openPartnerLink";
import { AppShell } from "./AppShell";
import { ConsumerLoanTile } from "./ConsumerLoanTile";
import { CreditCalculator } from "./CreditCalculator";
import { PanelHead } from "./PanelHead";

type Props = {
  onBack: () => void;
};

function openLoan(offer: ConsumerLoanOffer) {
  WebApp.HapticFeedback.impactOccurred("medium");
  if (!offer.url) {
    WebApp.showAlert(
      `Ссылка для «${offer.title}» пока не задана.\n\nID Unicom: ${offer.unicomId}`,
    );
    return;
  }
  openPartnerLink(offer.url);
}

export function ConsumerLoansView({ onBack }: Props) {
  const [calcAmount, setCalcAmount] = useState(500_000);
  const [calcTermMonths, setCalcTermMonths] = useState(36);
  const [calcKind, setCalcKind] = useState<CreditEstimateKind>("favorable");

  const scrollToOffers = () => {
    document.getElementById("consumer-offers")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="app">
      <AppShell className="app-shell--compact">
        <div className="app-panel app-panel--flush-top">
          <button type="button" className="back-link" onClick={onBack}>
            ← На главную
          </button>
          <PanelHead
            title="Кредиты"
            description="Потребительские кредиты банков. Условия и ПСК — на сайте банка."
          />
        </div>

        <CreditCalculator
          amount={calcAmount}
          termMonths={calcTermMonths}
          kind={calcKind}
          onAmountChange={setCalcAmount}
          onTermMonthsChange={setCalcTermMonths}
          onKindChange={setCalcKind}
          onBrowseOffers={scrollToOffers}
        />

        <div id="consumer-offers">
        {CONSUMER_LOAN_SECTIONS.map((section) => {
          const items = loansByCategory(section.category);
          if (items.length === 0) return null;
          return (
            <section key={section.category} className="offer-section offer-section--tiles">
              <h3 className="offer-section__title">{section.title}</h3>
              <ul className="credit-cards-list">
                {items.map((item) => (
                  <ConsumerLoanTile
                    key={item.id}
                    loan={item}
                    calcAmount={calcAmount}
                    calcTermMonths={calcTermMonths}
                    calcKind={calcKind}
                    onApply={() => openLoan(item)}
                  />
                ))}
              </ul>
            </section>
          );
        })}
        </div>

        <p className="disclaimer app-shell__disclaimer">
          Не оферта. Ставка, ПСК и одобрение определяет банк. 18+.
        </p>
      </AppShell>
    </div>
  );
}
