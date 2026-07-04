import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Fundação do Mundo",
  description: "Uma história de fundação de um mundo de fantasia oriental.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700&family=Zen+Kaku+Gothic+New:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-sumi text-washi antialiased" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
