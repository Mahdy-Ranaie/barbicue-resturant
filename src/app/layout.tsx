import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Barbecue Restaurant | رستوران باربیکیو",
  description: "A premium barbecue restaurant showcase with Persian and English content.",
  robots: { index: false, follow: false }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}
