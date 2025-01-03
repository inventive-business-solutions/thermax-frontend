"use client";
import jspreadsheet, { JspreadsheetInstance } from "jspreadsheet-ce";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import { Button, message, Spin } from "antd";
import { ValidColumnType } from "../types";
import { motorCanopyColumns } from "../common/ExcelColumns";
import { getData, updateData } from "@/actions/crud-actions";
import {
  ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API,
  MOTOR_CANOPY_REVISION_HISTORY_API,
} from "@/configs/api-endpoints";
import { useLoading } from "@/hooks/useLoading";
import { useParams } from "next/navigation";
import { getStandByKw } from "../Electrical Load List/LoadListComponent";
import { motorCanopyCalculation } from "@/actions/electrical-load-list";

interface MotorCanopyProps {
  loadListLatestRevisionId: string;
  motorCanopyRevisionId: string;
}

const getArrayOfMotorCanopyData = (data: any, motorCanopySavedData: any) => {
  if (!data?.electrical_load_list_data) return [];
  console.log(data.electrical_load_list_data, "load list");

  return data.electrical_load_list_data
    ?.filter(
      (item: any) =>
        (item.motor_scope === "THERMAX" || item.motor_scope === "VENDOR") &&
        item.motor_location === "OUTDOOR"
    )
    .map((item: any) => {
      const savedItem = motorCanopySavedData?.motor_canopy_data?.find(
        (row: any) => row.tag_number === item.tag_number
      );
      return [
        item.tag_number,
        item.service_description,
        savedItem?.quantity || "1",
        getStandByKw(item.working_kw, item.standby_kw),
        item.motor_rpm,
        item.motor_mounting_type,
        item.motor_frame_size,
        item.motor_location,
        savedItem?.moc || "FRP",
        savedItem?.canopy_model_number || "",
        savedItem?.canopy_leg_length || "",
        savedItem?.canopy_cut_out || "",
        savedItem?.part_code || "",
        item.motor_scope,
        savedItem?.remark || "",
      ];
    });
};
// const motorCanopyPayload = {
//   tag_number: "",
//   service_description: "",
//   qty: 0,
//   motor_rated_current: 0,
//   rpm: 0,
//   motor_mounting_type: "",
//   motor_frame_size: "",
//   motor_location: "",
//   moc: "",
//   canopy_model_number: "",
//   canopy_leg_length: "",
//   canopy_cut_out: "",
//   part_code: "",
//   motor_scope: "",
//   remark: "",
// };

const useDataFetching = (
  loadListLatestRevisionId: string,
  motorCanopyRevisionId: string
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [motorCanopyData, setMotorCanopyData] = useState<any[]>([]);
  // const [motorCanopySavedData, setMotorCanopySavedData] = useState<any[]>([]);
  // const {setLoading} = useLoading();
  const [loadListData, setLoadListData] = useState<any[]>([]);
  const fetchData = useCallback(async () => {
    if (!loadListLatestRevisionId) return;

    try {
      setIsLoading(true);
      const loadList = await getData(
        `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`
      );
      const motorCanopySavedData = await getData(
        `${MOTOR_CANOPY_REVISION_HISTORY_API}/${motorCanopyRevisionId}`
      );
      const formattedData = getArrayOfMotorCanopyData(
        loadList,
        motorCanopySavedData
      );
      //   console.log(savedCableSchedule, "savedCableSchedule")

      setLoadListData(loadList?.electrical_load_list_data);
      setMotorCanopyData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load data");
      setMotorCanopyData([]);
    } finally {
      setIsLoading(false);
    }
  }, [loadListLatestRevisionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { motorCanopyData, loadListData, isLoading, refetch: fetchData };
};

const MotorCanopy: React.FC<MotorCanopyProps> = ({
  loadListLatestRevisionId,
  motorCanopyRevisionId,
}) => {
  const jRef = useRef<HTMLDivElement | null>(null);
  const [spreadsheetInstance, setSpreadsheetInstance] =
    useState<JspreadsheetInstance | null>(null);
  const { setLoading } = useLoading();
  const params = useParams();

  const project_id = params.project_id as string;

  const { motorCanopyData, isLoading } = useDataFetching(
    loadListLatestRevisionId,
    motorCanopyRevisionId
  );

  const typedMotorCanopyColumns = useMemo(
    () =>
      motorCanopyColumns.map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  );

  // const typedMulticoreCableConfigColumns = useMemo(
  //   () =>
  //     multicoreCableConfigColumns.map((column) => ({
  //       ...column,
  //       type: column.type as ValidColumnType,
  //     })),
  //   []
  // );

  const cableScheduleOptions = useMemo(
    () => ({
      data: motorCanopyData,
      license: "39130-64ebc-bd98e-26bc4",
      columns: typedMotorCanopyColumns,
      columnSorting: true,
      columnDrag: true,
      columnResize: true,
      tableOverflow: true,
      lazyLoading: true,
      loadingSpin: true,
      filters: true,
      tableWidth: "100%",
      tableHeight: "550px",
      freezeColumns: 6,
      rowResize: true,
    }),
    [typedMotorCanopyColumns, motorCanopyData]
  );

  // Initialize or update spreadsheet
  useEffect(() => {
    if (isLoading || !jRef.current) return;

    const initSpreadsheet = () => {
      if (spreadsheetInstance) {
        spreadsheetInstance.destroy();
      }

      const instance = jspreadsheet(jRef.current!, cableScheduleOptions);
      setSpreadsheetInstance(instance);
      setLoading(false);
    };

    initSpreadsheet();

    return () => {
      spreadsheetInstance?.destroy();
    };
  }, [isLoading, cableScheduleOptions]);

  const handleMotorCanopySave = async () => {
    const data = spreadsheetInstance?.getData();

    console.log(data, "all load list data");

    const payload = {
      project_id: project_id,
      status: "Not Released",
      description: "test",
      motor_canopy_data: data?.map((row: any) => {
        return {
          tag_number: row[0],
          service_description: row[1],
          quantity: Number(row[2]),
          motor_rated_current: Number(row[3]),
          rpm: Number(row[4]),
          motor_mounting_type: row[5],
          motor_frame_size: row[6],
          motor_location: row[7],
          moc: row[8],
          canopy_model_number: row[9],
          canopy_leg_length: row[10],
          canopy_cut_out: row[11],
          part_code: row[12],
          motor_scope: row[13],
          remark: row[14],
        };
      }),
    };
    try {
      console.log(payload, "cable schedule payload");

      const respose = await updateData(
        `${MOTOR_CANOPY_REVISION_HISTORY_API}/${motorCanopyRevisionId}`,
        false,
        payload
      );
      setLoading(false);
      message.success("Motor Canopy Saved !");

      console.log(respose, "Motor Canopy response");
    } catch (error) {
      console.error("Error saving Motor Canopy:", error);
      message.error("Unable to save Motor Canopy list");

      setLoading(false);
    }
    // Add your save logic here
  };
  const getCanopyDetails = async () => {
    setLoading(true);

    const motorCanopyData = spreadsheetInstance?.getData();
    try {
      const payload = {
        data: motorCanopyData?.map((item: any) => {
          return {
            tag_number: item[0],
            kw: Number(item[3]),
            rpm: Number(item[4]),
            mounting_type: item[5],
            frame_size: item[6],
          };
        }),
      };

      const motorData = await motorCanopyCalculation(payload);
      const updatedLoadList: any = motorCanopyData?.map((row: any) => {
        const calculationResult = motorData?.find(
          (item: any) => item.tag_number === row[0]
        );
        console.log(calculationResult);

        if (calculationResult) {
          const updatedRow = [...row];
          updatedRow[9] = calculationResult.canopy_model_number;
          updatedRow[10] = calculationResult.canopy_leg_length;
          updatedRow[11] = calculationResult.canopy_cut_out;
          updatedRow[12] = calculationResult.part_code;
          return updatedRow;
        }
        return row;
      });
      console.log("updated calc", motorData);
      console.log("updated calc", updatedLoadList);

      spreadsheetInstance?.setData(updatedLoadList);
      // console.log(res,'motor calculations');
    } catch (error) {
      console.error("Error fetching Canopy Details:", error);
      message.error("Unable to fetch Canopy Details");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="m-2 flex flex-col overflow-auto">
        {isLoading ? (
          <div className="flex h-[550px] items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <div ref={jRef} />
        )}
      </div>

      <div className="flex w-full flex-row justify-end gap-2">
        {/* <Button type="primary">Get Cable Sizing</Button> */}
        <Button type="primary" onClick={getCanopyDetails} disabled={isLoading}>
          Get Canopy Details
        </Button>
        <Button
          type="primary"
          onClick={handleMotorCanopySave}
          disabled={isLoading}
        >
          Save
        </Button>
        <Button type="primary" onClick={() => {}} disabled={isLoading}>
          Next
        </Button>
      </div>
    </>
  );
};

export default MotorCanopy;
