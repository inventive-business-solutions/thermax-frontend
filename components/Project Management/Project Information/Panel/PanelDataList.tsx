import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table, Tooltip } from "antd";
import { useState } from "react";
import { mutate } from "swr";

import PanelFormModal from "./PanelFormModal";
import { ColumnsType } from "antd/es/table";
import { deleteData, getData } from "@/actions/crud-actions";
import {
  PROJECT_PANEL_API,
  DYNAMIC_DOCUMENT_API,
  MCC_PANEL,
  PCC_PANEL,
  MCC_PCC_PLC_PANEL_1,
  MCC_PCC_PLC_PANEL_2,
} from "@/configs/api-endpoints";
import {
  MCC_PANEL_TYPE,
  PCC_PANEL_TYPE,
  MCCcumPCC_PANEL_TYPE,
} from "@/configs/constants";
import { useGetData } from "@/hooks/useCRUD";
import { sortDatewise, changeNameToKey } from "@/utils/helpers";

interface DataType {
  key: string;
  panel_name?: string;
  panel_sub_type?: string;
  panel_main_type?: string;
}

export default function PanelDataList({
  revision_id,
}: {
  revision_id: string;
}) {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [projectRow, setProjectRow] = useState<any>(null);
  const getProjectPanelDataUrl = `${PROJECT_PANEL_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`;
  let { data: projectPanelData } = useGetData(getProjectPanelDataUrl);

  projectPanelData = sortDatewise(projectPanelData);

  const columns: ColumnsType<DataType> = [
    {
      title: "Panel Name",
      dataIndex: "panel_name",
      key: "panel_name",
      align: "center",
    },
    {
      title: "Panel Type",
      dataIndex: "panel_sub_type",
      key: "panel_sub_type",
      align: "center",
    },
    {
      title: "Panel Main Type",
      dataIndex: "panel_main_type",
      key: "panel_main_type",
      hidden: true,
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text: string, record: any) => (
        <div className="flex justify-center gap-2">
          <Tooltip placement="top" title="Edit">
            <Button
              type="link"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEditPanel(record)}
            />
          </Tooltip>

          <Tooltip placement="top" title="Delete">
            <Popconfirm
              title="Are you sure to delete this panel?"
              onConfirm={async () => await handleDeletePanel(record.name)}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button
                type="link"
                shape="circle"
                icon={<DeleteOutlined />}
                danger
              />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];
  const handleAddPanel = () => {
    setOpen(true);
    setEditMode(false);
    setProjectRow(null);
  };

  const handleEditPanel = async (record: any) => {
    setOpen(true);
    setEditMode(true);
    setProjectRow(record);
  };

  const handleDeletePanel = async (selectedRowID: string) => {
    await deleteData(`${DYNAMIC_DOCUMENT_API}/${selectedRowID}`, false);
    const panelData = await getData(`${PROJECT_PANEL_API}/${selectedRowID}`);
    const panelType = panelData?.panel_main_type;
    const panelId = panelData?.name;
    if (panelType === MCC_PANEL_TYPE) {
      const mccPanelData = await getData(
        `${MCC_PANEL}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panelId}"]]`
      );
      for (const mccPanel of mccPanelData || []) {
        const mccPanelID = mccPanel.name;
        await deleteData(`${MCC_PANEL}/${mccPanelID}`, false);
      }
    }
    if (panelType === PCC_PANEL_TYPE) {
      const pccPanelData = await getData(
        `${PCC_PANEL}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panelId}"]]`
      );
      for (const pccPanel of pccPanelData || []) {
        const pccPanelID = pccPanel.name;
        await deleteData(`${PCC_PANEL}/${pccPanelID}`, false);
      }
    }

    if (panelType === MCCcumPCC_PANEL_TYPE) {
      // Delete all MCC Cum PCC MCC Panel Data
      const mccCumPccMccPanelData = await getData(
        `${MCC_PANEL}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panelId}"]]&fields=["*"]`
      );
      for (const mccCumPccMccPanel of mccCumPccMccPanelData || []) {
        const mccCumPccMccPanelID = mccCumPccMccPanel.name;
        await deleteData(`${MCC_PANEL}/${mccCumPccMccPanelID}`, false);
      }

      // Delete all MCC_PCC_PLC_PANEL_1 Data
      const mccPccPlcPanel1Data = await getData(
        `${MCC_PCC_PLC_PANEL_1}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panelId}"]]&fields=["*"]`
      );

      for (const mccPccPlcPanel1 of mccPccPlcPanel1Data || []) {
        const mccPccPlcPanel1ID = mccPccPlcPanel1.name;
        await deleteData(`${MCC_PCC_PLC_PANEL_1}/${mccPccPlcPanel1ID}`, false);
      }

      // Delete all MCC_PCC_PLC_PANEL_2 Data
      const mccPccPlcPanel2Data = await getData(
        `${MCC_PCC_PLC_PANEL_2}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panelId}"]]&fields=["*"]`
      );

      for (const mccPccPlcPanel2 of mccPccPlcPanel2Data) {
        const mccPccPlcPanel2ID = mccPccPlcPanel2.name;
        await deleteData(`${MCC_PCC_PLC_PANEL_2}/${mccPccPlcPanel2ID}`, false);
      }
    }
    await deleteData(`${PROJECT_PANEL_API}/${selectedRowID}`, false);
    // Revalidate the cache
    mutate(getProjectPanelDataUrl);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-slate-800">Panel Summary</h4>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-700">
            Number of Panels: {projectPanelData?.length}
          </h4>
          <Button
            type="primary"
            iconPosition="start"
            icon={<PlusOutlined />}
            size="small"
            onClick={() => handleAddPanel()}
          >
            Add Panel
          </Button>
        </div>
      </div>
      <PanelFormModal
        open={open}
        setOpen={setOpen}
        editMode={editMode}
        values={projectRow}
        getProjectPanelUrl={getProjectPanelDataUrl}
        revisionId={revision_id}
      />
      <Table
        columns={columns}
        dataSource={changeNameToKey(projectPanelData)}
        bordered
        size="small"
      />
    </div>
  );
}
