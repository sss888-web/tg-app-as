import { BENEFITS } from "../data/brand";

export function BenefitsList() {
  return (
    <section className="benefits" aria-label="Преимущества сервиса">
      <div className="benefits__rail">
        {BENEFITS.map((item) => (
          <article key={item.label} className="benefit-chip">
            <p className="benefit-chip__kicker">{item.kicker}</p>
            <p className="benefit-chip__label">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
