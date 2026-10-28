export type ProductId = "microloan" | "consumer" | "card" | "auto";

export type Product = {
  id: ProductId;
  title: string;
  shortTitle: string;
  emoji: string;
  tagline: string;
  /** Короткий акцент на карточке главной */
  highlight?: string;
  badge?: string;
  amount: string;
  term: string;
  features: string[];
};

/** Порядок на главной: сначала кредиты и карты, займ — наравне с остальными */
export const HOME_PRODUCT_ORDER: ProductId[] = [
  "consumer",
  "card",
  "auto",
  "microloan",
];

export const PRODUCTS: Product[] = [
  {
    id: "microloan",
    title: "Микрозаймы",
    shortTitle: "Микрозайм",
    emoji: "⚡",
    tagline: "Первый займ на специальных условиях",
    highlight: "от 3 000 ₽ · за 5 минут",
    badge: "0%",
    amount: "от 3 000 до 100 000 ₽",
    term: "от 7 до 30 дней",
    features: [
      "Решение онлайн без визита в офис",
      "Первый займ — на специальных условиях",
      "Продление и досрочное погашение",
    ],
  },
  {
    id: "consumer",
    title: "Кредитование",
    shortTitle: "Потребительский кредит",
    emoji: "🏦",
    tagline: "ВТБ, Альфа-Банк, Т‑Банк и другие банки",
    highlight: "до 30 млн ₽ · онлайн",
    badge: "Банки",
    amount: "от 50 000 до 3 000 000 ₽",
    term: "от 6 месяцев до 7 лет",
    features: [
      "Фиксированный платёж по графику",
      "Без залога — по паспорту и справкам",
      "Рефинансирование действующих кредитов",
    ],
  },
  {
    id: "card",
    title: "Кредитные карты",
    shortTitle: "Кредитная карта",
    emoji: "💳",
    tagline: "Льготный период и оформление по паспорту",
    highlight: "до 200 дней без %",
    badge: "Онлайн",
    amount: "лимит по решению банка",
    term: "льготный период до 200 дней",
    features: [
      "ВТБ «Карта возможностей» — до 200 дней без %",
      "Бесплатное обслуживание (по условиям банка)",
      "Оформление онлайн по паспорту РФ",
    ],
  },
  {
    id: "auto",
    title: "Автокредиты",
    shortTitle: "Автокредит",
    emoji: "🚗",
    tagline: "Новый автомобиль или с пробегом",
    highlight: "до 8 млн ₽ · без Каско",
    badge: "Авто",
    amount: "до 7,5–8 млн ₽",
    term: "до 5 лет",
    features: [
      "Альфа-Банк — наличными на авто, без взноса",
      "Т‑Банк — до 8 млн ₽, без Каско",
      "Решение онлайн в день обращения",
    ],
  },
];

export function getProduct(id: ProductId): Product {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown product: ${id}`);
  return p;
}
