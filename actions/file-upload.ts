"use server"
import { dataURLtoFile } from "components/StudentProfile/profile-picture.logic"
import { getFileUploadClient } from "./axios-clients"

export const uploadFile = async (croppedImage: string, filename: string) => {
  //   const imageBlob = dataURLtoFile(croppedImage, "profile_picture.jpg")
  const axiosClient = await getFileUploadClient()
  const formData = new FormData()
  formData.append("file", croppedImage, filename)
  const response = await axiosClient.post("/method/upload_file", formData)
  return response.data
}
