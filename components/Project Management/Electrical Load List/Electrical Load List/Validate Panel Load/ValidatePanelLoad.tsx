import React from "react";
import Modal from "@/components/Modal/Modal";
import "./ValidatePanelLoad.css";
import { Table } from "antd";

export interface PanelData {
  panelName: string;
  totalLoadKw: number;
  totalCurrent: number;
}

interface ValidatePanelLoadProps {
  isOpen: boolean;
  onClose: () => void;
  panelsSumData: PanelData[];
}

const ValidatePanelLoad: React.FC<ValidatePanelLoadProps> = ({
  isOpen,
  onClose,
  panelsSumData,
}) => {
  const columns = [
    {
      title: "Panel Name",
      dataIndex: "panelName",
      key: "panelName",
      // align: "left" as String, // Explicitly set as AlignType
    },
    {
      title: "Total Load KW",
      dataIndex: "totalLoadKw",
      key: "totalLoadKw",
      // align: "left" as String, // Explicitly set as String
    },
    {
      title: "Total Current",
      dataIndex: "totalCurrent",
      key: "totalCurrent",
      // align: "left" as String, // Explicitly set as String
      render: (value: number) => value.toFixed(2),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="">
      <div className="m-5 flex flex-col p-5">
        <div className="modal-header mb-4 flex items-center justify-between">
          <h2 className="text-2xl">Validate Panel Load</h2>
        </div>
        <div className="modal-body">
          <Table
            columns={columns}
            dataSource={panelsSumData.map((item, index) => ({
              ...item,
              key: index,
            }))}
            pagination={false}
            bordered
            className="table-bordered custom-table"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ValidatePanelLoad;
