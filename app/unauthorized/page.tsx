import { Result } from "antd"

export default function Unauthorised() {
  return <Result status="403" title="403" subTitle="Sorry, you are not authorized to access this page." />
}
