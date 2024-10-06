import { Metadata } from "next"
import { getUserRoles } from "actions/user-actions"
import SuperuserList from "components/User Management/SuperuserList"
import { BTG_SUPERUSER } from "configs/constants"
import { UserList } from "components/User Management/UserList"

export const metadata: Metadata = {
  title: "EniMax - User Management",
  icons: {
    icon: "/eni_max_logo_svg_final.svg",
  },
}

export default async function UserManagement() {
  const roles = await getUserRoles()
  console.log(roles)
  return <div>{roles.includes(BTG_SUPERUSER) ? <SuperuserList /> : <UserList />}</div>
}
