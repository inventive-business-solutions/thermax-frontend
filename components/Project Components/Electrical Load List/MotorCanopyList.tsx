import { Button, Divider } from "antd"

const MotorCanopyList: React.FC = () => {
  return (
    <>
      <div className="flex w-full justify-start gap-2">
        <div className="text-xl font-bold">Motor Canopy List</div>
      </div>

      <Divider />

      <div className="flex w-full justify-end gap-3 mt-3">
        <Button type="primary">Get Motor Data</Button>
        <Button type="primary">Save</Button>
        <Button type="primary">Next</Button>
      </div>
    </>
  )
}

export default MotorCanopyList
