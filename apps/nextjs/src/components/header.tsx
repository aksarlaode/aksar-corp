interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader(props: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{props.heading}</h1>
        {props.text && (
          <p className="text-lg text-muted-foreground">{props.text}</p>
        )}
      </div>
      {props.children}
    </div>
  );
}
