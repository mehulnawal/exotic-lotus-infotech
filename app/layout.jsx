import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://exotic-lotus-infotech-site.netlify.app"),
  title: "Exotic Lotus Infotech",
  description: "Exotic Lotus Infotech builds mobile apps, custom software, AI workflows and digital products for businesses around the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
