import { BRAND } from "../data/brand";

type Props = {
  greeting?: string;
};

export function BrandHero({ greeting }: Props) {
  return (
    <header className="brand-hero">
      <div className="brand-hero__visual">
        <img
          className="brand-hero__cover"
          src={BRAND.heroSrc}
          alt=""
          width={480}
          height={270}
          loading="eager"
        />
        <div className="brand-hero__scrim" aria-hidden />
      </div>

      <div className="brand-hero__sheet">
        <div className="brand-hero__identity">
          <img
            className="brand-hero__logo"
            src={BRAND.logoSrc}
            alt=""
            width={52}
            height={52}
          />
          <div className="brand-hero__meta">
            <p className="brand-hero__subtitle">{BRAND.subtitle}</p>
            <h1 className="brand-hero__title">{BRAND.name}</h1>
          </div>
          <span className="brand-hero__badge">0%</span>
        </div>
        <p className="brand-hero__tagline">{BRAND.tagline}</p>
        {greeting ? <p className="hint brand-hero__greeting">{greeting}</p> : null}
      </div>
    </header>
  );
}
