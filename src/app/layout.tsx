import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fleet Dashboard — ระบบจัดการรถโดยสาร",
  description: "Fleet Management & Driver Replacement System",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
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
