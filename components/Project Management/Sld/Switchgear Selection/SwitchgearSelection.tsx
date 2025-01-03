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
import { getData, updateData } from "@/actions/crud-actions";
import {
  COMMON_CONFIGURATION_1,
  MAKE_OF_COMPONENT_API,
  SLD_REVISIONS_API,
} from "@/configs/api-endpoints";
import { useLoading } from "@/hooks/useLoading";
import { useParams } from "next/navigation";
import { switchGearSelectionColumns } from "@/components/Project Management/Electrical Load List/common/ExcelColumns";
import { ValidColumnType } from "@/components/Project Management/Electrical Load List/types";
import { getStandByKw } from "@/components/Project Management/Electrical Load List/Electrical Load List/LoadListComponent";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ENVIRO, HEATING } from "@/configs/constants";
import { getSwSelectionDetails } from "@/actions/sld";

interface Props {
  designBasisRevisionId: string;
  data: any[];
  revision_id: string;
}

const getArrayOfSwitchgearSelectionData = (
  data: any,
  sg_saved_data: any,
  commonConfiguration: any,
  makeComponents: any,
  division: string
) => {
  console.log(data, "load list data");
  console.log(sg_saved_data, "load list data sg_saved_data  ");

  if (sg_saved_data.length && !data.length) {
    return sg_saved_data.map((item: any) => {
      const arr = [
        item.tag_number,
        item.service_description,
        item?.hp || "",
        item.working_kw,
        item?.standby_kw,
        item.current,
        item.starter,
        item.make,
        item?.mcc_switchgear_type
          ? item.mcc_switchgear_type
          : commonConfiguration.mcc_switchgear_type,
        item?.vfd || "",
        item?.breaker_fuse || "",
        item?.fuse_holder || "",
        item?.contractor_main || "",
        item?.contractor_star || "",
        item?.contractor_delta || "",
        item?.overlay_relay || "",
        item?.terminal_part_number || "",
        item.cable_size || "",
        item.incomer,
      ];
      if (division === HEATING) {
        arr.splice(8, 0, item.starting_time);
      }
      if (division === ENVIRO) {
        arr.splice(5, 0, item.kva);
      }
      return arr;
    });
  }

  if (!data) return [];
  console.log(commonConfiguration, "commonConfiguration");

  return data.map((item: any) => {
    const savedItem = sg_saved_data?.find(
      (row: any) => row.tag_number === item.tag_number
    );
    let make;
    if (item.starter_type.includes("VFD")) {
      make = makeComponents.preferred_vfdvsd;
    } else if (item.starter_type.includes("SOFT STARTER")) {
      make = makeComponents.preferred_soft_starter;
    } else {
      make = makeComponents.preferred_lv_switchgear;
    }
    const arr = [
      item.tag_number,
      item.service_description,
      savedItem?.hp || "",
      item.working_kw,
      item.standby_kw,
      item.motor_rated_current,
      item.starter_type,
      savedItem?.make ?? make,
      savedItem?.mcc_switchgear_type
        ? savedItem.mcc_switchgear_type
        : commonConfiguration.mcc_switchgear_type,
      savedItem?.vfd || "",
      savedItem?.breaker_fuse || "",
      savedItem?.fuse_holder || "",
      savedItem?.contractor_main || "",
      savedItem?.contractor_star || "",
      savedItem?.contractor_delta || "",
      savedItem?.overlay_relay || "",
      savedItem?.terminal_part_number || "",
      item.cablesize || "",
      savedItem?.incomer
        ? savedItem.incomer
        : item.bus_segregation === "A"
        ? "Incomer 1"
        : "",
    ];
    if (division === HEATING) {
      arr.splice(8, 0, item.starting_time);
    }
    if (division === ENVIRO) {
      arr.splice(5, 0, item.kva);
    }
    return arr;
  });
};

const useDataFetching = (
  designBasisRevisionId: string,
  loadListData: any,
  division: string,
  revision_id: string
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [swSelectionData, setSwSelectionData] = useState<any[]>([]);
  const [commonConfiguration, setCommonConfiguration] = useState<any[]>([]);

  const [makeComponents, setMakeComponents] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const commonConfiguration = await getData(
        `${COMMON_CONFIGURATION_1}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      );
      // const commonConfiguration2 = await getData(
      //   `${COMMON_CONFIGURATION_2}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      // )
      // const commonConfiguration3 = await getData(
      //   `${COMMON_CONFIGURATION_3}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      // )

      // const commonConfiguration: any =  [...(commonConfiguration1 || []), ...(commonConfiguration2 || []), ...(commonConfiguration3 || [])].flat()
      const sg_saved_data = await getData(
        `${SLD_REVISIONS_API}/${revision_id}`
      );
      const makeComponents = await getData(
        `${MAKE_OF_COMPONENT_API}?fields=["preferred_soft_starter","preferred_lv_switchgear","preferred_vfdvsd"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      );
      console.log(commonConfiguration, "commonConfiguration");

      const formattedData = getArrayOfSwitchgearSelectionData(
        loadListData,
        sg_saved_data?.switchgear_selection_data,
        commonConfiguration[0],
        makeComponents[0],
        division
      );
      setMakeComponents(makeComponents[0]);
      setCommonConfiguration(commonConfiguration[0]);
      setSwSelectionData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    commonConfiguration,
    makeComponents,
    swSelectionData,
    loadListData,
    isLoading,
    refetch: fetchData,
  };
};

const SwitchgearSelection: React.FC<Props> = ({
  designBasisRevisionId,
  data,
  revision_id,
}) => {
  console.log(data, "switchgear");
  console.log(revision_id, "switchgear revision_id");

  const jRef = useRef<HTMLDivElement | null>(null);
  const [spreadsheetInstance, setSpreadsheetInstance] =
    useState<JspreadsheetInstance | null>(null);
  const { setLoading } = useLoading();
  const params = useParams();
  const userInfo: { division: string } = useCurrentUser();

  const project_id = params.project_id as string;

  const {
    commonConfiguration,
    makeComponents,
    swSelectionData,
    loadListData,
    isLoading,
  } = useDataFetching(
    designBasisRevisionId,
    data,
    userInfo.division,
    revision_id
  );
  console.log(swSelectionData, "switchegear data");

  const typedSwitchgearColumns = useMemo(
    () =>
      switchGearSelectionColumns(userInfo.division).map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  );
  useEffect(() => {
    const sortByBusSegregation = (data: any) => {
      const busA: any[] = [];
      const busB: any[] = [];
      const busC: any[] = [];
      const others: any[] = []; // For items with empty or different bus segregation values

      data.forEach((item: { bus_segregation: any }) => {
        const segregation = (item.bus_segregation || "").trim().toUpperCase();
        switch (segregation) {
          case "A":
            busA.push(item);
            break;
          case "B":
            busB.push(item);
            break;
          case "C":
            busC.push(item);
            break;
          default:
            others.push(item);
        }
      });

      return {
        busA,
        busB,
        busC,
        others,
      };
    };

    const sortedData = sortByBusSegregation(data);

    typedSwitchgearColumns.forEach((column) => {
      if (userInfo.division === HEATING) {
        if (column.name === "incomer") {
          column.source = ["Incomer 1", "Combine"];
        }
      } else {
        if (column.name === "incomer") {
          if (sortedData.busC.length) {
            column.source = ["Incomer 1", "Incomer 2", "Incomer 3", "Combine"];
          } else if (sortedData.busB.length) {
            column.source = ["Incomer 1", "Incomer 2", "Combine"];
          } else {
            column.source = ["Incomer 1"];
          }
        }
      }
    });
  }, [loadListData]);

  const swSelectionOptions = useMemo(
    () => ({
      data: swSelectionData,
      license: "39130-64ebc-bd98e-26bc4",
      columns: typedSwitchgearColumns,
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
    [typedSwitchgearColumns, swSelectionData]
  );

  // Initialize or update spreadsheet
  const initSpreadsheet = () => {
    // console.log(data);

    if (spreadsheetInstance) {
      spreadsheetInstance.destroy();
    }
    console.log(swSelectionData);

    const instance = jspreadsheet(jRef.current!, swSelectionOptions);
    setSpreadsheetInstance(instance);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading || !jRef.current) return;

    initSpreadsheet();

    return () => {
      spreadsheetInstance?.destroy();
    };
  }, [isLoading, swSelectionOptions]);
  useEffect(() => {
    console.log(data);

    if (data.length) {
      const formattedData = getArrayOfSwitchgearSelectionData(
        loadListData,
        [],
        commonConfiguration,
        makeComponents,
        userInfo.division
      );
      // setSwSelectionData(formattedData)
      console.log(formattedData, "formattedData");
      spreadsheetInstance?.setData(formattedData);
      // swSelectionData=formattedData;
      // initSpreadsheet()
    }
  }, [data]);

  const handleSgSave = async () => {
    const data = spreadsheetInstance?.getData();

    console.log(data, "all load list data");

    const payload = {
      switchgear_selection_data: data?.map((row: any) => {
        if (userInfo.division === ENVIRO) {
          return {
            tag_number: row[0],
            service_description: row[1],
            hp: Number(row[2]),
            working_kw: Number(row[3]),
            standby_kw: Number(row[4]),
            kva: Number(row[5]),
            current: Number(row[6]),
            starter: row[7],
            make: row[8],
            mcc_switchgear_type: row[9],
            vfd: row[10],
            breaker_fuse: row[11],
            fuse_holder: row[12],
            contractor_main: row[13],
            contractor_star: row[14],
            contractor_delta: row[15],
            overlay_relay: row[16],
            terminal_part_number: row[17],
            cable_size: row[18],
            incomer: row[19],
          };
        }
      }),
    };
    try {
      console.log(payload, "sg payload");
      setLoading(true);

      const respose = await updateData(
        `${SLD_REVISIONS_API}/${revision_id}`,
        false,
        payload
      );
      setLoading(false);
      message.success("Switchgear Selection Saved !");

      console.log(respose, "Switchgear Selection response");
    } catch (error) {
      console.error("Error saving Switchgear Selection list:", error);
      message.error("Unable to save Switchgear Selection list");

      setLoading(false);
    } finally {
      setLoading(false);
    }
    // Add your save logic here
  };
  const handleGetSwDetails = async () => {
    setLoading(true);

    const swData = spreadsheetInstance?.getData();
    try {
      const payload = {
        division: userInfo.division,
        project_id,
        data: swData?.map((item: any) => {
          return {
            tag_number: item[0],
            kw: getStandByKw(item[3], item[4]),
            starter_type: userInfo.division === ENVIRO ? item[7] : item[6],
            make: userInfo.division === ENVIRO ? item[8] : item[7],
            sw_type:
              userInfo.division === ENVIRO || userInfo.division === HEATING
                ? item[9]
                : item[8],
            starting_time: userInfo.division === HEATING ? item[8] : "",
          };
        }),
      };

      const sg_data = await getSwSelectionDetails(payload);
      const updatedSgData: any = swData?.map((row: any) => {
        const calculationResult = sg_data?.find(
          (item: any) => item.tag_number === row[0]
        );
        console.log(calculationResult);

        if (calculationResult) {
          const updatedRow = [...row];
          if (userInfo.division === HEATING || userInfo.division === ENVIRO) {
            updatedRow[10] = calculationResult.vfd;
            updatedRow[11] = calculationResult.breaker_fuse;
            updatedRow[12] = calculationResult.fuse_holder;
            updatedRow[13] = calculationResult.contractor_main;
            updatedRow[14] = calculationResult.contractor_star;
            updatedRow[15] = calculationResult.contractor_delta;
            updatedRow[16] = calculationResult.overlay_relay;
            updatedRow[17] = calculationResult.terminal_part_no;
          } else {
            updatedRow[9] = calculationResult.vfd;
            updatedRow[10] = calculationResult.breaker_fuse;
            updatedRow[11] = calculationResult.fuse_holder;
            updatedRow[12] = calculationResult.contractor_main;
            updatedRow[13] = calculationResult.contractor_star;
            updatedRow[14] = calculationResult.contractor_delta;
            updatedRow[15] = calculationResult.overlay_relay;
            updatedRow[16] = calculationResult.terminal_part_no;
          }

          return updatedRow;
        }
        return row;
      });
      console.log("updated sg_data", sg_data);
      console.log("updated calc", updatedSgData);

      spreadsheetInstance?.setData(updatedSgData);
      setLoading(false);
      // console.log(res,'motor calculations');
    } catch (error) {
      console.error("Error fetching switchgear details:", error);
    }
  };
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <>
      <div className="m-2 flex flex-col overflow-auto">
        {/* <IncomerSelector /> */}
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

        <Button
          type="primary"
          onClick={handleGetSwDetails}
          disabled={isLoading}
        >
          Get Switchgear Details
        </Button>
        <Button type="primary" onClick={handleSgSave} disabled={isLoading}>
          Save
        </Button>
        <Button type="primary" onClick={() => {}} disabled={isLoading}>
          Next
        </Button>
      </div>
    </>
  );
};

export default SwitchgearSelection;
