import "./globals.css";
import UIProvider from "@/context/UIProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
