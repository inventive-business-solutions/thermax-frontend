import { getLatestDesignBasisRevision } from "@/actions/design-basis";
import ProjectInfo from "@/components/Project Management/Project Information/ProjectInfo";

export default async function Page({
  params,
}: {
  params: { project_id: string };
}) {
  const data = await getLatestDesignBasisRevision(params.project_id);

  if (data && data.length > 0) {
    return <ProjectInfo revision_id={data[0]?.name} />;
  } else {
    return null;
  }
}
