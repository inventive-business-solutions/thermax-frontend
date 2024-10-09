"use client"
import { Card } from "antd"
import Image from "next/image"
import Link from "next/link"
import { PROJECTS_PAGE } from "configs/constants"
import LogoImage from "../public/eni_max_logo.png"
import { useEffect, useState } from "react"
import { useLoading } from "hooks/useLoading"

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

const ProjectDashboard = () => {
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
  }, [])
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold tracking-wide">Project Dashboard</h2>
        <div className="p-4">
          <div className="flex justify-center px-4 py-2 ">
            {ProjectArray1.map((item, index) => (
              <Link key={index} href={PROJECTS_PAGE} onClick={() => setModalLoading(true)}>
                <Card bordered hoverable className="shadow-md">
                  <div className="flex">
                    <div>
                      <Image src={item.image} alt="Description of the image" width={85} height={85} priority />
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-700">
                      <div className="font-bold">{item.heading}</div>
                      <div className="font-semibold">{item.quantity}</div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-start gap-4">
            {ProjectArray2.map((item, index) => (
              <Link key={index} href={PROJECTS_PAGE} onClick={() => setModalLoading(true)}>
                <Card className="shadow-md" bordered hoverable>
                  <div className="flex">
                    <div>
                      <Image src={item.image} alt="Description of the image" width={85} height={85} priority />
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-700">
                      <div className="font-bold">{item.heading}</div>
                      <div className="font-semibold">{item.quantity}</div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDashboard
