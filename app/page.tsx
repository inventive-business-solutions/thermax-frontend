import { Metadata } from "next"
import { auth } from "auth"
import HeaderSidebar from "components/HeaderSidebar"
import { Card, Flex } from "antd";
import ProjectDetails from "components/ProjectDetails";


export const metadata: Metadata = {
  title: "Homepage",
}


export default async function Web() {
  const session = await auth();

  return (
    <div>
      <HeaderSidebar />

      <Flex gap="middle" vertical>

      <ProjectDetails />

      <Card
          style={{ margin:"2rem" }}
          title="Current Session"
          bordered={false}
          className="flex flex-col rounded-md bg-gray-100 shadow"
        >
          <div className="rounded-t-md p-4 font-bold">Current Session</div>
          <pre className="whitespace-pre-wrap break-all px-4 py-6">{JSON.stringify(session, null, 2)}</pre>
        </Card>
      </Flex>
      
    </div>
  )
}
