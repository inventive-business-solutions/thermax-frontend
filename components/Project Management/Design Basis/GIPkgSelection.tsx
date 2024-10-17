"use client"

export default function GIPkgSelection({ main_pkg_name }: any) {
  //   const getSubPkgUrl = `${SUB_PKG_API}?fields=["*"]&filters=[["main_package_name","=", "${main_pkg_name}"]]`
  //   const { data: subPkgData } = useGetData(getSubPkgUrl, false)
  //   console.log(subPkgData)
  return (
    <div>
      <h4 className="text-sm font-semibold text-blue-500 hover:cursor-pointer">{main_pkg_name}</h4>
    </div>
  )
}
