import { Button } from "antd"
import React, { useState } from "react"
import AddIncomer from "./Add Incomer/AddIncomer"
import { useGetData } from "hooks/useCRUD"
import { PROJECT_PANEL_API } from "configs/api-endpoints"
interface Props {
  designBasisRevisionId: string
  panelData: any
}
const Incomer: React.FC<Props> = ({ designBasisRevisionId, panelData }) => {
  const [isAddMainsIncomerOpen, setIsAddMainsIncomerOpen] = useState<boolean>(false)
  const { data: projectPanelData } = useGetData(
    `${PROJECT_PANEL_API}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]&order_by=creation asc`
  )
  console.log(projectPanelData, "project panel data")

  return (
    <div>
      <div className="mb-4 flex justify-end gap-4">
        <Button
          type="primary"
          onClick={() => {
            setIsAddMainsIncomerOpen(true)
          }}
          className="hover:bg-blue-600"
        >
          Add Mains Incomer
        </Button>
        <Button type="primary" onClick={() => {}} className="hover:bg-blue-600">
          Add DG Incomer
        </Button>

        <AddIncomer
          panelType={"string"}
          revision_id={"string"}
          panel_id={"string"}
          onClose={() => setIsAddMainsIncomerOpen(false)}
          isOpen={isAddMainsIncomerOpen}
        />
      </div>
    </div>
  )
}

export default Incomer
