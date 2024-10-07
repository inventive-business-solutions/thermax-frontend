import { Button, Divider } from "antd"

const CableSchedule: React.FC = () => {
  return (
    <>
      <div className="flex w-full justify-between gap-2">
        <div className="text-xl font-bold">Cable Sizing Report</div>
        <Button type="primary">Multicore Cable Configuration</Button>
      </div>

      <Divider />

      <div className="flex w-full justify-end gap-3 mt-3">
        <Button type="primary">Download Cable Sizing</Button>
        <Button type="primary">Calculate</Button>
        <Button type="primary">Recalculate</Button>
        <Button type="primary">Save</Button>
        <Button type="primary">Next</Button>
      </div>
    </>
  )
}

export default CableSchedule
