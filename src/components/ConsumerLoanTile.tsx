import { useMemo } from "react";
import { formatRub } from "../data/microloanOffers";
import { offerBannerSrc, type ConsumerLoanOffer } from "../data/consumerLoans";
import {
  formatTermsSummary,
  termsFitsSelection,
} from "../utils/consumerLoanDisplay";
import {
  estimateCreditForTerms,
  type CreditEstimateKind,
} from "../utils/creditCalc";

type Props = {
  loan: ConsumerLoanOffer;
  onApply: () => void;
  calcAmount?: number;
  calcTermMonths?: number;
  calcKind?: CreditEstimateKind;
};

export function ConsumerLoanTile({
  loan,
  onApply,
  calcAmount,
  calcTermMonths,
  calcKind = "favorable",
}: Props) {
  const terms = loan.terms;

  const paymentHint = useMemo(() => {
    if (loan.rateHidden || !terms || calcAmount == null || calcTermMonths == null) {
      return null;
    }
    if (!termsFitsSelection(terms, calcAmount, calcTermMonths)) {
      return "Сумма или срок не подходят под лимиты продукта";
    }
    const est = estimateCreditForTerms(
      calcAmount,
      calcTermMonths,
      terms,
      calcKind,
    );
    if (!est) return null;
    return `Платёж ориентировочно ${formatRub(est.monthlyPayment)}/мес.`;
  }, [terms, calcAmount, calcTermMonths, calcKind]);

  return (
    <li className="credit-card-item loan-tile">
      {loan.banner ? (
        <div className="credit-card-item__media">
          <img
            className="credit-card-item__banner"
            src={offerBannerSrc(loan)}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div className="credit-card-item__shade" aria-hidden />
        </div>
      ) : null}
      <div className="credit-card-item__body">
        <h3 className="credit-card-item__title">{loan.title}</h3>
        {terms ? (
          <p className="loan-tile__terms">
            {formatTermsSummary(terms, { hideRates: loan.rateHidden })}
          </p>
        ) : null}
        {loan.perks && loan.perks.length > 0 ? (
          <ul className="loan-tile__perks">
            {loan.perks.slice(0, 3).map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
        ) : null}
        {paymentHint ? (
          <p className="loan-tile__payment">{paymentHint}</p>
        ) : null}
        {loan.note ? (
          <p className="credit-card-item__blurb">{loan.note}</p>
        ) : null}
        {(loan.disclaimer || (loan.requirements && loan.requirements.length > 0)) ? (
          <details className="loan-tile__details">
            <summary>Подробнее об условиях</summary>
            {loan.requirements && loan.requirements.length > 0 ? (
              <ul className="loan-tile__requirements">
                {loan.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {loan.disclaimer ? (
              <p className="loan-tile__disclaimer">{loan.disclaimer}</p>
            ) : null}
          </details>
        ) : null}
        <button type="button" className="btn-primary" onClick={onApply}>
          {loan.url ? "Оформить кредит" : "Скоро"}
        </button>
      </div>
    </li>
  );
}
