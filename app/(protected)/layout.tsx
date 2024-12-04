import HeaderSidebar from "@/components/HeaderSidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="fixed left-0 top-0 z-10 w-full bg-white shadow-md">
        <HeaderSidebar />
      </div>
      <div className="mt-[4.5rem] h-full overflow-y-auto px-4">{children}</div>
    </div>
  );
}
