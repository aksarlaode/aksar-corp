import React from "react";

export default function EditorLayout({ children }: React.PropsWithChildren) {
  return <main className="min-h-screen">{children}</main>;
}
