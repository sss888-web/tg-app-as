import { useMemo, useState } from "react";
import { formatRub } from "../data/microloanOffers";
import {
  CALC_LIMITS,
  clampAmount,
  clampTerm,
  estimateLoan,
  type LoanKind,
} from "../utils/loanCalc";
import { PanelHead } from "./PanelHead";

type Props = {
  amount: number;
  onAmountChange: (value: number) => void;
  onSubmit: () => void;
};

function formatInputNumber(n: number): string {
  return n.toLocaleString("ru-RU");
}

export function LoanCalculator({ amount, onAmountChange, onSubmit }: Props) {
  const [kind, setKind] = useState<LoanKind>("first");
  const [termDays, setTermDays] = useState(14);

  const safeAmount = clampAmount(amount || CALC_LIMITS.amountMin);
  const safeTerm = clampTerm(termDays);

  const estimate = useMemo(
    () => estimateLoan(safeAmount, safeTerm, kind),
    [safeAmount, safeTerm, kind],
  );

  const setAmountSafe = (value: number) => {
    onAmountChange(clampAmount(value));
  };

  return (
    <section className="app-panel loan-calculator">
      <PanelHead
        title="Калькулятор займа"
        description="Примерный расчёт. Точные условия и проценты — на сайте МФО."
        align="center"
      />

      <div className="calc-card">
        <div className="calc-tabs" role="tablist" aria-label="Тип займа">
          <button
            type="button"
            role="tab"
            aria-selected={kind === "first"}
            className={`calc-tab ${kind === "first" ? "calc-tab--active" : ""}`}
            onClick={() => setKind("first")}
          >
            Первый займ
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={kind === "repeat"}
            className={`calc-tab ${kind === "repeat" ? "calc-tab--active" : ""}`}
            onClick={() => setKind("repeat")}
          >
            Повторный
          </button>
        </div>

        <div className="calc-field">
          <div className="calc-field__row">
            <span className="calc-field__label">Сумма, ₽</span>
            <span className="calc-field__value">
              {formatInputNumber(CALC_LIMITS.amountMax)}
            </span>
          </div>
          <input
            type="range"
            className="calc-range"
            min={CALC_LIMITS.amountMin}
            max={CALC_LIMITS.amountMax}
            step={CALC_LIMITS.amountStep}
            value={safeAmount}
            onChange={(e) => setAmountSafe(Number(e.target.value))}
            aria-label="Сумма займа"
          />
          <input
            className="calc-input"
            inputMode="numeric"
            value={formatInputNumber(safeAmount)}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              setAmountSafe(digits ? Number(digits) : CALC_LIMITS.amountMin);
            }}
            aria-label="Сумма в рублях"
          />
        </div>

        <div className="calc-field">
          <div className="calc-field__row">
            <span className="calc-field__label">Срок, дней</span>
            <span className="calc-field__value">{safeTerm}</span>
          </div>
          <input
            type="range"
            className="calc-range"
            min={CALC_LIMITS.termMin}
            max={CALC_LIMITS.termMax}
            step={CALC_LIMITS.termStep}
            value={safeTerm}
            onChange={(e) => setTermDays(clampTerm(Number(e.target.value)))}
            aria-label="Срок займа в днях"
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
              <dd>{estimate.termDays} дн.</dd>
            </div>
            <div className="calc-summary__row">
              <dt>Переплата</dt>
              <dd>{formatRub(estimate.overpayment)}</dd>
            </div>
          </dl>
          <div className="calc-summary__total">
            <span>К возврату</span>
            <strong>{formatRub(estimate.total)}</strong>
          </div>
        </div>

        <p className="calc-legal">
          Это предварительный ориентир, не оферта. Финальные условия смотрите при
          оформлении.
        </p>

        <button
          type="button"
          className="btn-primary calc-submit"
          onClick={onSubmit}
        >
          Подобрать варианты
        </button>
      </div>
    </section>
  );
}
