import MyCustomForm from "@/components/FormComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Components",
};

export default async function Web() {
  return (
    <div className="mx-auto mt-4 w-10/12 rounded-2xl border border-gray-300 p-4 shadow-md">
      <MyCustomForm />
    </div>
  );
}
