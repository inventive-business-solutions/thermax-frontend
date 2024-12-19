"use server"
import {
  HEATERS_SWITCHGEAR_API,
  SOFTSTARTER_SWITCHGEAR_API,
  SUPPLYFEEDER_SWITCHGEAR_API,
  VFD_SWITCHGEAR_API,
} from "configs/api-endpoints"
import { getData } from "./crud-actions"
import { HEATING } from "configs/constants"

// export const getSwSelectionDetails = async (payload: any) => {
//   const division = payload.division
//   const swData = payload.data
//   const filters_htr = JSON.stringify([
//     ["division", "=", division],
//     ["division_subtype", "=", "With Heater"],
//   ])
//   const filters_all = JSON.stringify([
//     ["division", "=", division],
//     ["division_subtype", "=", "Without Heater"],
//   ])
//   const database_dol_htr = await getData(`${HEATERS_SWITCHGEAR_API}?filters=${filters_htr}&fields=["*"]&limit=1000`)
//   const database_heating = await getData(`${HEATERS_SWITCHGEAR_API}?filters=${filters_all}&fields=["*"]&limit=1000`)
//   const getSwitchgearSelection = (swData: any, database_dol_htr: any) => {
//     const result = swData
//       ?.map((el: any) => {
//         const { tag_number, kw, starter_type, make, sw_type, starting_time } = el;

//         if (starter_type === "DOL-HTR") {
//           const matchingOptions = database_dol_htr.filter(
//             (item: any) =>
//               item.make === make &&
//               item.sg_select === sw_type &&
//               item.starter_type === "HEATERS"
//           );

//           // If no matching options found, return object with empty strings
//           if (matchingOptions.length === 0) {
//             return {
//               tag_number,
//               vfd: "",
//               breaker_fuse: "",
//               fuse_holder: "",
//               contractor_main: "",
//               contractor_star: "",
//               contractor_delta: "",
//               overlay_relay: "",
//               terminal_part_no: "",
//             };
//           }

//           const sortedByKW = matchingOptions.sort((a: any, b: any) => a.kw - b.kw);
//           const switchgear = sortedByKW.find((item: any) => item.kw >= kw);

//           // If no matching or higher KW found, return object with empty strings
//           if (!switchgear) {
//             return {
//               tag_number,
//               vfd: "",
//               breaker_fuse: "",
//               fuse_holder: "",
//               contractor_main: "",
//               contractor_star: "",
//               contractor_delta: "",
//               overlay_relay: "",
//               terminal_part_no: "",
//             };
//           }

//           return {
//             tag_number,
//             vfd: "",
//             breaker_fuse: switchgear.breaker,
//             fuse_holder: "",
//             contractor_main: switchgear.main_contractor_data || "",
//             contractor_star: "",
//             contractor_delta: "",
//             overlay_relay: "",
//             terminal_part_no: "",
//           };
//         }
//         return null;
//       })
//       .filter(Boolean);

//     return result;
//   };
//   const result = getSwitchgearSelection(swData, database_dol_htr);

//   return result
// }

//   breaker_fuse: switchgear.breaker,
//   fuse_holder: switchgear.fuse_holder,
//   contractor_main: switchgear.main_contractor_data || "",
//   contractor_star: switchgear.star_contractor || "",
//   contractor_delta: switchgear.star_contractor || "",

export const getSwSelectionDetails = async (payload: any) => {
  const division = payload.division
  const swData = payload.data

  const filters_htr = JSON.stringify([
    ["division", "=", division],
    ["division_subtype", "=", "With Heater"],
  ])
  let filters_all
  if (division === HEATING) {
    filters_all = JSON.stringify([
      ["division", "=", division],
      ["division_subtype", "=", "Without Heater"],
    ])
  } else {
    filters_all = JSON.stringify([["division", "=", division]])
  }
console.log(">> HTR <<<",`${HEATERS_SWITCHGEAR_API}?filters=${filters_htr}&fields=["*"]&limit=2500`);
console.log(">> All divisions <<<",`${HEATERS_SWITCHGEAR_API}?filters=${filters_all}&fields=["*"]&limit=2500`);
 

  const database_dol_htr = await getData(`${HEATERS_SWITCHGEAR_API}?filters=${filters_htr}&fields=["*"]&limit=2500`)
  const database_heating = await getData(`${HEATERS_SWITCHGEAR_API}?filters=${filters_all}&fields=["*"]&limit=2500`)
  const database_vfd = await getData(`${VFD_SWITCHGEAR_API}?fields=["*"]&limit=2500`)
  const database_soft_starter = await getData(`${SOFTSTARTER_SWITCHGEAR_API}?fields=["*"]&limit=2500`)
  const database_supply_feeder = await getData(`${SUPPLYFEEDER_SWITCHGEAR_API}?fields=["*"]&limit=3000`)

  const getSwitchgearSelection = (
    swData: any,
    database_dol_htr: any,
    database_heating: any,
    database_vfd: any,
    database_soft_starter: any,
    database_supply_feeder: any,
    division: string
  ) => {
    const result = swData
      ?.map((el: any) => {
        const { tag_number, kw, starter_type, make, sw_type, starting_time } = el

        // Handle DOL-HTR case
        if (starter_type === "DOL-HTR" && division === HEATING) {
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
            contractor_delta: switchgear.main_contractor_data || "",
            overlay_relay: "",
            terminal_part_no: "",
          }
        }

        // Handle non-DOL-HTR case for Heating division
        let matchingOptions
        if (starter_type === "VFD") {
          matchingOptions = database_vfd.filter(
            (item: any) => item.vfd_make === make && item.sg_select === sw_type && item.starter_type === starter_type
          )
        } else if (division === HEATING && (starter_type === "DOL STARTER" || starter_type === "STAR-DELTA")) {
          matchingOptions = database_heating.filter(
            (item: any) =>
              item.make === make &&
              item.sg_select === sw_type &&
              item.starter_type === starter_type &&
              item.unit_7 === starting_time.split(" ")[0] + " sec" // converted Sec to sec (sec) is in database
          )
        } else if (starter_type === "SOFT STARTER") {
          matchingOptions = [].filter(
            (item: any) => item.make === make && item.sg_select === sw_type && item.starter_type === starter_type
          ) // soft starter data is pending from client
        } else if (starter_type === "SUPPLY FEEDER") {
          matchingOptions = database_supply_feeder.filter(
            (item: any) => item.make === make && item.sg_select === sw_type && item.starter_type === starter_type
          )
        } else {
          matchingOptions = database_heating.filter(
            (item: any) => item.make === make && item.sg_select === sw_type && item.starter_type === starter_type
          )
        }
        // console.log(database_heating);

        //star delta and dol use starting time filter
        // item.starting_time === starting_time

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

        return {
          tag_number,
          vfd: switchgear.vfd_model || "",
          breaker_fuse: switchgear.breaker || "",
          fuse_holder: switchgear.fuse_holder || "",
          contractor_main: switchgear.main_contractor_data || "",
          contractor_star: switchgear.star_contractor || "",
          contractor_delta: switchgear.main_contractor_data || "",
          overlay_relay: switchgear.overload_relay || "",
          terminal_part_no: switchgear.terminal_part_no || "",
        }
      })
      .filter(Boolean)

    return result
  }

  const result = getSwitchgearSelection(
    swData,
    database_dol_htr,
    database_heating,
    database_vfd,
    database_soft_starter,
    database_supply_feeder,
    division
  )
  return result
}
