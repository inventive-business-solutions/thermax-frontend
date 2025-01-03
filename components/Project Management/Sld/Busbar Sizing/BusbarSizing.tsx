import React, { useCallback, useEffect, useState } from "react";
import { Form, InputNumber, Card, Button, Select, message, Spin } from "antd";
import { getData } from "@/actions/crud-actions";
import { useParams } from "next/navigation";
import {
  COMMON_CONFIGURATION_1,
  COMMON_CONFIGURATION_2,
  COMMON_CONFIGURATION_3,
  PROJECT_INFO_API,
} from "@/configs/api-endpoints";

const useDataFetching = (designBasisRevisionId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [sg_data, setSg_data] = useState<any>([]);
  const [commonConfig, setCommonConfig] = useState<any>([]);
  // const [commonConfiguration, setCommonConfiguration] = useState<any[]>([])
  const [projectInfo, setProjectInfo] = useState<any>([]);
  // const [totalCountOfItems, setTotalCountOfItems] = useState<number>(0);
  const params = useParams();
  const project_id = params.project_id;
  const getProjectInfoUrl = `${PROJECT_INFO_API}/${project_id}`;

  // const [projectPanelData, setProjectPanelData] = useState<any>([]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const projectInfo = await getData(getProjectInfoUrl);
      // Fetch all required data in parallel
      const commonConfigData1 = await getData(
        `${COMMON_CONFIGURATION_1}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      );
      const commonConfigData2 = await getData(
        `${COMMON_CONFIGURATION_2}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      );

      const commonConfigData3 = await getData(
        `${COMMON_CONFIGURATION_3}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      );

      const commonConfig = {
        ...commonConfigData1?.[0],
        ...commonConfigData2?.[0],
        ...commonConfigData3?.[0],
      };

      console.log(commonConfig, "commonConfig");

      setProjectInfo(projectInfo);
      setCommonConfig(commonConfig);
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
    totalCountOfItems: 0,
    projectInfo,
    projectPanelData: [],
    sg_data: [],
    commonConfig,
    isLoading,
  };
};

interface Props {
  designBasisRevisionId: string;
}
const BusbarSizing: React.FC<Props> = ({ designBasisRevisionId }) => {
  const [form] = Form.useForm();
  const { projectInfo, commonConfig, isLoading } = useDataFetching(
    designBasisRevisionId
  );

  const onFinish = (values: any) => {
    console.log("Received values:", values);
  };
  useEffect(() => {
    if (projectInfo && commonConfig) {
      form.setFieldsValue({
        // Fault Current Details
        faultCurrent: projectInfo.fault_level,
        faultDuration: projectInfo.sec,

        // // Temperature Details
        operatingTemp: projectInfo.electrical_design_temperature,
        maxTempFault: projectInfo.maxTempFault,
        ambientTemp: projectInfo.ambient_temperature_max,
        // maxBusbarTemp: projectInfo.maxBusbarTemp,

        // // Material Details
        material: commonConfig.power_bus_material,
        materialConstant: projectInfo.power_bus_current_density, // current density power bus

        // // Enclosure Details
        // height: projectInfo.height,
        // depth: projectInfo.depth,
        // horizontalBusbarHeight: projectInfo.horizontalBusbarHeight,
        // horizontalCableHeight: projectInfo.horizontalCableHeight,
        // verticalBusbarWidth: projectInfo.verticalBusbarWidth,
        // verticalCableWidth: projectInfo.verticalCableWidth,
      });
    }
  }, [projectInfo, commonConfig]);

  return (
    <>
      {isLoading ? (
        <div className="flex h-[550px] items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="mx-auto max-w-6xl p-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            //   {...formItemLayout}
            className="space-y-4"
          >
            {/* Fault Current Details */}
            <Card title="Fault Current Details" className="shadow-sm">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Form.Item
                  label="Fault Current (kA)"
                  name="faultCurrent"
                  rules={[
                    { required: true, message: "Please enter fault current!" },
                  ]}
                >
                  <InputNumber min={0} disabled className="!w-full" />
                </Form.Item>
                <Form.Item
                  label="Fault Duration (Sec.)"
                  name="faultDuration"
                  rules={[
                    { required: true, message: "Please enter fault duration!" },
                  ]}
                >
                  <InputNumber min={0} disabled className="!w-full" />
                </Form.Item>
              </div>
            </Card>

            {/* Temperature Details */}
            <Card title="Temperature Details" className="shadow-sm">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Form.Item
                  label="Operating Temperature (Deg C)"
                  name="operatingTemp"
                  rules={[
                    {
                      required: true,
                      message: "Please enter operating temperature!",
                    },
                  ]}
                >
                  <InputNumber min={0} disabled className="!w-full" />
                </Form.Item>
                <Form.Item
                  label="Max. Temperature during fault (Deg C)"
                  name="maxTempFault"
                  rules={[
                    {
                      required: true,
                      message: "Please enter max temperature!",
                    },
                  ]}
                >
                  <InputNumber min={0} className="!w-full" />
                </Form.Item>
                <Form.Item
                  label="Ambient Temperature (Deg C)"
                  name="ambientTemp"
                  rules={[
                    {
                      required: true,
                      message: "Please enter ambient temperature!",
                    },
                  ]}
                >
                  <InputNumber min={0} disabled className="!w-full" />
                </Form.Item>
                <Form.Item
                  label="Max. Busbar Temperature rise (Deg C)"
                  name="maxBusbarTemp"
                  rules={[
                    {
                      required: true,
                      message: "Please enter max busbar temperature!",
                    },
                  ]}
                >
                  <InputNumber min={0} className="!w-full" />
                </Form.Item>
              </div>
            </Card>

            {/* Material Details */}
            <Card title="Material Details" className="shadow-sm">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Form.Item
                  label="Material"
                  name="material"
                  rules={[
                    { required: true, message: "Please select material!" },
                  ]}
                >
                  <Select
                    placeholder="Select material"
                    disabled
                    className="!w-full"
                  >
                    <Select.Option value="copper">Copper</Select.Option>
                    <Select.Option value="aluminum">Aluminum</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Material Constant"
                  name="materialConstant"
                  rules={[
                    {
                      required: true,
                      message: "Please enter material constant!",
                    },
                  ]}
                >
                  <InputNumber min={0} disabled className="!w-full" />
                </Form.Item>
              </div>
            </Card>

            {/* Enclosure Details */}
            <Card title="Enclosure Details" className="shadow-sm">
              <div className="space-y-6">
                {/* Overall Dimensions */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Form.Item
                    label="Height (mm)"
                    name="height"
                    rules={[
                      { required: true, message: "Please enter height!" },
                    ]}
                  >
                    <InputNumber min={0} className="!w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Depth (mm)"
                    name="depth"
                    rules={[{ required: true, message: "Please enter depth!" }]}
                  >
                    <InputNumber min={0} className="!w-full" />
                  </Form.Item>
                </div>

                {/* Chamber Dimensions */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Form.Item
                    label="Horizontal Busbar Chamber Height (mm)"
                    name="horizontalBusbarHeight"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter horizontal busbar chamber height!",
                      },
                    ]}
                  >
                    <InputNumber min={0} className="!w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Horizontal Cable Chamber Height (mm)"
                    name="horizontalCableHeight"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter horizontal cable chamber height!",
                      },
                    ]}
                  >
                    <InputNumber min={0} className="!w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Vertical Busbar Chamber Width (mm)"
                    name="verticalBusbarWidth"
                    rules={[
                      {
                        required: true,
                        message: "Please enter vertical busbar chamber width!",
                      },
                    ]}
                  >
                    <InputNumber min={0} className="!w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Vertical Cable Chamber Width (mm)"
                    name="verticalCableWidth"
                    rules={[
                      {
                        required: true,
                        message: "Please enter vertical cable chamber width!",
                      },
                    ]}
                  >
                    <InputNumber min={0} className="!w-full" />
                  </Form.Item>
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-2">
              <Button type="primary" htmlType="button">
                Calculate Busbar Sizing
              </Button>
              <Button type="primary" htmlType="button">
                Download Busbar Sizing
              </Button>
              <Button type="primary" htmlType="submit">
                Save And Next
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>

    // <div className="mx-auto max-w-3xl">
    //   <Form form={form} layout="horizontal" onFinish={onFinish} className="space-y-2">
    //     {/* Fault Current Details */}
    //     <Card title="Fault Current Details" className="p-0 shadow-sm">
    //       <div className="grid grid-cols-1 md:grid-cols-2">
    //         <Form.Item
    //           label="Fault Current (kA)"
    //           name="faultCurrent"
    //           className="text-blue-500"
    //           rules={[{ required: true, message: "Please enter fault current!" }]}
    //         >
    //           <InputNumber readOnly min={0} className="w-full" />
    //         </Form.Item>
    //         <Form.Item
    //           label="Fault Duration (Sec.)"
    //           name="faultDuration"
    //           rules={[{ required: true, message: "Please input fault duration!" }]}
    //         >
    //           <InputNumber min={0} className="w-full" />
    //         </Form.Item>
    //       </div>
    //     </Card>

    //     {/* Temperature Details */}
    //     <Card title="Temperature Details" className="shadow-sm">
    //       <div className="grid grid-cols-1 md:grid-cols-2">
    //         <Form.Item
    //           label="Operating Temperature (Deg C)"
    //           name="operatingTemp"
    //           rules={[{ required: true, message: "Please input operating temperature!" }]}
    //         >
    //           <InputNumber min={0} className="w-full" />
    //         </Form.Item>
    //         <Form.Item
    //           label="Max. Temperature during fault (Deg C)"
    //           name="maxTempFault"
    //           rules={[{ required: true, message: "Please input max temperature!" }]}
    //         >
    //           <InputNumber min={0} className="w-full" />
    //         </Form.Item>
    //         <Form.Item
    //           label="Ambient Temperature (Deg C)"
    //           name="ambientTemp"
    //           rules={[{ required: true, message: "Please input ambient temperature!" }]}
    //         >
    //           <InputNumber min={0} className="w-full" />
    //         </Form.Item>
    //         <Form.Item
    //           label="Max. Busbar Temperature rise (Deg C)"
    //           name="maxBusbarTemp"
    //           rules={[{ required: true, message: "Please input max busbar temperature!" }]}
    //         >
    //           <InputNumber min={0} className="w-full" />
    //         </Form.Item>
    //       </div>
    //     </Card>

    //     {/* Material Details */}
    //     <Card title="Material Details" className="shadow-sm">
    //       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    //         <Form.Item
    //           label="Material"
    //           name="material"
    //           rules={[{ required: true, message: "Please select material!" }]}
    //         >
    //           <Select placeholder="Select material">
    //             <Select.Option value="copper">Copper</Select.Option>
    //             <Select.Option value="aluminum">Aluminum</Select.Option>
    //           </Select>
    //         </Form.Item>
    //         <Form.Item
    //           label="Material Constant"
    //           name="materialConstant"
    //           rules={[{ required: true, message: "Please input material constant!" }]}
    //         >
    //           <InputNumber min={0} className="w-full" />
    //         </Form.Item>
    //       </div>
    //     </Card>

    //     {/* Enclosure Details */}
    //     <Card title="Enclosure Details" className="shadow-sm">
    //       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    //         {/* Overall Dimensions */}
    //         <div className="col-span-2">
    //           {/* <h3 className="mb-4 text-lg font-medium">Overall Dimensions</h3> */}
    //           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    //             <Form.Item
    //               label="Height (mm)"
    //               name="height"
    //               rules={[{ required: true, message: "Please input height!" }]}
    //             >
    //               <InputNumber min={0} className="w-full" />
    //             </Form.Item>

    //             <Form.Item label="Depth (mm)" name="depth" rules={[{ required: true, message: "Please input depth!" }]}>
    //               <InputNumber min={0} className="w-full" />
    //             </Form.Item>
    //           </div>
    //         </div>

    //         {/* Chamber Dimensions */}
    //         <div className="col-span-2">
    //           {/* <h3 className="mb-4 text-lg font-medium">Chamber Dimensions</h3> */}
    //           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    //             <Form.Item
    //               label="Horizontal Busbar Chamber Height (mm)"
    //               name="horizontalBusbarHeight"
    //               rules={[{ required: true, message: "Please input horizontal busbar chamber height!" }]}
    //             >
    //               <InputNumber min={0} className="w-full" />
    //             </Form.Item>
    //             <Form.Item
    //               label="Horizontal Cable Chamber Height (mm)"
    //               name="horizontalCableHeight"
    //               rules={[{ required: true, message: "Please input horizontal cable chamber height!" }]}
    //             >
    //               <InputNumber min={0} className="w-full" />
    //             </Form.Item>
    //             <Form.Item
    //               label="Vertical Busbar Chamber Width (mm)"
    //               name="verticalBusbarWidth"
    //               rules={[{ required: true, message: "Please input vertical busbar chamber width!" }]}
    //             >
    //               <InputNumber min={0} className="w-full" />
    //             </Form.Item>
    //             <Form.Item
    //               label="Vertical Cable Chamber Width (mm)"
    //               name="verticalCableWidth"
    //               rules={[{ required: true, message: "Please input vertical cable chamber width!" }]}
    //             >
    //               <InputNumber min={0} className="w-full" />
    //             </Form.Item>
    //           </div>
    //         </div>
    //       </div>
    //     </Card>
    //     <div className="flex justify-end gap-2">
    //       <Button type="primary" htmlType="button" className="w-auto">
    //         Calculate Busbar Sizing
    //       </Button>
    //       <Button type="primary" htmlType="button" className="w-auto">
    //         Download Busbar Sizing
    //       </Button>
    //       <Button type="primary" htmlType="submit" className="w-auto" onClick={() => {}}>
    //         Save And Next
    //       </Button>
    //     </div>
    //   </Form>
    // </div>
  );
};

export default BusbarSizing;

// <div className="max-w-6xl mx-auto p-4">
// <Form
//   form={form}
//   layout="vertical"
//   onFinish={onFinish}
//   {...formItemLayout}
//   className="space-y-4"
// >
//   {/* Fault Current Details */}
//   <Card title="Fault Current Details" className="shadow-sm">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <Form.Item
//         label="Fault Current (kA)"
//         name="faultCurrent"
//         rules={[{ required: true, message: "Please enter fault current!" }]}
//       >
//         <InputNumber min={0} className="!w-full" />
//       </Form.Item>
//       <Form.Item
//         label="Fault Duration (Sec.)"
//         name="faultDuration"
//         rules={[{ required: true, message: "Please input fault duration!" }]}
//       >
//         <InputNumber min={0} className="!w-full" />
//       </Form.Item>
//     </div>
//   </Card>

//   {/* Temperature Details */}
//   <Card title="Temperature Details" className="shadow-sm">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <Form.Item
//         label="Operating Temperature (Deg C)"
//         name="operatingTemp"
//         rules={[{ required: true, message: "Please input operating temperature!" }]}
//       >
//         <InputNumber min={0} className="!w-full" />
//       </Form.Item>
//       <Form.Item
//         label="Max. Temperature during fault (Deg C)"
//         name="maxTempFault"
//         rules={[{ required: true, message: "Please input max temperature!" }]}
//       >
//         <InputNumber min={0} className="!w-full" />
//       </Form.Item>
//       <Form.Item
//         label="Ambient Temperature (Deg C)"
//         name="ambientTemp"
//         rules={[{ required: true, message: "Please input ambient temperature!" }]}
//       >
//         <InputNumber min={0} className="!w-full" />
//       </Form.Item>
//       <Form.Item
//         label="Max. Busbar Temperature rise (Deg C)"
//         name="maxBusbarTemp"
//         rules={[{ required: true, message: "Please input max busbar temperature!" }]}
//       >
//         <InputNumber min={0} className="!w-full" />
//       </Form.Item>
//     </div>
//   </Card>

//   {/* Material Details */}
//   <Card title="Material Details" className="shadow-sm">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <Form.Item
//         label="Material"
//         name="material"
//         rules={[{ required: true, message: "Please select material!" }]}
//       >
//         <Select placeholder="Select material" className="!w-full">
//           <Select.Option value="copper">Copper</Select.Option>
//           <Select.Option value="aluminum">Aluminum</Select.Option>
//         </Select>
//       </Form.Item>
//       <Form.Item
//         label="Material Constant"
//         name="materialConstant"
//         rules={[{ required: true, message: "Please input material constant!" }]}
//       >
//         <InputNumber min={0} className="!w-full" />
//       </Form.Item>
//     </div>
//   </Card>

//   {/* Enclosure Details */}
//   <Card title="Enclosure Details" className="shadow-sm">
//     <div className="space-y-6">
//       {/* Overall Dimensions */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Form.Item
//           label="Height (mm)"
//           name="height"
//           rules={[{ required: true, message: "Please input height!" }]}
//         >
//           <InputNumber min={0} className="!w-full" />
//         </Form.Item>
//         <Form.Item
//           label="Depth (mm)"
//           name="depth"
//           rules={[{ required: true, message: "Please input depth!" }]}
//         >
//           <InputNumber min={0} className="!w-full" />
//         </Form.Item>
//       </div>

//       {/* Chamber Dimensions */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Form.Item
//           label="Horizontal Busbar Chamber Height (mm)"
//           name="horizontalBusbarHeight"
//           rules={[{ required: true, message: "Please input horizontal busbar chamber height!" }]}
//         >
//           <InputNumber min={0} className="!w-full" />
//         </Form.Item>
//         <Form.Item
//           label="Horizontal Cable Chamber Height (mm)"
//           name="horizontalCableHeight"
//           rules={[{ required: true, message: "Please input horizontal cable chamber height!" }]}
//         >
//           <InputNumber min={0} className="!w-full" />
//         </Form.Item>
//         <Form.Item
//           label="Vertical Busbar Chamber Width (mm)"
//           name="verticalBusbarWidth"
//           rules={[{ required: true, message: "Please input vertical busbar chamber width!" }]}
//         >
//           <InputNumber min={0} className="!w-full" />
//         </Form.Item>
//         <Form.Item
//           label="Vertical Cable Chamber Width (mm)"
//           name="verticalCableWidth"
//           rules={[{ required: true, message: "Please input vertical cable chamber width!" }]}
//         >
//           <InputNumber min={0} className="!w-full" />
//         </Form.Item>
//       </div>
//     </div>
//   </Card>

//   <div className="flex justify-end gap-2">
//     <Button type="primary" htmlType="button">
//       Calculate Busbar Sizing
//     </Button>
//     <Button type="primary" htmlType="button">
//       Download Busbar Sizing
//     </Button>
//     <Button type="primary" htmlType="submit">
//       Save And Next
//     </Button>
//   </div>
// </Form>
// </div>
