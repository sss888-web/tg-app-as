export type LoanKind = "first" | "repeat";

/** Ориентир для повторного займа (~0,8% в день), не оферта */
export const REPEAT_DAILY_RATE = 0.008;

export const CALC_LIMITS = {
  amountMin: 3_000,
  amountMax: 100_000,
  amountStep: 1_000,
  termMin: 7,
  termMax: 30,
  termStep: 1,
} as const;

export type LoanEstimate = {
  amount: number;
  termDays: number;
  kind: LoanKind;
  overpayment: number;
  total: number;
  summaryTitle: string;
};

export function estimateLoan(
  amount: number,
  termDays: number,
  kind: LoanKind,
): LoanEstimate {
  const overpayment =
    kind === "first"
      ? 0
      : Math.round(amount * REPEAT_DAILY_RATE * termDays);

  return {
    amount,
    termDays,
    kind,
    overpayment,
    total: amount + overpayment,
    summaryTitle:
      kind === "first"
        ? "Первый займ (ориентир)"
        : "Повторный займ (ориентир)",
  };
}

export function clampAmount(value: number): number {
  const { amountMin, amountMax } = CALC_LIMITS;
  return Math.min(amountMax, Math.max(amountMin, value));
}

export function clampTerm(value: number): number {
  const { termMin, termMax } = CALC_LIMITS;
  return Math.min(termMax, Math.max(termMin, Math.round(value)));
}
