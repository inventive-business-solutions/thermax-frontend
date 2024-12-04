import { getLatestDesignBasisRevision } from "@/actions/design-basis";
import GeneralInfo from "@/components/Project Management/Design Basis/GeneralInfo";

export default async function GeneralInfoPage({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) {
  const project_id = (await params).project_id;
  const data = await getLatestDesignBasisRevision(project_id);

  if (data && data.length > 0) {
    return <GeneralInfo revision_id={data[0]?.name} />;
  } else {
    return null;
  }
}
