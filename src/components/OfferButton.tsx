import WebApp from "@twa-dev/sdk";
import { openPartnerLink } from "../utils/openPartnerLink";
import { offerLogoSrc, type FallbackOffer, type Offer } from "../data/offers";

type Item = Offer | FallbackOffer;

type Props = {
  item: Item;
};

function openOffer(item: Item) {
  WebApp.HapticFeedback.impactOccurred("light");
  openPartnerLink(item.url);
}

export function OfferButton({ item }: Props) {
  const blurb = "blurb" in item ? item.blurb : "";

  return (
    <button type="button" className="offer-btn" onClick={() => openOffer(item)}>
      <img
        className="offer-btn__logo"
        src={offerLogoSrc(item.logo)}
        alt=""
        width={48}
        height={48}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="offer-btn__body">
        <span className="offer-btn__title">{item.title}</span>
        {blurb ? <span className="offer-btn__blurb">{blurb}</span> : null}
      </span>
      <span className="offer-btn__action">Открыть</span>
    </button>
  );
}
