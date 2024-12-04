import { redirect } from "next/navigation";

const DefaultPage = async ({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) => {
  const project_id = (await params).project_id;
  redirect(`/project/${project_id}/project-information`);
};

export default DefaultPage;
