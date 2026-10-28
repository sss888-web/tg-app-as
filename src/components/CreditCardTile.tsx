import { creditCardAsset, type CreditCardOffer } from "../data/creditCards";

type Props = {
  card: CreditCardOffer;
  onApply: () => void;
};

export function CreditCardTile({ card, onApply }: Props) {
  const visual = card.banner ?? card.thumb;

  return (
    <li className="credit-card-item">
      <div className="credit-card-item__media">
        <img
          className="credit-card-item__banner"
          src={creditCardAsset(visual)}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="credit-card-item__shade" aria-hidden />
      </div>
      <div className="credit-card-item__body">
        <h3 className="credit-card-item__title">{card.title}</h3>
        <p className="credit-card-item__blurb">{card.blurb}</p>
        <ul className="credit-card-item__highlights">
          {card.highlights.slice(0, 2).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <button type="button" className="btn-primary" onClick={onApply}>
          Оформить карту
        </button>
      </div>
    </li>
  );
}
