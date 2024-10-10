import { AntdRegistry } from "@ant-design/nextjs-registry"
import { Metadata } from "next"
import { Poppins, Roboto } from "next/font/google"
import "styles/tailwind.css"
import { SessionProvider } from "next-auth/react"
import { auth } from "auth"
import ModalLoader from "components/ModalLoader"
import { LoadingProvider } from "./context/BaseContext"

export const metadata: Metadata = {
  title: "EniMax",
  icons: {
    icon: "/eni_max_logo_svg_final.svg",
  },
}

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <AntdRegistry>
          <body className={`${poppins.variable} ${roboto.variable}`}>
            <LoadingProvider>
              <ModalLoader />
              {children}
            </LoadingProvider>
          </body>
        </AntdRegistry>
      </SessionProvider>
    </html>
  )
}
