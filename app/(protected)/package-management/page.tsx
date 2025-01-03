import { Metadata } from "next";
import PackageList from "@/components/Package Management/PackageList";

export const metadata: Metadata = {
  title: "Package Management",
};

export default function Package() {
  return <PackageList />;
}
