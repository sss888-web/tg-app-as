type Props = {
  title: string;
  description?: string;
  align?: "start" | "center";
};

export function PanelHead({ title, description, align = "start" }: Props) {
  return (
    <div
      className={`panel-head${align === "center" ? " panel-head--center" : ""}`}
    >
      <h2 className="panel-head__title">{title}</h2>
      {description ? (
        <p className="hint panel-head__desc">{description}</p>
      ) : null}
    </div>
  );
}
