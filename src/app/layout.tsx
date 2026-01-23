import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/shared/components/Footer/Footer";
import Navbar from "@/shared/components/Navbar/Navbar";
import { Toaster } from "sonner";

const getPoppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const logoFont = Cinzel({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Sanary" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
      </head>
      <body
        suppressHydrationWarning
        className={`${getPoppins.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-[62px] md:pt-[70px]">
          {children}
        </div>
        <Footer />
        <Toaster
            position="top-right"
            duration={4000}
            visibleToasts={3}
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  "group toast h-15 w-full flex gap-x-3 items-center bg-background rounded-xs p-4 pr-6 shadow-lg",
                title: "font-semibold text-sm",
                description: "text-xs opacity-80",
                success: "bg-card/90 text-accent-foreground",
                error: "bg-card/90 text-accent-foreground",
              },
            }}
          />
      </body>
    </html>
  );
}
