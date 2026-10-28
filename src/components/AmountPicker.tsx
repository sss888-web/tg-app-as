import { AMOUNT_PRESETS, formatRub } from "../data/microloanOffers";
import { PanelHead } from "./PanelHead";

type Props = {
  amount: number;
  onAmountChange: (value: number) => void;
  onSubmit: () => void;
};

export function AmountPicker({ amount, onAmountChange, onSubmit }: Props) {
  const displayAmount = amount > 0 ? formatRub(amount) : "—";

  return (
    <section className="app-panel amount-picker">
      <PanelHead
        title="Сумма займа"
        description="Подберём МФО с выгодными условиями, в том числе 0% на первый займ."
      />

      <p className="amount-display" aria-live="polite">{displayAmount}</p>

      <div className="chips" role="group" aria-label="Быстрый выбор суммы">
        {AMOUNT_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`chip ${amount === preset ? "chip--active" : ""}`}
            onClick={() => onAmountChange(preset)}
          >
            {(preset / 1000).toLocaleString("ru-RU")} тыс.
          </button>
        ))}
      </div>

      <label className="field">
        <span className="field__label">Своя сумма</span>
        <input
          className="field__input field__input--amount"
          inputMode="numeric"
          value={amount > 0 ? String(amount) : ""}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            onAmountChange(digits ? Number(digits) : 0);
          }}
          placeholder="50 000"
        />
      </label>

      <button
        type="button"
        className="btn-primary"
        disabled={amount < 1_000}
        onClick={onSubmit}
      >
        Подобрать варианты
      </button>
    </section>
  );
}
