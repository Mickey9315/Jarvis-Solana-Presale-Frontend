import localFont from "next/font/local";
import "./globals.scss";

// components
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/footer/footer";

const rye = localFont({
  src: "../assets/fonts/Rye-Regular.woff2",
  variable: "--font-rye",
});

const vastShadow = localFont({
  src: "../assets/fonts/VastShadow-Regular.woff2",
  variable: "--font-vast-shadow",
});

export const metadata = {
  metadataBase: new URL("https://judgement.world"),
  title: "Judgement",
  description: "Welcome to Crypto Hollow.",

  opengraph: {
    title: "Judgement",
    description: "Welcome to Crypto Hollow.",
  },

  twitter: {
    title: "Judgement",
    description: "Welcome to Crypto Hollow.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${vastShadow.variable} ${rye.variable}`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
