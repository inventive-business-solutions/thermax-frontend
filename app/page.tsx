import { Metadata } from "next"
import Homepage from "components/Homepage"

export const metadata: Metadata = {
  title: "Electrical Suite",
  icons: {
    icon: "/eni_max_logo_svg_final.svg",
  },
}

export default async function Web() {
  return <Homepage />
}
