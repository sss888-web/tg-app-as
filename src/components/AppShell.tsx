import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function AppShell({ children, className = "" }: Props) {
  return <div className={`app-shell ${className}`.trim()}>{children}</div>;
}
