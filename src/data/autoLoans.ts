import type { ConsumerLoanOffer } from "./consumerLoans";

/** Автокредиты */
export const AUTO_LOANS: ConsumerLoanOffer[] = [
  {
    id: "alfa-car-cash",
    unicomId: "2002057",
    title: "Альфа-Банк — кредит наличными на автомобиль",
    url: "https://lig.su/aRl",
    banner: "alfa-car.webp",
    bannerDir: "auto",
    category: "cash",
    rateHidden: true,
    featured: true,
    terms: {
      amountMin: 50_000,
      amountMax: 7_500_000,
      termMonthsMin: 12,
      termMonthsMax: 60,
    },
    perks: [
      "Онлайн-решение за ~2 минуты",
      "0 ₽ первоначальный взнос",
      "Первый платёж через 45 дней",
      "До 300 000 ₽ — по паспорту",
      "По двум документам: паспорт и второй на выбор",
      "Стаж от 1 месяца",
    ],
    requirements: [
      "Гражданство РФ, от 21 года",
      "Постоянный доход (условия на сайте банка)",
    ],
    disclaimer:
      "Ставка и полная стоимость кредита — на alfabank.ru при оформлении. Не оферта. Оценивайте финансовые возможности и риски. АО «Альфа-Банк».",
  },
  {
    id: "tbank-autocredit",
    unicomId: "2003887",
    title: "Т‑Банк — автокредит",
    url: "https://lig.su/aRm",
    banner: "tbank-car.gif",
    bannerDir: "auto",
    category: "cash",
    featured: true,
    terms: {
      amountMin: 100_000,
      amountMax: 8_000_000,
      termMonthsMin: 12,
      termMonthsMax: 60,
    },
    perks: [
      "До 8 млн ₽ на срок до 5 лет",
      "Без первоначального взноса",
      "Без Каско и навязанных услуг",
      "Новый авто или с пробегом",
      "По паспорту, без справок и поручителей",
      "Онлайн-заявка, ответ в день обращения",
    ],
    requirements: ["Возраст 21–37 лет (ЦА оффера)", "Гражданство РФ"],
    disclaimer:
      "Условия и ставка на tbank.ru. АО «Т-Банк», лицензия № 2673. Реклама. 18+.",
  },
];
