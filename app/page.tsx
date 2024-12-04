import Homepage from "@/components/Homepage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electrical Suite",
  icons: {
    icon: "/eni_max_logo_svg_final.svg",
  },
};

export default async function Web() {
  return <Homepage />;
}
