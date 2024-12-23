"use server"
import {
  SWITCHGEAR_API,
  SOFTSTARTER_SWITCHGEAR_API,
  SUPPLYFEEDER_SWITCHGEAR_API,
  VFD_SWITCHGEAR_API,
} from "configs/api-endpoints"
import { getData } from "./crud-actions"
import { HEATING } from "configs/constants"

export const getSwSelectionDetails = async (payload: any) => {
  const division = payload.division
  const swData = payload.data

  const filters_htr = JSON.stringify([["division_subtype", "=", "With Heater"]])
  let filters_all
  if (division === HEATING) {
    filters_all = JSON.stringify([
      ["division", "=", division],
      ["division_subtype", "=", "Without Heater"],
    ])
  } else {
    filters_all = JSON.stringify([["division", "=", division]])
  }
  console.log(">> HTR <<<", `${SWITCHGEAR_API}?filters=${filters_htr}&fields=["*"]&limit=2500`)
  console.log(">> All divisions <<<", `${SWITCHGEAR_API}?filters=${filters_all}&fields=["*"]&limit=2500`)

  const database_dol_htr = await getData(`${SWITCHGEAR_API}?filters=${filters_htr}&fields=["*"]&limit=2500`)
  const switchgear_database = await getData(`${SWITCHGEAR_API}?filters=${filters_all}&fields=["*"]&limit=2500`)
  const database_vfd = await getData(`${VFD_SWITCHGEAR_API}?fields=["*"]&limit=2500`)
  const database_soft_starter = await getData(`${SOFTSTARTER_SWITCHGEAR_API}?fields=["*"]&limit=2500`)
  const database_supply_feeder = await getData(`${SUPPLYFEEDER_SWITCHGEAR_API}?fields=["*"]&limit=3000`)

  const getSwitchgearSelection = (
    swData: any,
    database_dol_htr: any,
    switchgear_database: any,
    database_vfd: any,
    database_soft_starter: any,
    database_supply_feeder: any,
    division: string
  ) => {
    const result = swData
      ?.map((el: any) => {
        const { tag_number, kw, starter_type, make, sw_type, starting_time } = el

        if (starter_type === "DOL-HTR") {
          const matchingOptions = database_dol_htr.filter(
            (item: any) => item.make === make && item.sg_select === sw_type && item.starter_type === "HEATERS"
          )

          if (matchingOptions.length === 0) {
            return {
              tag_number,
              vfd: "",
              breaker_fuse: "",
              fuse_holder: "",
              contractor_main: "",
              contractor_star: "",
              contractor_delta: "",
              overlay_relay: "",
              terminal_part_no: "",
            }
          }

          const sortedByKW = matchingOptions.sort((a: any, b: any) => a.kw - b.kw)
          const switchgear = sortedByKW.find((item: any) => item.kw >= kw)

          if (!switchgear) {
            return {
              tag_number,
              vfd: "",
              breaker_fuse: "",
              fuse_holder: "",
              contractor_main: "",
              contractor_star: "",
              contractor_delta: "",
              overlay_relay: "",
              terminal_part_no: "",
            }
          }

          return {
            tag_number,
            vfd: "",
            breaker_fuse: switchgear.breaker,
            fuse_holder: "",
            contractor_main: switchgear.main_contractor_data || "",
            contractor_star: "",
            contractor_delta: "",
            overlay_relay: "",
            terminal_part_no: "",
          }
        }

        let matchingOptions
        if (starter_type === "VFD" || starter_type === "VFD BYPASS-S/D" || starter_type === "VFD Bypass DOL") {
          matchingOptions = database_vfd.filter((item: any) => item.vfd_make === make && item.sg_select === sw_type)
        } else if (starter_type === "DOL STARTER" || starter_type === "STAR-DELTA") {
          division === HEATING
            ? (matchingOptions = switchgear_database.filter(
                (item: any) =>
                  item.make === make &&
                  item.sg_select === sw_type &&
                  item.starter_type === starter_type &&
                  item.unit_7 === starting_time.split(" ")[0] + " sec" // converted Sec to sec (sec) is in database
              ))
            : (matchingOptions = switchgear_database.filter(
                (item: any) => item.make === make && item.sg_select === sw_type && item.starter_type === starter_type
              ))
        } else if (starter_type === "SOFT STARTER") {
          matchingOptions = [].filter(
            (item: any) => item.make === make && item.sg_select === sw_type && item.starter_type === starter_type
          ) // soft starter data is pending from client
        } else if (starter_type === "SUPPLY FEEDER") {
          matchingOptions = database_supply_feeder.filter(
            (item: any) => item.make === make && item.sg_select === sw_type && item.starter_type === starter_type
          )
        } else {
          matchingOptions = switchgear_database.filter(
            (item: any) => item.make === make && item.sg_select === sw_type && item.starter_type === starter_type
          )
        }

        if (matchingOptions.length === 0) {
          return {
            tag_number,
            vfd: "",
            breaker_fuse: "",
            fuse_holder: "",
            contractor_main: "",
            contractor_star: "",
            contractor_delta: "",
            overlay_relay: "",
            terminal_part_no: "",
          }
        }

        const sortedByKW = matchingOptions.sort((a: any, b: any) => a.kw - b.kw)
        const switchgear = sortedByKW.find((item: any) => item.kw >= kw)

        if (!switchgear) {
          return {
            tag_number,
            vfd: "",
            breaker_fuse: "",
            fuse_holder: "",
            contractor_main: "",
            contractor_star: "",
            contractor_delta: "",
            overlay_relay: "",
            terminal_part_no: "",
          }
        }
        console.log(switchgear)

        // for pair of starters like "VFD BYPASS-S/D" , "VFD Bypass DOL"

        let pair_starter_options
        if (starter_type === "VFD BYPASS-S/D") {
          let obj = swData?.find((item: any) => !item.make.includes("VFD")) // finding switchgear make from payload
          division === HEATING
            ? (pair_starter_options = switchgear_database.filter(
                (item: any) =>
                  item.make === obj.make &&
                  item.sg_select === sw_type &&
                  item.starter_type === "STAR-DELTA" &&
                  item.unit_7 === starting_time.split(" ")[0] + " sec" // converted Sec to sec (sec) is in database
              ))
            : (pair_starter_options = switchgear_database.filter(
                (item: any) =>
                  item.make === obj.make && item.sg_select === sw_type && item.starter_type === "STAR-DELTA"
              ))
        }
        if (starter_type === "VFD Bypass DOL") {
          let obj = swData?.find((item: any) => !item.make.includes("VFD")) // finding switchgear make from payload
          division === HEATING
            ? (pair_starter_options = switchgear_database.filter(
                (item: any) =>
                  item.make === obj.make &&
                  item.sg_select === sw_type &&
                  item.starter_type === "DOL STARTER" &&
                  item.unit_7 === starting_time.split(" ")[0] + " sec" // converted Sec to sec (sec) is in database
              ))
            : (pair_starter_options = switchgear_database.filter(
                (item: any) =>
                  item.make === obj.make && item.sg_select === sw_type && item.starter_type === "DOL STARTER"
              ))
        }
        const sortedByKWforPairStarter = pair_starter_options?.sort((a: any, b: any) => a.kw - b.kw)
        const switchgearForPairStarter = sortedByKWforPairStarter?.find((item: any) => item.kw >= kw)
        if(switchgearForPairStarter){

          console.log(switchgear, "vfd starter");
          console.log(switchgearForPairStarter, "paired starter");
          
        }
        return {
          tag_number,
          vfd: switchgear.vfd_model || "",
          breaker_fuse: switchgearForPairStarter?.breaker ?? switchgear?.breaker ?? "",
          fuse_holder: switchgearForPairStarter?.fuse_holder ?? switchgear.fuse_holder ?? "",
          contractor_main: switchgearForPairStarter?.main_contractor_data ?? switchgear.main_contractor_data ?? "",
          contractor_star: switchgearForPairStarter?.star_contractor ?? switchgear.star_contractor ?? "",
          contractor_delta: switchgearForPairStarter?.main_contractor_data
            ? switchgearForPairStarter?.main_contractor_data
            : starter_type === "STAR-DELTA"
            ? switchgear.main_contractor_data
            : "",
          overlay_relay: switchgearForPairStarter?.overload_relay ?? switchgear.overload_relay ?? "",
          terminal_part_no: switchgear.terminal_part_no || "",
        }
      })
      .filter(Boolean)

    return result
  }

  const result = getSwitchgearSelection(
    swData,
    database_dol_htr,
    switchgear_database,
    database_vfd,
    database_soft_starter,
    database_supply_feeder,
    division
  )
  return result
}
