import { Metadata } from "next"
import { auth } from "auth"
import HeaderSidebar from "components/HeaderSidebar"

export const metadata: Metadata = {
  title: "Homepage",
}

export default async function Web() {
  const session = await auth()
  return (
    <div>
      <HeaderSidebar />
      <div className="flex flex-col rounded-md bg-gray-100">
        <div className="rounded-t-md p-4 font-bold">Current Session</div>
        <pre className="whitespace-pre-wrap break-all px-4 py-6">{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  )
}
