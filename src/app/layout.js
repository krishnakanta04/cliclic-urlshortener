import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import ToastProvider from "@/context/ToastProvider";
import UIProvider from "@/context/UIProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <UIProvider>
          <ToastProvider />
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
