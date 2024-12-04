import { getLatestDesignBasisRevision } from "@/actions/design-basis";
import MainLayout from "@/components/Project Management/Design Basis/Layout/Main";

export default async function Layout({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) {
  const project_id = (await params).project_id;
  const data = await getLatestDesignBasisRevision(project_id);

  if (data && data.length > 0) {
    return <MainLayout revision_id={data[0]?.name} />;
  } else {
    return null;
  }
}
