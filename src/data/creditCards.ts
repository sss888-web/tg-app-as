export type CreditCardOffer = {
  id: string;
  title: string;
  url: string;
  /** Квадрат / иконка (fallback) */
  thumb: string;
  /** Широкий баннер 1080×607 и т.п. */
  banner?: string;
  blurb: string;
  highlights: string[];
  unicomId?: string;
};

export function creditCardAsset(path: string): string {
  return `./cards/${path}`;
}

/** Кредитные карты (lig.su) */
export const CREDIT_CARDS: CreditCardOffer[] = [
  {
    id: "vtb-opportunity",
    title: "ВТБ — Карта возможностей",
    url: "https://lig.su/aQw",
    thumb: "vtb-banner-hd.png",
    banner: "vtb-banner-hd.png",
    blurb: "до 200 дней без % по бесплатной кредитке",
    highlights: [
      "До 200 дней без процентов на покупки (по правилам банка)",
      "Бесплатное обслуживание карты",
      "Оформление онлайн, паспорт РФ",
    ],
    unicomId: "2004021",
  },
  {
    id: "rencredit-115",
    title: "Ренессанс Банк — 115 дней без %",
    url: "https://lig.su/aQx",
    thumb: "rencredit-banner.png",
    banner: "rencredit-banner.png",
    blurb: "до 115 дней без % · лимит до 600 000 ₽",
    highlights: [
      "До 115 дней без процентов на покупки (по правилам банка)",
      "Обслуживание и выпуск — 0 ₽",
      "Лимит от 10 000 до 600 000 ₽ (решает банк)",
    ],
    unicomId: "2005467",
  },
  {
    id: "otp-120",
    title: "ОТП Банк — 120 дней без %",
    url: "https://lig.su/aQz",
    thumb: "otp-banner.jpg",
    banner: "otp-banner.jpg",
    blurb: "до 120 дней без % на покупки",
    highlights: [
      "До 120 дней без процентов на покупки (по правилам банка)",
      "Оформление онлайн",
      "ПСК и лимит — на otpbank.ru/120days",
    ],
    unicomId: "2002290",
  },
  {
    id: "halva",
    title: "Совкомбанк — Халва",
    url: "https://lig.su/aQA",
    thumb: "halva-banner.jpg",
    banner: "halva-banner.jpg",
    blurb: "кэшбэк до 100% · рассрочка до 24 мес.",
    highlights: [
      "Рассрочка в торговой сети (потребительский кредит 353-ФЗ)",
      "Лимит до 500 000 ₽ · обслуживание 0 ₽",
      "Онлайн-заявка за несколько минут",
    ],
    unicomId: "2004583",
  },
  {
    id: "tbank-platinum",
    title: "Т‑Банк — Платинум",
    url: "https://lig.su/aQB",
    thumb: "tbank-banner.png",
    banner: "tbank-banner.png",
    blurb: "акция: до 3 000 ₽ за траты по кредитке",
    highlights: [
      "Условия акции и сроки — на tbank.ru",
      "Кредитная карта с льготным периодом",
      "Оформление онлайн",
    ],
    unicomId: "2001701",
  },
  {
    id: "ozon-credit",
    title: "Ozon Банк — кредитная карта",
    url: "https://lig.su/aQC",
    thumb: "ozon-banner.png",
    banner: "ozon-banner.png",
    blurb: "льготный период до 140 дней",
    highlights: [
      "До 140 дней без % на покупки (по правилам банка)",
      "Удобно для покупок на Ozon",
      "Условия — finance.ozon.ru",
    ],
    unicomId: "2001756",
  },
  {
    id: "zenit-120-120",
    title: "Банк Зенит — 120 + 120 дней",
    url: "https://lig.su/aQD",
    thumb: "zenit-banner.png",
    banner: "zenit-banner.png",
    blurb: "120 + 120 дней на покупки и снятие",
    highlights: [
      "Льготный период на покупки и наличные (по правилам банка)",
      "Карта платёжной системы «Мир»",
      "Подробности — zenit.ru/trf",
    ],
    unicomId: "2002771",
  },
  {
    id: "mts-credit",
    title: "МТС Деньги — кредитная карта",
    url: "https://lig.su/aQE",
    thumb: "mts-banner.jpg",
    banner: "mts-banner.jpg",
    blurb: "бесплатная кредитка · до 111 дней без %",
    highlights: [
      "До 111 дней без процентов (по правилам банка)",
      "Оформление онлайн",
      "Условия — mtsdengi.ru",
    ],
    unicomId: "2004894",
  },
  {
    id: "halva-24",
    title: "Совкомбанк — Халва 24 месяца",
    url: "https://lig.su/aQF",
    thumb: "halva-banner.jpg",
    banner: "halva-banner.jpg",
    blurb: "рассрочка до 24 месяцев",
    highlights: [
      "Отдельная акция на gethalva.ru",
      "Рассрочка Совкомбанка",
      "Обслуживание 0 ₽ (по правилам банка)",
    ],
    unicomId: "2005224",
  },
  {
    id: "sovcom-180",
    title: "Совкомбанк — 180 дней без %",
    url: "https://lig.su/aQG",
    thumb: "sovcom-180-banner.jpg",
    banner: "sovcom-180-banner.jpg",
    blurb: "кредитная карта · 180 дней без %",
    highlights: [
      "Льготный период до 180 дней (по правилам банка)",
      "Оформление на sovcombank.credit",
      "Изучите условия на sovcombank.ru",
    ],
    unicomId: "2005585",
  },
  {
    id: "sovcom-premium",
    title: "Совкомбанк Premium",
    url: "https://lig.su/aQH",
    thumb: "sovcom-premium-thumb.jpg",
    banner: "sovcom-premium-thumb.jpg",
    blurb: "премиальный сервис и X‑CARD Premium",
    highlights: [
      "Бизнес-залы, кэшбэк и консьерж (по тарифу)",
      "Для премиальных клиентов",
      "Условия — sovcombank.ru/premium",
    ],
    unicomId: "2004080",
  },
  {
    id: "akbars-115",
    title: "Ак Барс — кредитная карта",
    url: "https://lig.su/aQI",
    thumb: "akbars-thumb.png",
    banner: "akbars-thumb.png",
    blurb: "кредитная карта «Мир»",
    highlights: [
      "Оформление онлайн",
      "Льготный период — на сайте банка",
      "Паспорт РФ",
    ],
    unicomId: "2005002",
  },
  {
    id: "vtb-reserve",
    title: "ВТБ — карта с резервным лимитом",
    url: "https://lig.su/aQJ",
    thumb: "vtb-reserve-thumb.png",
    banner: "vtb-banner-hd.png",
    blurb: "кредитная карта ВТБ онлайн",
    highlights: [
      "Резервный лимит — по правилам банка",
      "Оформление на сайте ВТБ",
      "Платёжная система «Мир»",
    ],
    unicomId: "2005563",
  },
  {
    id: "sovcom-180-plus",
    title: "Совкомбанк — 180 дней без % ПЛЮС",
    url: "https://lig.su/aQK",
    thumb: "sovcom-180plus-banner.jpg",
    banner: "sovcom-180plus-banner.jpg",
    blurb: "180 дней без % · возврат процентов",
    highlights: [
      "Продукт «180 дней без % ПЛЮС»",
      "Условия возврата процентов — на сайте банка",
      "sovcombank.credit",
    ],
    unicomId: "2005585",
  },
];
