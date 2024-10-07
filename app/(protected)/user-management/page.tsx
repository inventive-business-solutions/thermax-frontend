import { Metadata } from "next"
import { getUserInfo } from "actions/user-actions"
import SuperuserList from "components/User Management/SuperuserList"
import { UserList } from "components/User Management/UserList"
import { BTG } from "configs/constants"

export const metadata: Metadata = {
  title: "EniMax - User Management",
  icons: {
    icon: "/eni_max_logo_svg_final.svg",
  },
}

export default async function UserManagement() {
  const userInfo = await getUserInfo()
  return <div>{userInfo?.division === BTG ? <SuperuserList /> : <UserList userInfo={userInfo} />}</div>
}
