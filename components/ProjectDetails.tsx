"use client"
import { Button, Card, Flex, Modal } from "antd"
import { Divider } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import ProjectForm from "./ProjectForm"
import LogoImage from "../public/assets/images/eni_max_logo.png"
import { PlusCircleOutlined } from "@ant-design/icons"
import { PROJECT_LIST_PAGE } from "configs/constants"

const TitleStyles = {
  fontWeight: "bold",
  fontSize: "24px",
}
const ProjectArray1 = [
  {
    image: LogoImage,
    heading: "PROJECT SUMMARY",
    quantity: "163",
    colour: "Blue",
  },
]

const ProjectArray2 = [
  {
    image: LogoImage,
    heading: "FY 23-24",
    quantity: "122",
    colour: "Blue",
  },
  {
    image: LogoImage,
    heading: "FY 24-25",
    quantity: "189",
    colour: "grey",
  },
]

const ProjectDetails = () => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const onSubmit = () => {
    alert("Submited")
  }

  const handleCancel = () => {
    console.log("Clicked cancel button")
    setOpen(false)
  }

  return (
    <div>
      <div className="shadow-md">
        <Card
          title={
            <div className="flex justify-between">
              <h2 className="text-lg font-bold tracking-wide">Project Details</h2>
              <Button type="primary" icon={<PlusCircleOutlined />} iconPosition={"start"} onClick={() => setOpen(true)}>
                Add Project
              </Button>
            </div>
          }
        >
          <Flex gap="middle" justify="center">
            {ProjectArray1.map((item, index) => (
              <div key={index} className="shadow-md">
                <Link href={PROJECT_LIST_PAGE}>
                  <Card
                    style={{
                      boxShadow: "0px 1px 2px -2px rgba(0,0,0,0,16)",
                      borderBottom: `0.4rem solid ${item.colour}`,
                      minWidth: "300px",
                    }}
                    bordered={true}
                    className="flex flex-col rounded-md bg-gray-100"
                  >
                    <Flex gap="middle" align="center" wrap>
                      <div>
                        <Image src={item.image} alt="Description of the image" width={85} height={85} priority />
                      </div>
                      <Flex vertical align="center" justify="center">
                        <div style={{ fontSize: "1rem", fontWeight: "initial" }}>{item.heading}</div>
                        <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{item.quantity}</div>
                      </Flex>
                    </Flex>
                  </Card>
                </Link>
              </div>
            ))}
          </Flex>
          <Divider />
          <Flex gap="middle">
            {ProjectArray2.map((item, index) => (
              <div key={index} className="shadow-md">
                <Link href="/project_list">
                  <Card
                    style={{
                      boxShadow: "0px 1px 2px -2px rgba(0,0,0,0,16)",
                      borderBottom: `0.4rem solid ${item.colour}`,
                      minWidth: "300px",
                    }}
                    bordered={true}
                    className="flex flex-col rounded-md bg-gray-100"
                  >
                    <Flex gap="middle" align="center" wrap>
                      <div>
                        <Image src={item.image} alt="Description of the image" width={85} height={85} priority />
                      </div>
                      <Flex vertical align="center" justify="center">
                        <div style={{ fontSize: "1rem", fontWeight: "initial" }}>{item.heading}</div>
                        <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{item.quantity}</div>
                      </Flex>
                    </Flex>
                  </Card>
                </Link>
              </div>
            ))}
          </Flex>
        </Card>
      </div>

      <Modal
        title={<span style={{ fontSize: "2rem", fontWeight: "bold" }}>Add Project</span>}
        width={800}
        okText="Submit"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Divider />
        <ProjectForm onSubmit={onSubmit} />
        <Divider />
      </Modal>
    </div>
  )
}

export default ProjectDetails
