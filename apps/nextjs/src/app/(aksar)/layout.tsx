import "@aksar/ui/styles.css";
import "../styles/globals.css";
import { SiteFooter } from "~/components/footer";

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex-1">
        {props.children}
        {props.modal}
      </div>
      <SiteFooter />
    </div>
  );
}
