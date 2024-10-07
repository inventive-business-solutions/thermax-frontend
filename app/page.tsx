import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SIGN_IN } from "configs/constants"

export const metadata: Metadata = {
  title: "Electrical Suite",
}

export default async function Web() {
  return (
    <main className="min-h-dvh bg-[#f6f6f6] p-4">
      <div className="flex items-center justify-between">
        <div>
          <Image src="/logoLandingPage.png" alt="Thermax Logo" width={100} height={100} />
        </div>
        <div className="flex items-center gap-8">
          <div>
            <Link href={SIGN_IN}>
              <button className="rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700">SIGN IN</button>
            </Link>
          </div>

          <Image src="./eni_max_logo_svg_final.svg" alt="EniMax Logo" width={100} height={100} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex-1">
            <Image src="/factory2.png" alt="Factory Logo" width={500} height={500} />
          </div>
          <div className="flex flex-1 items-center justify-between gap-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image src="/heating.png" alt="Heating" width={100} height={100} />
              <h2 className="font-semibold text-slate-800">HEATING</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Image src="/airPolution2.png" alt="Air Pollution" width={100} height={100} />
              <h2 className="font-semibold text-slate-800">ENVIRO</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Image src="/wasteAndWater2.png" alt="Waste and Water" width={100} height={100} />
              <h2 className="font-semibold text-slate-800">WWS</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <h3 className="text-center text-lg font-bold tracking-wider text-slate-700">
            INTRODUCING THE FOREFRONT OF ELECTRICAL AND INSTRUMENTATION INNOVATION EnIMAX
          </h3>
          <h2 className="text-justify text-sm font-semibold text-slate-800">
            EnIMAX serves as an advanced engineering authoring tool, empowering engineers and designers to swiftly
            generate superior electrical and instrumentation designs and deliverables. With its capability to distribute
            discipline-specific data and designs within project teams, EnIMAX enables instantaneous collaboration among
            electrical and instrumentation disciplines, revolutionizing project dynamics
          </h2>
        </div>
      </div>
    </main>
  )
}
