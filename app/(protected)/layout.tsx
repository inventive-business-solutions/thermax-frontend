import HeaderSidebar from "components/HeaderSidebar"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderSidebar />
      <div className="p-2">{children}</div>
    </>
  )
}
