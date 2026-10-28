import type { ConsumerLoanTerms } from "../data/consumerLoans";

export function formatAmountShort(rub: number): string {
  if (rub >= 1_000_000) {
    const m = rub / 1_000_000;
    return Number.isInteger(m) ? `${m} млн` : `${m.toFixed(1).replace(".", ",")} млн`;
  }
  return `${(rub / 1_000).toFixed(0)} тыс.`;
}

export function formatTermsSummary(
  terms: ConsumerLoanTerms,
  options?: { hideRates?: boolean },
): string {
  const parts: string[] = [
    `${formatAmountShort(terms.amountMin)}–${formatAmountShort(terms.amountMax)} ₽`,
    `${terms.termMonthsMin}–${terms.termMonthsMax} мес.`,
  ];
  if (options?.hideRates) {
    return parts.join(" · ");
  }
  if (terms.rateFrom != null) {
    if (terms.rateTo != null && terms.rateTo !== terms.rateFrom) {
      parts.push(`ставка ${terms.rateFrom}–${terms.rateTo}%`);
    } else {
      parts.push(`от ${terms.rateFrom}%`);
    }
  }
  if (terms.pskFrom != null && terms.pskTo != null) {
    parts.push(`ПСК ${terms.pskFrom}–${terms.pskTo}%`);
  }
  return parts.join(" · ");
}

export function clampAmountForTerms(
  value: number,
  terms: ConsumerLoanTerms,
): number {
  return Math.min(terms.amountMax, Math.max(terms.amountMin, value));
}

export function clampTermForTerms(
  value: number,
  terms: ConsumerLoanTerms,
): number {
  return Math.min(
    terms.termMonthsMax,
    Math.max(terms.termMonthsMin, Math.round(value)),
  );
}

export function termsFitsSelection(
  terms: ConsumerLoanTerms,
  amount: number,
  termMonths: number,
): boolean {
  return (
    amount >= terms.amountMin &&
    amount <= terms.amountMax &&
    termMonths >= terms.termMonthsMin &&
    termMonths <= terms.termMonthsMax
  );
}
