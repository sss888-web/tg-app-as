export type Offer = {
  id: string;
  title: string;
  url: string;
  logo: string;
  min: number;
  max: number;
  zeroFirst: boolean;
  priority?: boolean;
  blurb: string;
};

export type FallbackOffer = {
  id: string;
  title: string;
  url: string;
  logo: string;
  blurb: string;
};

export type OfferSection = {
  title: string;
  items: Offer[];
};

export type MicroloanOffers = {
  amount: number;
  headline: string;
  subtitle: string;
  sections: OfferSection[];
  fallbacks: FallbackOffer[];
  suggestConsumerCredit?: boolean;
};

export const OFFERS: Offer[] = [
  {
    id: "moneyman",
    title: "MoneyMan",
    url: "https://lig.su/a7T",
    logo: "moneyman.png",
    min: 1500,
    max: 100_000,
    zeroFirst: true,
    priority: true,
    blurb: "первый до 30к — 0%, до 100к повторным",
  },
  {
    id: "webzaim",
    title: "Веб-Займ",
    url: "https://lig.su/a7R",
    logo: "webzaim.png",
    min: 1500,
    max: 30_000,
    zeroFirst: true,
    blurb: "первый 0%, 7–30 дн.",
  },
  {
    id: "zaymer",
    title: "Займер",
    url: "https://lig.su/a7U",
    logo: "zaymer.png",
    min: 2000,
    max: 30_000,
    zeroFirst: true,
    blurb: "первый 0%, повтор 0.8%",
  },
  {
    id: "alfadengi",
    title: "Альфа Деньги",
    url: "https://lig.su/a7W",
    logo: "alfadengi.png",
    min: 2000,
    max: 50_000,
    zeroFirst: true,
    blurb: "первый 0% на 7–21 день",
  },
  {
    id: "bystrodengi",
    title: "Быстроденьги",
    url: "https://lig.su/a7Y",
    logo: "bystrodengi.png",
    min: 3000,
    max: 40_000,
    zeroFirst: true,
    blurb: "первый 0% на 10 дней",
  },
  {
    id: "kekas",
    title: "Кекас.ру",
    url: "https://lig.su/a7Z",
    logo: "kekas.png",
    min: 1000,
    max: 30_000,
    zeroFirst: true,
    blurb: "0–0.8% в день",
  },
  {
    id: "maxcredit",
    title: "Max Credit",
    url: "https://lig.su/a7X",
    logo: "maxcredit.png",
    min: 5000,
    max: 30_000,
    zeroFirst: false,
    blurb: "первый до 7к",
  },
  {
    id: "dozarplaty",
    title: "До Зарплаты",
    url: "https://lig.su/a80",
    logo: "dozarplaty.png",
    min: 1000,
    max: 100_000,
    zeroFirst: true,
    blurb: "до 100к, срок до года",
  },
  {
    id: "platiza",
    title: "Platiza",
    url: "https://lig.su/a82",
    logo: "platiza.png",
    min: 1000,
    max: 100_000,
    zeroFirst: true,
    blurb: "до 100к, первый до 15к",
  },
];

/** Цепочка после «Не взял»: сначала Fin5, потом Т-Заем. */
export const FALLBACKS: FallbackOffer[] = [
  {
    id: "fin5",
    title: "Fin5",
    url: "https://lig.su/a84",
    logo: "fin5.png",
    blurb: "2 000 – 30 000 ₽, 16–31 день",
  },
  {
    id: "tzaem",
    title: "Т-Заем",
    url: "https://lig.su/a83",
    logo: "tzaem.png",
    blurb: "1 000 – 500 000 ₽, 1–365 дней, 21–80 лет",
  },
];

export function formatAmount(n: number): string {
  return new Intl.NumberFormat("ru-RU").format(n);
}

export function formatRub(amount: number): string {
  return `${formatAmount(amount)} ₽`;
}

export function offerLogoSrc(logo: string): string {
  return `./offers/${logo}`;
}

export function offersForAmount(amount: number): Offer[] {
  const list = OFFERS.filter((o) => {
    if (amount < o.min || amount > o.max) return false;
    if (amount <= 30_000) return o.max <= 50_000 || Boolean(o.priority);
    return o.max > 30_000;
  });

  return list.sort((a, b) => {
    if (a.priority && !b.priority) return -1;
    if (!a.priority && b.priority) return 1;
    if (a.zeroFirst !== b.zeroFirst) return a.zeroFirst ? -1 : 1;
    return a.max - b.max;
  });
}

export function groupOffers(list: Offer[], amount: number) {
  if (amount <= 30_000) {
    const zero = list.filter((o) => o.zeroFirst);
    const rest = list.filter((o) => !o.zeroFirst);
    return {
      headline: `Под сумму ${formatAmount(amount)} ₽ — до 30 000 и беспроцентные`,
      sections: [
        { title: "⭐ Беспроцентные (первый займ)", items: zero },
        { title: "До 30 000 ₽", items: rest },
      ].filter((s) => s.items.length > 0),
    };
  }

  return {
    headline: `Под сумму ${formatAmount(amount)} ₽ — варианты до 100 000`,
    sections: [{ title: "До 100 000 ₽", items: list }].filter(
      (s) => s.items.length > 0,
    ),
  };
}

export function getMicroloanOffers(amount: number): MicroloanOffers {
  const rub = Math.round(amount);

  if (rub > 100_000) {
    return {
      amount: rub,
      headline: `Ок, сумма: ${formatRub(rub)}.`,
      subtitle: "Для такой суммы лучше смотреть потребительский кредит.",
      sections: [],
      fallbacks: FALLBACKS,
      suggestConsumerCredit: true,
    };
  }

  const list = offersForAmount(rub);
  const grouped = groupOffers(list, rub);

  return {
    amount: rub,
    headline: `Ок, сумма: ${formatRub(rub)}.`,
    subtitle: grouped.headline,
    sections: grouped.sections,
    fallbacks: FALLBACKS,
  };
}

export const AMOUNT_PRESETS = [10_000, 30_000, 50_000, 70_000, 100_000] as const;
