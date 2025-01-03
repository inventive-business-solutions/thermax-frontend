import { Button } from "antd";
import React, { useState } from "react";
import AddIncomer from "./Add Incomer/AddIncomer";
interface Props {
  designBasisRevisionId: string;
  revision_id: string;
  panelData: any;
  projectPanelData: any;
}
const Incomer: React.FC<Props> = ({
  designBasisRevisionId,
  projectPanelData,
  panelData,
  revision_id,
}) => {
  const [isAddMainsIncomerOpen, setIsAddMainsIncomerOpen] =
    useState<boolean>(false);

  console.log(designBasisRevisionId, "project panel data");
  console.log(projectPanelData, "project panel data");
  console.log(panelData, "project panel data");
  const getPanelType = () => {
    return projectPanelData?.find(
      (item: any) => item.panel_name === panelData.panelName
    );
  };

  return (
    <div>
      <div className="mb-4 flex justify-end gap-4">
        <Button
          type="primary"
          onClick={() => {
            setIsAddMainsIncomerOpen(true);
          }}
          className="hover:bg-blue-600"
        >
          Add Mains Incomer
        </Button>
        {/* <Button type="primary" onClick={() => {}} className="hover:bg-blue-600">
          Add DG Incomer
        </Button> */}

        {isAddMainsIncomerOpen && (
          <AddIncomer
            panelType={getPanelType().panel_main_type}
            revision_id={getPanelType().revision_id}
            panel_id={getPanelType().name}
            onClose={() => setIsAddMainsIncomerOpen(false)}
            isOpen={isAddMainsIncomerOpen}
            panelData={panelData.data}
            sld_revision_id={revision_id}
            designBasisRevisionId={designBasisRevisionId}
          />
        )}
      </div>
    </div>
  );
};

export default Incomer;
