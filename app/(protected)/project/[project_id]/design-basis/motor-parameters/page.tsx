import { getLatestDesignBasisRevision } from "@/actions/design-basis";
import MotorParameters from "@/components/Project Management/Design Basis/MotorParameters";

export default async function MotorParametersPage({
  params,
}: {
  params: { project_id: string };
}) {
  const data = await getLatestDesignBasisRevision(params.project_id);

  if (data && data.length > 0) {
    return <MotorParameters revision_id={data[0]?.name} />;
  } else {
    return null;
  }
}
