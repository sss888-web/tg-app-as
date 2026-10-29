import { useCallback, useEffect, useMemo, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { LoanCalculator } from "./components/LoanCalculator";
import { BenefitsList } from "./components/BenefitsList";
import { AppShell } from "./components/AppShell";
import { BrandHero } from "./components/BrandHero";
import { ApplicationForm } from "./components/ApplicationForm";
import { MicroloanOffersView } from "./components/MicroloanOffersView";
import { ProductCard } from "./components/ProductCard";
import { AutoLoansView } from "./components/AutoLoansView";
import { ConsumerLoansView } from "./components/ConsumerLoansView";
import { CreditCardsView } from "./components/CreditCardsView";
import { ProductDetail } from "./components/ProductDetail";
import { getMicroloanOffers } from "./data/microloanOffers";
import {
  HOME_PRODUCT_ORDER,
  type ProductId,
  getProduct,
} from "./data/products";
import { PanelHead } from "./components/PanelHead";

type Screen =
  | { name: "home" }
  | { name: "offers"; amount: number }
  | { name: "cards" }
  | { name: "loans" }
  | { name: "auto" }
  | { name: "detail"; productId: ProductId }
  | { name: "apply"; productId: ProductId };

function displayName(): string {
  const u = WebApp.initDataUnsafe.user;
  if (!u) return "";
  return [u.first_name, u.last_name].filter(Boolean).join(" ");
}

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [amount, setAmount] = useState(10_000);

  const defaultName = useMemo(() => displayName(), []);

  const goHome = useCallback(() => {
    WebApp.HapticFeedback.impactOccurred("light");
    setScreen({ name: "home" });
  }, []);

  const openProduct = useCallback((id: ProductId) => {
    WebApp.HapticFeedback.impactOccurred("light");
    if (id === "card") {
      setScreen({ name: "cards" });
      return;
    }
    if (id === "consumer") {
      setScreen({ name: "loans" });
      return;
    }
    if (id === "auto") {
      setScreen({ name: "auto" });
      return;
    }
    setScreen({ name: "detail", productId: id });
  }, []);

  const openApply = useCallback((id: ProductId) => {
    WebApp.HapticFeedback.impactOccurred("medium");
    setScreen({ name: "apply", productId: id });
  }, []);

  const submitAmount = useCallback(() => {
    if (amount < 1_000) return;
    WebApp.HapticFeedback.impactOccurred("medium");
    setScreen({ name: "offers", amount });
  }, [amount]);

  useEffect(() => {
    const onMain = () => {
      if (screen.name === "apply") return;
      if (screen.name === "detail") {
        openApply(screen.productId);
        return;
      }
      if (screen.name === "offers") {
        goHome();
        return;
      }
      WebApp.close();
    };

    if (screen.name === "home") {
      WebApp.MainButton.setText("Закрыть");
    } else if (screen.name === "offers") {
      WebApp.MainButton.setText("Другая сумма");
    } else if (
      screen.name === "cards" ||
      screen.name === "loans" ||
      screen.name === "auto"
    ) {
      WebApp.MainButton.hide();
      return () => {
        WebApp.MainButton.offClick(onMain);
      };
    } else if (screen.name === "detail") {
      const p = getProduct(screen.productId);
      WebApp.MainButton.setText(`Заявка: ${p.shortTitle}`);
    } else {
      WebApp.MainButton.hide();
      return () => {
        WebApp.MainButton.offClick(onMain);
      };
    }

    WebApp.MainButton.onClick(onMain);
    WebApp.MainButton.show();

    return () => {
      WebApp.MainButton.offClick(onMain);
    };
  }, [screen, openApply, goHome]);

  useEffect(() => {
    const onBack = () => {
      WebApp.HapticFeedback.impactOccurred("light");
      if (screen.name === "apply") {
        setScreen({ name: "detail", productId: screen.productId });
      } else if (screen.name === "offers") {
        goHome();
      } else {
        goHome();
      }
    };

    WebApp.BackButton.onClick(onBack);
    if (screen.name === "home") {
      WebApp.BackButton.hide();
    } else {
      WebApp.BackButton.show();
    }
    return () => {
      WebApp.BackButton.offClick(onBack);
      WebApp.BackButton.hide();
    };
  }, [screen, goHome]);

  if (screen.name === "cards") {
    return <CreditCardsView onBack={goHome} />;
  }

  if (screen.name === "loans") {
    return <ConsumerLoansView onBack={goHome} />;
  }

  if (screen.name === "auto") {
    return <AutoLoansView onBack={goHome} />;
  }

  if (screen.name === "offers") {
    const offers = getMicroloanOffers(screen.amount);
    return (
      <MicroloanOffersView
        offers={offers}
        onBack={goHome}
        onConsumerCredit={() => openProduct("consumer")}
      />
    );
  }

  if (screen.name === "detail") {
    return (
      <ProductDetail
        product={getProduct(screen.productId)}
        onBack={goHome}
        onApply={() => openApply(screen.productId)}
      />
    );
  }

  if (screen.name === "apply") {
    return (
      <ApplicationForm
        product={getProduct(screen.productId)}
        defaultName={defaultName}
        onBack={() => setScreen({ name: "detail", productId: screen.productId })}
      />
    );
  }

  const greeting = defaultName ? `Здравствуйте, ${defaultName}!` : undefined;

  return (
    <div className="app">
      <AppShell>
        <BrandHero greeting={greeting} />
        <BenefitsList />
        <LoanCalculator
          amount={amount}
          onAmountChange={setAmount}
          onSubmit={submitAmount}
        />
        <section className="app-panel section">
          <PanelHead
            title="Кредиты, карты и авто — так же онлайн, как микрозайм"
            align="center"
          />
          <div className="product-grid">
            {HOME_PRODUCT_ORDER.map((id) => {
              const product = getProduct(id);
              return (
                <ProductCard
                  key={id}
                  product={product}
                  onSelect={() =>
                    id === "microloan" ? submitAmount() : openProduct(id)
                  }
                />
              );
            })}
          </div>
        </section>
        <p className="disclaimer app-shell__disclaimer">
          Не является публичной офертой. Условия определяет организация-кредитор. 18+.
        </p>
      </AppShell>
    </div>
  );
}
