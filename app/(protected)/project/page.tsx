import { getUserInfo } from "@/actions/user-actions";
import ProjectList from "@/components/Project Management/Project List/ProjectList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Projects() {
  const userInfo = await getUserInfo();
  return (
    <>
      <ProjectList userInfo={userInfo} isComplete={0} />
    </>
  );
}
