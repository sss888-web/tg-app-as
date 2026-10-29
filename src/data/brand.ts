const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

export const BRAND = {
  name: "УЧУГЭЙ СЕРВИС",
  subtitle: "Онлайн сервис · Якутия",
  tagline: "Финансовый подбор для Якутии",
  logoSrc: asset("brand/logo.jpg"),
  heroSrc: asset("brand/hero.jpg"),
} as const;

export const BENEFITS = [
  { kicker: "0%", label: "первый займ" },
  { kicker: "5 мин", label: "решение онлайн" },
  { kicker: "Паспорт", label: "документы РФ" },
  { kicker: "24/7", label: "без выходных" },
] as const;
