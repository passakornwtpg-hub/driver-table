import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fleet Dashboard — ระบบจัดการรถโดยสาร",
  description: "Fleet Management & Driver Replacement System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased bg-gray-100 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
