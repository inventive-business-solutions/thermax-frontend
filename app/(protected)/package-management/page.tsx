import PackageList from "@/components/Package Management/PackageList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Package Management",
};

export default function Package() {
  return <PackageList />;
}
