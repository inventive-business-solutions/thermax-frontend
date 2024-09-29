import { Alert } from "antd" // Import Ant Design's Alert component
import React from "react"

const AlertNotification = ({
  message,
  status,
}: {
  message: string | null | React.ReactNode
  status: string | null
}) => {
  // Determine the alert type based on the status
  const alertType = status === "success" ? "success" : status === "error" ? "error" : null

  // Check if an alert should be shown
  const showAlert = message !== "" && alertType !== null

  return <>{showAlert && <Alert message={message} type={alertType} showIcon />}</>
}

export default AlertNotification
