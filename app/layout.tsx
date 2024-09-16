import { AntdRegistry } from "@ant-design/nextjs-registry"
import { Metadata } from "next"
import { Poppins, Roboto } from "next/font/google"
import "styles/tailwind.css"
import { SessionProvider } from "next-auth/react"
import { auth } from "auth"

export const metadata: Metadata = {
  title: "Next.js Boilerplate",
  description: "Next.js Boilerplate with Tailwind CSS and Ant Design",
  icons: {
    icon: "/favicon.ico",
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
          <body className={`${poppins.variable} ${roboto.variable}`}>{children}</body>
        </AntdRegistry>
      </SessionProvider>
    </html>
  )
}
