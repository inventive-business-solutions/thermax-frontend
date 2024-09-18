import HeaderSidebar from "components/HeaderSidebar"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <HeaderSidebar />
      {children}
    </div>
  )
}

export default Layout
