import type { ConsumerLoanTerms } from "../data/consumerLoans";

/** Запасной ориентир, если у оффера нет ставки в данных */
export const CREDIT_RATE_FAVORABLE = 0.12;
export const CREDIT_RATE_TYPICAL = 0.22;

export type CreditEstimateKind = "favorable" | "typical";

export const CREDIT_CALC_LIMITS = {
  amountMin: 100_000,
  amountMax: 5_000_000,
  amountStep: 50_000,
  termMonthsMin: 12,
  termMonthsMax: 84,
  termMonthsStep: 6,
} as const;

export type CreditEstimate = {
  amount: number;
  termMonths: number;
  kind: CreditEstimateKind;
  annualRate: number;
  monthlyPayment: number;
  totalPaid: number;
  overpayment: number;
  summaryTitle: string;
};

export function clampCreditAmount(value: number): number {
  const { amountMin, amountMax } = CREDIT_CALC_LIMITS;
  return Math.min(amountMax, Math.max(amountMin, value));
}

export function clampCreditTermMonths(value: number): number {
  const { termMonthsMin, termMonthsMax } = CREDIT_CALC_LIMITS;
  return Math.min(
    termMonthsMax,
    Math.max(termMonthsMin, Math.round(value)),
  );
}

/** Аннуитетный платёж при фиксированной годовой ставке */
export function annuityMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number,
): number {
  if (termMonths <= 0) return 0;
  if (annualRate <= 0) return Math.round(principal / termMonths);
  const r = annualRate / 12;
  const factor = Math.pow(1 + r, termMonths);
  return Math.round((principal * r * factor) / (factor - 1));
}

export function ratePercentForTerms(
  terms: ConsumerLoanTerms,
  kind: CreditEstimateKind,
): number | null {
  if (kind === "favorable") {
    return terms.rateFrom ?? terms.pskFrom ?? null;
  }
  return (
    terms.rateTo ??
    terms.rateWithoutPromo ??
    terms.pskTo ??
    terms.rateFrom ??
    null
  );
}

export function estimateCredit(
  amount: number,
  termMonths: number,
  kind: CreditEstimateKind,
): CreditEstimate {
  const annualRate =
    kind === "favorable" ? CREDIT_RATE_FAVORABLE : CREDIT_RATE_TYPICAL;
  return buildEstimate(amount, termMonths, kind, annualRate, "Средний ориентир по рынку");
}

export function estimateCreditForTerms(
  amount: number,
  termMonths: number,
  terms: ConsumerLoanTerms,
  kind: CreditEstimateKind,
): CreditEstimate | null {
  const ratePercent = ratePercentForTerms(terms, kind);
  if (ratePercent == null) return null;

  const principal = Math.min(
    terms.amountMax,
    Math.max(terms.amountMin, amount),
  );
  const months = Math.min(
    terms.termMonthsMax,
    Math.max(terms.termMonthsMin, Math.round(termMonths)),
  );
  const annualRate = ratePercent / 100;
  const title =
    kind === "favorable"
      ? `Ориентир от ${formatRatePercent(ratePercent)} годовых`
      : `Ориентир до ${formatRatePercent(ratePercent)} годовых`;

  return buildEstimate(principal, months, kind, annualRate, title);
}

function formatRatePercent(value: number): string {
  return value % 1 === 0 ? `${value}%` : `${value.toFixed(2).replace(".", ",")}%`;
}

function buildEstimate(
  amount: number,
  termMonths: number,
  kind: CreditEstimateKind,
  annualRate: number,
  summaryTitle: string,
): CreditEstimate {
  const monthlyPayment = annuityMonthlyPayment(amount, annualRate, termMonths);
  const totalPaid = monthlyPayment * termMonths;
  const overpayment = totalPaid - amount;

  return {
    amount,
    termMonths,
    kind,
    annualRate,
    monthlyPayment,
    totalPaid,
    overpayment,
    summaryTitle,
  };
}
