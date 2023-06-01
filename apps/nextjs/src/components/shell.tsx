import * as React from "react";

import { cn } from "@aksar/ui";

type DashboardShellProps = React.HTMLAttributes<HTMLDivElement>;

export function DashboardShell(props: DashboardShellProps) {
  return (
    <div className={cn("grid items-start gap-8", props.className)} {...props}>
      {props.children}
    </div>
  );
}
