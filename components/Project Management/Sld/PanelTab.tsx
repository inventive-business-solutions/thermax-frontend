import {
  CloudDownloadOutlined,
  FolderOpenOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Table, TableColumnsType, Tabs, Tag, Tooltip } from "antd";
import React from "react";
import { getThermaxDateFormat } from "@/utils/helpers";
import SwitchgearSelection from "./Switchgear Selection/SwitchgearSelection";
import Incomer from "./Incomer/Incomer";
import BusbarSizing from "./Busbar Sizing/BusbarSizing";
interface Props {
  panelData: any;
  sldRevisions: any;
  projectPanelData: any;
  designBasisRevisionId: string;
}
const PanelTab: React.FC<Props> = ({
  panelData,
  sldRevisions,
  projectPanelData,
  designBasisRevisionId,
}) => {
  const onChange = () => {};

  const columns: TableColumnsType = [
    {
      title: () => <div className="text-center">Document Name</div>,
      dataIndex: "documentName",
      align: "center",
      render: (text) => (
        <Tooltip title="Edit Revision" placement="top">
          <Button
            type="link"
            iconPosition="start"
            onClick={() => {}}
            icon={
              <FolderOpenOutlined
                style={{ color: "#fef65b", fontSize: "1.2rem" }}
              />
            }
            disabled={false}
          >
            {text}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: () => <div className="text-center">Status</div>,
      dataIndex: "status",
      render: (text) => (
        <div className="text-center">
          <Tag color="green">{text}</Tag>
        </div>
      ),
    },
    {
      title: () => <div className="text-center">Document Revision</div>,
      dataIndex: "documentRevision",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: () => <div className="text-center">Created Date</div>,
      dataIndex: "createdDate",
      render: (text) => {
        const date = new Date(text);
        const stringDate = getThermaxDateFormat(date);
        return stringDate;
      },
    },
    {
      title: () => <div className="text-center">Download</div>,
      dataIndex: "download",
      render() {
        return (
          <div className="flex flex-row justify-center gap-2 hover:cursor-pointer">
            <div>
              <Tooltip title={"Download"}>
                <Button
                  type="link"
                  shape="circle"
                  icon={
                    <CloudDownloadOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: "green",
                      }}
                      //   spin={downloadIconSpin}
                    />
                  }
                  //   onClick={() => handleDownload(record?.key)}
                />
              </Tooltip>
            </div>
          </div>
        );
      },
    },
    {
      title: () => <div className="text-center">Release</div>,
      dataIndex: "release",
      render: () => {
        return (
          <div className="text-center">
            <Button
              type="primary"
              size="small"
              name="Release"
              disabled={false}
              //   onClick={() => handleRelease(record.key)}
            >
              Release
            </Button>
          </div>
        );
      },
    },
  ];

  const dataSource = sldRevisions?.map((item: any, index: number) => ({
    key: item.name,
    documentName: "SLD",
    status: item.status,
    documentRevision: `R${index}`,
    createdDate: item.creation,
  }));
  console.log(panelData, "panel data ");
  const getLatestRevision = () => {
    return (
      sldRevisions?.find((item: any) => item.status === "Not Released") ?? {}
    );
  };

  const PanelTabs = [
    {
      label: "SLD REVISION",
      key: "1",
      children: (
        <>
          <div className="text-end">
            <Button icon={<SyncOutlined color="#492971" />} onClick={() => {}}>
              {" "}
              Refresh
            </Button>
          </div>

          <div className="mt-2">
            <Table columns={columns} dataSource={dataSource} size="small" />
          </div>
        </>
      ),
    },
    {
      label: "SWITCHGEAR SELECTION",
      key: "2",
      children: (
        <SwitchgearSelection
          designBasisRevisionId={designBasisRevisionId}
          data={panelData.data}
          revision_id={getLatestRevision().name}
        />
      ),
    },
    {
      label: "INCOMER",
      key: "3",
      children: (
        <Incomer
          designBasisRevisionId={designBasisRevisionId}
          panelData={panelData}
          projectPanelData={projectPanelData}
          revision_id={getLatestRevision().name}
        />
      ),
    },
    {
      label: "BUSBAR/ENCLOSURE SIZING",
      key: "4",
      children: <BusbarSizing designBasisRevisionId={designBasisRevisionId} />,
    },
    {
      label: "PANEL GA",
      key: "5",
      children: <h2>PANEL GA</h2>,
    },
    {
      label: "PANEL SPECIFICATIONS",
      key: "6",
      children: <h2>PANEL SPECIFICATIONS</h2>,
    },
  ];

  return (
    <div className="">
      <Tabs
        onChange={onChange}
        type="card"
        style={{ fontSize: "11px !important" }}
        items={PanelTabs}
      />
    </div>
  );
};

export default PanelTab;
