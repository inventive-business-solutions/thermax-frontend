import { Metadata } from "next"
import { getBucketObjects } from "actions/aws/s3-actions"
import { getUserInfo } from "actions/user-actions"
import ProjectList from "components/Project Management/Project List/ProjectList"

export const metadata: Metadata = {
  title: "Projects",
}

export default async function Projects() {
  const userInfo = await getUserInfo()
  const bucketObject = await getBucketObjects("")
  console.log(bucketObject)
  return (
    <>
      <ProjectList userInfo={userInfo} />
    </>
  )
}
