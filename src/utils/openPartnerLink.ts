import WebApp from "@twa-dev/sdk";

/** Открыть реферальную ссылку (lig.su) в браузере / внешнем приложении */
export function openPartnerLink(url: string): void {
  const target = url.trim();
  if (!target) {
    WebApp.showAlert("Ссылка пока не настроена.");
    return;
  }

  const inTelegram = Boolean(WebApp.initData);

  if (!inTelegram) {
    window.open(target, "_blank", "noopener,noreferrer");
    return;
  }

  try {
    WebApp.openLink(target, { try_instant_view: false });
  } catch {
    window.open(target, "_blank", "noopener,noreferrer");
  }
}
