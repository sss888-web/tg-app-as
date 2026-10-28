import { useMemo } from "react";
import { formatRub } from "../data/microloanOffers";
import {
  CREDIT_CALC_LIMITS,
  clampCreditAmount,
  clampCreditTermMonths,
  estimateCredit,
  type CreditEstimateKind,
} from "../utils/creditCalc";
import { PanelHead } from "./PanelHead";

type Props = {
  amount: number;
  termMonths: number;
  kind: CreditEstimateKind;
  onAmountChange: (value: number) => void;
  onTermMonthsChange: (value: number) => void;
  onKindChange: (value: CreditEstimateKind) => void;
  onBrowseOffers?: () => void;
};

function formatInputNumber(n: number): string {
  return n.toLocaleString("ru-RU");
}

export function CreditCalculator({
  amount,
  termMonths,
  kind,
  onAmountChange,
  onTermMonthsChange,
  onKindChange,
  onBrowseOffers,
}: Props) {
  const safeAmount = clampCreditAmount(amount);
  const safeTerm = clampCreditTermMonths(termMonths);

  const estimate = useMemo(
    () => estimateCredit(safeAmount, safeTerm, kind),
    [safeAmount, safeTerm, kind],
  );

  const setAmountSafe = (value: number) => {
    onAmountChange(clampCreditAmount(value));
  };

  return (
    <section className="app-panel loan-calculator">
      <PanelHead
        title="Калькулятор кредита"
        description="Общий ориентир. На карточках ниже — расчёт по указанным ставкам банков."
      />

      <div className="calc-card">
        <div className="calc-tabs" role="tablist" aria-label="Ориентир ставки">
          <button
            type="button"
            role="tab"
            aria-selected={kind === "favorable"}
            className={`calc-tab ${kind === "favorable" ? "calc-tab--active" : ""}`}
            onClick={() => onKindChange("favorable")}
          >
            Мин. ставка
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={kind === "typical"}
            className={`calc-tab ${kind === "typical" ? "calc-tab--active" : ""}`}
            onClick={() => onKindChange("typical")}
          >
            Макс. ориентир
          </button>
        </div>

        <div className="calc-field">
          <div className="calc-field__row">
            <span className="calc-field__label">Сумма, ₽</span>
            <span className="calc-field__value">
              до {formatInputNumber(CREDIT_CALC_LIMITS.amountMax)}
            </span>
          </div>
          <input
            type="range"
            className="calc-range"
            min={CREDIT_CALC_LIMITS.amountMin}
            max={CREDIT_CALC_LIMITS.amountMax}
            step={CREDIT_CALC_LIMITS.amountStep}
            value={safeAmount}
            onChange={(e) => setAmountSafe(Number(e.target.value))}
            aria-label="Сумма кредита"
          />
          <input
            className="calc-input"
            inputMode="numeric"
            value={formatInputNumber(safeAmount)}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              setAmountSafe(
                digits ? Number(digits) : CREDIT_CALC_LIMITS.amountMin,
              );
            }}
            aria-label="Сумма в рублях"
          />
        </div>

        <div className="calc-field">
          <div className="calc-field__row">
            <span className="calc-field__label">Срок, мес.</span>
            <span className="calc-field__value">{safeTerm}</span>
          </div>
          <input
            type="range"
            className="calc-range"
            min={CREDIT_CALC_LIMITS.termMonthsMin}
            max={CREDIT_CALC_LIMITS.termMonthsMax}
            step={CREDIT_CALC_LIMITS.termMonthsStep}
            value={safeTerm}
            onChange={(e) =>
              onTermMonthsChange(clampCreditTermMonths(Number(e.target.value)))
            }
            aria-label="Срок кредита в месяцах"
          />
        </div>

        <div className="calc-summary">
          <p className="calc-summary__title">{estimate.summaryTitle}</p>
          <dl className="calc-summary__rows">
            <div className="calc-summary__row">
              <dt>Сумма</dt>
              <dd>{formatRub(estimate.amount)}</dd>
            </div>
            <div className="calc-summary__row">
              <dt>Срок</dt>
              <dd>{estimate.termMonths} мес.</dd>
            </div>
            <div className="calc-summary__row">
              <dt>Переплата</dt>
              <dd>{formatRub(estimate.overpayment)}</dd>
            </div>
          </dl>
          <div className="calc-summary__total">
            <span>Платёж в месяц</span>
            <strong>{formatRub(estimate.monthlyPayment)}</strong>
          </div>
        </div>

        <p className="calc-legal">
          Платёж в месяц посчитан по ставкам из блока с банком ниже — у вас
          после заявки могут быть другие цифры. Перед оформлением смотрите
          условия на сайте банка и оцените, потянете ли вы платежи.
        </p>

        {onBrowseOffers ? (
          <button
            type="button"
            className="btn-primary calc-submit"
            onClick={onBrowseOffers}
          >
            К предложениям банков
          </button>
        ) : null}
      </div>
    </section>
  );
}
