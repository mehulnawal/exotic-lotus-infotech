import "./globals.css";

export const metadata = {
  title: "Exotic Lotus Infotech",
  description: "Custom business software, CRM, ERP, SaaS and automation solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
