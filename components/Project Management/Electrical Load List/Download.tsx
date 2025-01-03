"use client";
import {
  CloudDownloadOutlined,
  FolderOpenOutlined,
  SaveTwoTone,
  SyncOutlined,
} from "@ant-design/icons";
import { downloadFile, getData } from "@/actions/crud-actions";
import {
  Button,
  message,
  Table,
  TableColumnsType,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import {
  CABLE_SCHEDULE_REVISION_HISTORY_API,
  COMMON_CONFIGURATION_1,
  COMMON_CONFIGURATION_2,
  COMMON_CONFIGURATION_3,
  ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API,
  GET_CABLE_SCHEDULE_EXCEL_API,
  GET_LOAD_LIST_EXCEL_API,
  LBPS_SPECIFICATIONS_REVISION_HISTORY_API,
  LOCAL_ISOLATOR_REVISION_HISTORY_API,
  MOTOR_CANOPY_REVISION_HISTORY_API,
  MOTOR_SPECIFICATIONS_REVISION_HISTORY_API,
  STATIC_DOCUMENT_API,
} from "@/configs/api-endpoints";
import { DB_REVISION_STATUS } from "@/configs/constants";
import { useGetData } from "@/hooks/useCRUD";
import "./DownloadComponent.css";
import { useLoading } from "@/hooks/useLoading";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import { getThermaxDateFormat } from "@/utils/helpers";

// interface TableDataType {
//   key: React.Key;
//   documentName: React.ReactNode;
//   status: string;
//   documentRevision: string;
//   createdDate: string;
//   action: React.ReactNode;
//   download: React.ReactNode;
//   release: React.ReactNode;
// }

// const columns: TableColumnType<TableDataType>[] = [
//   { title: "Document Name", dataIndex: "documentName" },
//   { title: "Status", dataIndex: "status" },
//   { title: "Document Revision", dataIndex: "documentRevision" },
//   { title: "Created Date", dataIndex: "createdDate" },
//   { title: "Action", dataIndex: "action" },
//   { title: "Download", dataIndex: "download", align: "left" },
//   { title: "Release", dataIndex: "release" },
// ];

// const DownloadTable = ({ dataSource }: { dataSource: TableDataType[] }) => {
//   return <Table columns={columns} dataSource={dataSource} pagination={false} />;
// };
interface Props {
  designBasisRevisionId: string;
  loadListLatestRevisionId: string;
}

const Download: React.FC<Props> = ({
  designBasisRevisionId,
  loadListLatestRevisionId,
}) => {
  const { setLoading: setModalLoading } = useLoading();
  const router = useRouter();
  const [downloadIconSpin, setDownloadIconSpin] = useState(false);
  // const [submitIconSpin, setSubmitIconSpin] = useState(false);

  const params = useParams();
  const project_id = params.project_id as string;

  const { data: documentList } = useGetData(
    `${STATIC_DOCUMENT_API}?fields=["*"]&filters=[["project_id", "=", "${project_id}"]]`
  );

  const dbLoadlistHistoryUrl = `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]&order_by=creation asc`;
  const { data: revisionHistory } = useGetData(dbLoadlistHistoryUrl);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [commonConfigData, setCommonConfigData] = useState<any[]>([]);
  const [loadListData, setLoadListData] = useState<any[]>([]);
  const [tabKey, setTabKey] = useState("1");
  // const userInfo: {
  //   division: string;
  // } = useCurrentUser();

  useEffect(() => {
    if (revisionHistory?.length) {
      const dataSource = revisionHistory?.map((item: any, index: number) => ({
        key: item.name,
        documentName: documentList[0]?.electrical_load_list,
        status: item.status,
        documentRevision: `R${index}`,
        createdDate: item.creation,
      }));
      setDataSource(dataSource);
    }
  }, [revisionHistory]);

  const getDownLoadEndpoint = () => {
    switch (tabKey) {
      case "1":
        return GET_LOAD_LIST_EXCEL_API;

      case "2":
        return GET_CABLE_SCHEDULE_EXCEL_API;
      default:
        return "";
    }
  };

  const handleDownload = async (revision_id: string) => {
    setDownloadIconSpin(true);
    console.log(revision_id);
    console.log(getDownLoadEndpoint());

    try {
      const result = await downloadFile(getDownLoadEndpoint(), true, {
        revision_id,
      });
      console.log(result);

      const byteArray = new Uint8Array(result?.data?.data); // Convert the array into a Uint8Array
      const excelBlob = new Blob([byteArray.buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(excelBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${getName(tabKey)}.xlsx`); // Filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      message.error("Unable to download file");

      setDownloadIconSpin(false);
    } finally {
      setDownloadIconSpin(false);
    }
  };

  const handleRelease = async (revision_id: string) => {
    setModalLoading(true);
    try {
      console.log(revision_id);
      // await copyDesignBasisRevision(project_id, revision_id)
      mutate(dbLoadlistHistoryUrl);
      message.success("Load list revision is released and locked");
    } catch (error) {
      console.error(error);
    } finally {
      setModalLoading(false);
    }
  };
  // const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);
  const getColumns = (tab: string) => {
    const columns: TableColumnsType = [
      {
        title: () => <div className="text-center">Document Name</div>,
        dataIndex: "documentName",
        align: "center",
        render: (text, record) => (
          <Tooltip title="Edit Revision" placement="top">
            <Button
              type="link"
              iconPosition="start"
              onClick={() => {
                if (
                  tab !== "motor-specs" &&
                  tab !== "lpbs-specs" &&
                  tab !== "local-isolator"
                ) {
                  setModalLoading(true);
                  router.push(
                    `/project/${project_id}/electrical-load-list/${tab}`
                  );
                }
              }}
              icon={
                <FolderOpenOutlined
                  style={{ color: "#fef65b", fontSize: "1.2rem" }}
                />
              }
              disabled={record.status === DB_REVISION_STATUS.Released}
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
        render(text, record) {
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
                        spin={downloadIconSpin}
                      />
                    }
                    onClick={() => handleDownload(record?.key)}
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
        render: (text, record) => {
          return (
            <div className="text-center">
              <Button
                type="primary"
                size="small"
                name="Release"
                disabled={record.status === DB_REVISION_STATUS.Released}
                onClick={() => handleRelease(record.key)}
              >
                Release
              </Button>
            </div>
          );
        },
      },
    ];
    const saveElement = {
      title: () => <div className="text-center">Save</div>,
      dataIndex: "download",
      render(text: any, record: any) {
        return (
          <div className="flex flex-row justify-center gap-2 hover:cursor-pointer">
            <div>
              <Tooltip title={"Save"}>
                <Button
                  type="link"
                  shape="circle"
                  icon={
                    <SaveTwoTone
                      style={{
                        fontSize: "1rem",
                        color: "green",
                      }}
                    />
                  }
                  onClick={() => handleSave(record?.key, tab)}
                />
              </Tooltip>
            </div>
          </div>
        );
      },
    };
    if (
      tab === "local-isolator" ||
      tab === "motor-specs" ||
      tab === "lpbs-specs"
    ) {
      const position = columns.length - 2;

      // Insert the element at the calculated position
      columns.splice(position, 0, saveElement);
    }
    return columns;
  };

  // const getSaveEndPoint = (id: any, tab: any) => {
  //   switch (tab) {
  //     case "local-isolator":
  //       return `${LOCAL_ISOLATOR_REVISION_HISTORY_API}${id}`;

  //     default:
  //       return "";
  //   }
  // };

  const handleSave = async (key: any, tab: any) => {
    if (tab === "local-isolator") {
      console.log(commonConfigData);
      console.log(loadListData);

      // const payload = {
      //   project_id: project_id,
      //   status: "Not Released",
      //   description: "test",
      //   local_isolator_data: [
      //     {
      //       fmi_type: "",
      //       fmi_inclosure: "",
      //       fmi_material: "",
      //       fmi_qty: "",
      //       ifm_isolator_color_shade: "",
      //       ifm_cable_entry: "",
      //       canopy_on_top: "",
      //     },
      //   ],
      //   local_isolator_motor_details_data: [
      //     {
      //       serial_number: "",
      //       tag_number: "",
      //       service_description: "",
      //       working_kw: "",
      //       motor_rated_current: "",
      //       local_isolator: "",
      //       motor_location: "",
      //     },
      //   ],
      // };
      // const respose = await updateData(getSaveEndPoint(key, tab), false, payload)

      // console.log(respose)
    }
    console.log(key, tab);
  };
  const DownloadTabs = [
    {
      label: `DOWNLOAD ELECTRICAL LOAD LIST`,
      key: "1",
      children: (
        <>
          <div className="text-end">
            <Button
              icon={<SyncOutlined color="#492971" />}
              onClick={() => mutate(dbLoadlistHistoryUrl)}
            >
              {" "}
              Refresh
            </Button>
          </div>

          <div className="mt-2">
            <Table
              columns={getColumns("load-list")}
              dataSource={dataSource}
              size="small"
            />
          </div>
        </>
      ),
    },
    {
      label: `DOWNLOAD CABLE SCHEDULE`,
      key: "2",
      children: (
        <>
          <div className="text-end">
            <Button
              icon={<SyncOutlined color="#492971" />}
              onClick={() => mutate(dbLoadlistHistoryUrl)}
            >
              {" "}
              Refresh
            </Button>
          </div>

          <div className="mt-2">
            <Table
              columns={getColumns("cable-schedule")}
              dataSource={dataSource}
              size="small"
            />
          </div>
        </>
      ),
    },
    {
      label: `DOWNLOAD MOTOR CANOPY LIST`,
      key: "3",
      children: (
        <>
          <div className="text-end">
            <Button
              icon={<SyncOutlined color="#492971" />}
              onClick={() => mutate(dbLoadlistHistoryUrl)}
            >
              {" "}
              Refresh
            </Button>
          </div>

          <div className="mt-2">
            <Table
              columns={getColumns("motor-canopy")}
              dataSource={dataSource}
              size="small"
            />
          </div>
        </>
      ),
    },
    {
      label: `DOWNLOAD MOTOR SPEC. & LIST`,
      key: "4",
      children: (
        <>
          <div className="text-end">
            <Button
              icon={<SyncOutlined color="#492971" />}
              onClick={() => mutate(dbLoadlistHistoryUrl)}
            >
              {" "}
              Refresh
            </Button>
          </div>

          <div className="mt-2">
            <Table
              columns={getColumns("motor-specs")}
              dataSource={dataSource}
              size="small"
            />
          </div>
        </>
      ),
    },
    {
      label: `LBPS SPECIFICATIONS & LIST`,
      key: "5",
      children: (
        <>
          <div className="text-end">
            <Button
              icon={<SyncOutlined color="#492971" />}
              onClick={() => mutate(dbLoadlistHistoryUrl)}
            >
              {" "}
              Refresh
            </Button>
          </div>

          <div className="mt-2">
            <Table
              columns={getColumns("lpbs-specs")}
              dataSource={dataSource}
              size="small"
            />
          </div>
        </>
      ),
    },
    {
      label: `LOCAL ISOLATOR SPECIFICATIONS LIST`,
      key: "6",
      children: (
        <>
          <div className="text-end">
            <Button
              icon={<SyncOutlined color="#492971" />}
              onClick={() => mutate(dbLoadlistHistoryUrl)}
            >
              {" "}
              Refresh
            </Button>
          </div>

          <div className="mt-2">
            <Table
              columns={getColumns("local-isolator")}
              dataSource={dataSource}
              size="small"
            />
          </div>
        </>
      ),
    },
  ];
  const getApiEndpoint = (key: any) => {
    const baseUrl = `?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]&order_by=creation asc`;
    switch (key) {
      case "1":
        return `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}${baseUrl}`;
      case "2":
        return `${CABLE_SCHEDULE_REVISION_HISTORY_API}${baseUrl}`;
      case "3":
        return `${MOTOR_CANOPY_REVISION_HISTORY_API}${baseUrl}`;
      case "4":
        return `${MOTOR_SPECIFICATIONS_REVISION_HISTORY_API}${baseUrl}`;
      case "5":
        return `${LBPS_SPECIFICATIONS_REVISION_HISTORY_API}${baseUrl}`;
      case "6":
        return `${LOCAL_ISOLATOR_REVISION_HISTORY_API}${baseUrl}`;
      default:
        return "";
    }
  };
  const getIsolatorData = async () => {
    console.log(designBasisRevisionId);

    try {
      const commonConfigData1 = await getData(
        `${COMMON_CONFIGURATION_1}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      );
      const commonConfigData2 = await getData(
        `${COMMON_CONFIGURATION_2}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      );

      const commonConfigData3 = await getData(
        `${COMMON_CONFIGURATION_3}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      );

      const commonConfigData = {
        ...commonConfigData1?.[0],
        ...commonConfigData2?.[0],
        ...commonConfigData3?.[0],
      };

      const loadListData = await getData(
        `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`
      );

      setLoadListData(loadListData);
      setCommonConfigData(commonConfigData);
      console.log(loadListData, "loadlist");
      console.log(commonConfigData, "commonConfigData");
    } catch (error) {
      console.error(error);
    } finally {
      setModalLoading(false);
    }
  };
  const getName = (key: any) => {
    switch (key) {
      case "1":
        return documentList[0]?.electrical_load_list;
      case "2":
        return documentList[0]?.electrical_cable_schedule;
      case "3":
        return documentList[0]?.motor_canopy_list_and_specification;
      case "4":
        return documentList[0]?.motor_specification;
      case "5":
        return documentList[0]?.lpbs_specifications_and_list;
      case "6":
        return documentList[0]?.local_isolator_specifications_and_list;
      default:
        return "";
    }
  };
  const onChange = async (key: string) => {
    setModalLoading(true);

    console.log(key);
    console.log(documentList);
    console.log(getApiEndpoint(key));

    try {
      // const documentList = await getData()

      // console.log(staticData,"staticData");

      const data = await getData(getApiEndpoint(key));
      console.log(data);

      const dataSource = data?.map((item: any, index: number) => ({
        key: item.name,
        documentName: getName(key),
        status: item.status,
        documentRevision: `R${index}`,
        createdDate: item.creation,
      }));
      if (key === "6") {
        await getIsolatorData();
      }
      console.log(dataSource);

      setDataSource(dataSource);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setModalLoading(false);
    }
    setTabKey(key);
  };

  return (
    <div className="">
      <Tabs
        onChange={onChange}
        type="card"
        style={{ fontSize: "11px !important" }}
        items={DownloadTabs}
      />
    </div>
  );
};

export default Download;
