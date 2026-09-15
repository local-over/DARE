import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DARE v3.0 | Edge AI Document Engine",
  description: "The pixel-perfect, token-efficient markup language compiled on the Cloudflare Edge.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <div className="flex-1 mt-14 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
