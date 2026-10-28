import { CONSUMER_LOAN_COPY } from "./consumerLoanCopy";

export type ConsumerLoanCategory =
  | "cash"
  | "collateral"
  | "special";

export type ConsumerLoanTerms = {
  amountMin: number;
  amountMax: number;
  termMonthsMin: number;
  termMonthsMax: number;
  /** % годовых, «от» (часто с пакетом услуг) */
  rateFrom?: number;
  /** % годовых, верхняя граница в рекламе */
  rateTo?: number;
  /** Без акций/пакета (например ВТБ без МВ) */
  rateWithoutPromo?: number;
  pskFrom?: number;
  pskTo?: number;
};

export type ConsumerLoanOffer = {
  id: string;
  unicomId: string;
  title: string;
  url: string;
  category: ConsumerLoanCategory;
  banner?: string;
  /** Папка в public (по умолчанию loans) */
  bannerDir?: "loans" | "auto";
  note?: string;
  featured?: boolean;
  terms?: ConsumerLoanTerms;
  perks?: string[];
  requirements?: string[];
  disclaimer?: string;
  /** Не показывать % и ПСК в UI (требования рекламодателя) */
  rateHidden?: boolean;
};

export function loanAsset(
  path: string,
  dir: "loans" | "auto" = "loans",
): string {
  return `./${dir}/${path}`;
}

export function offerBannerSrc(offer: ConsumerLoanOffer): string {
  if (!offer.banner) return "";
  return loanAsset(offer.banner, offer.bannerDir ?? "loans");
}

export const CONSUMER_LOAN_SECTIONS: {
  category: ConsumerLoanCategory;
  title: string;
}[] = [
  { category: "cash", title: "Кредит наличными" },
  { category: "collateral", title: "Под залог" },
  { category: "special", title: "Специальные программы" },
];

type LoanSeed = Omit<
  ConsumerLoanOffer,
  "terms" | "perks" | "requirements" | "disclaimer"
>;

function withCopy(seed: LoanSeed): ConsumerLoanOffer {
  const extra = CONSUMER_LOAN_COPY[seed.id];
  return { ...seed, ...extra };
}

export const CONSUMER_LOANS: ConsumerLoanOffer[] = [
  withCopy({
    id: "vtb-cash",
    unicomId: "2002621",
    title: "ВТБ — кредит наличными",
    url: "https://lig.su/aQL",
    banner: "vtb-cash.jpg",
    category: "cash",
    featured: true,
  }),
  withCopy({
    id: "alfa-cash",
    unicomId: "2002057",
    title: "Альфа-Банк — кредит наличными",
    url: "https://lig.su/aQU",
    banner: "alfa-cash.png",
    category: "cash",
  }),
  withCopy({
    id: "tbank-cash",
    unicomId: "2003138",
    title: "Т‑Банк — кредит наличными",
    url: "https://lig.su/aQY",
    banner: "tbank-cash.png",
    category: "cash",
  }),
  withCopy({
    id: "renaissance-cash",
    unicomId: "2004752",
    title: "Ренессанс Банк — кредит наличными",
    url: "",
    banner: "renaissance.png",
    category: "cash",
    featured: true,
  }),
  withCopy({
    id: "bspb-cash",
    unicomId: "2001363",
    title: "БСПБ — кредит с бонусами",
    url: "https://lig.su/aQX",
    banner: "bspb.png",
    category: "cash",
  }),
  withCopy({
    id: "akbars-cash",
    unicomId: "2003238",
    title: "Ак Барс — потребительский кредит",
    url: "https://lig.su/aRb",
    banner: "akbars.png",
    category: "cash",
  }),
  withCopy({
    id: "zenit-cash",
    unicomId: "2003817",
    title: "Банк Зенит — потребительский кредит",
    url: "https://lig.su/aRe",
    banner: "zenit-cash.png",
    category: "cash",
  }),
  withCopy({
    id: "atb-cash",
    unicomId: "2004313",
    title: "АТБ — кредит наличными",
    url: "https://lig.su/aRg",
    banner: "atb.webp",
    category: "cash",
  }),
  withCopy({
    id: "psb-cash",
    unicomId: "2005228",
    title: "Промсвязьбанк — потребительский кредит",
    url: "https://lig.su/aRh",
    banner: "psb.jpg",
    category: "cash",
    note: "выдача с плохой КИ",
  }),
  withCopy({
    id: "auto-collateral",
    unicomId: "2005525",
    title: "ВТБ — кредит под залог автомобиля",
    url: "https://lig.su/aQO",
    banner: "sovcom-auto.gif",
    category: "collateral",
    featured: true,
  }),
  withCopy({
    id: "norvik-re",
    unicomId: "2003193",
    title: "Норвик Банк — под залог недвижимости",
    url: "https://lig.su/aRa",
    banner: "norvik.png",
    category: "collateral",
  }),
  withCopy({
    id: "zalog-expert",
    unicomId: "2005478",
    title: "Залоговый эксперт",
    url: "https://lig.su/aRi",
    banner: "zalog-expert.jpg",
    category: "collateral",
    note: "рефинансирование",
  }),
  withCopy({
    id: "tbank-auto-collateral",
    unicomId: "2003887",
    title: "Т‑Банк — кредит под залог автомобиля",
    url: "",
    category: "collateral",
    note: "ссылка скоро",
  }),
  withCopy({
    id: "alfa-repair",
    unicomId: "2004829",
    title: "Альфа-Банк — кредит на ремонт",
    url: "https://lig.su/aQV",
    banner: "alfa-repair.png",
    category: "special",
  }),
  withCopy({
    id: "sovcom-progress",
    unicomId: "2003141",
    title: "Совкомбанк — «Прогресс»",
    url: "https://lig.su/aR9",
    banner: "sovcom-progress.webp",
    category: "special",
    note: "до 30 млн ₽",
  }),
  withCopy({
    id: "sovcom-vygodny",
    unicomId: "2004044",
    title: "Совкомбанк — ДКПЗА «Выгодный»",
    url: "https://lig.su/aRf",
    banner: "sovcom-vygodny.jpg",
    category: "special",
  }),
];

export function loansByCategory(category: ConsumerLoanCategory): ConsumerLoanOffer[] {
  return CONSUMER_LOANS
    .filter((o) => o.category === category)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.title.localeCompare(b.title, "ru");
    });
}
