import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Metadata } from "next";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { LoadingProvider } from "./context/BaseContext";
import { auth } from "@/auth";
import ModalLoader from "@/components/ModalLoader";
import { Poppins, Roboto } from "next/font/google";
import "../styles/tailwind.css";

export const metadata: Metadata = {
  title: "EniMax",
  icons: {
    icon: "/eni_max_logo_svg_final.svg",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://jsuites.net/v4/jsuites.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://bossanova.uk/jspreadsheet/v4/jexcel.css"
          type="text/css"
        />
      </head>
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <SessionProvider session={session}>
          <AntdRegistry>
            <Script
              src="https://bossanova.uk/jspreadsheet/v4/jexcel.js"
              strategy="beforeInteractive"
            />
            <Script
              src="https://jsuites.net/v4/jsuites.js"
              strategy="beforeInteractive"
            />
            <LoadingProvider>
              <ModalLoader />
              {children}
            </LoadingProvider>
          </AntdRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
