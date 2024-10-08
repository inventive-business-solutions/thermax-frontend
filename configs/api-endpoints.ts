export const GET_PKG_API = `/method/thermax_backend.thermax_backend.doctype.main_package.api.get_main_package_list`
export const MAIN_PKG_API = "/document/Main Package"
export const SUB_PKG_API = "/document/Sub Package"
export const AREA_CLASSIFICATION_API = "/document/Area of Classification"
export const CLIENT_NAME_API = `/document/Client?fields=["*"]`
export const CONSULTANT_NAME_API = `/document/Consultant?fields=["*"]`

export const PROJECT_API = `/document/Project`
export const PROJECT_INFO_API = `/document/Project Information`
export const USER_API = `/document/User`
export const NEXT_AUTH_USER_API = `/document/NextAuthUser`
export const THERMAX_USER_API = `/document/Thermax Extended User`
export const DIVISION_API = `/document/Division`

export const PANEL_TYPE_API = `document/Panel Type`
export const MAIN_SUPPLY_MV_API = `document/Main Supply MV`
export const MAIN_SUPPLY_LV_API = `document/Main Supply LV`
export const VOLTAGE_VARIATION_API = `document/Voltage Variation`
export const FREQUENCY_VARIATION_API = `document/Frequency Variation`
export const FREQUENCY_API = `document/Frequency`
export const MAIN_SUPPLY_PHASE_API = `document/Main Supply Phase`
export const CONTROL_UTILITY_PHASE_API = `document/Control and Utility Supply Phase`
export const CONTROL_SUPPLY_API = `document/Control Supply`
export const UTILITY_SUPPLY_API = `document/Utility Supply`
export const AMBIENT_TEMP_MAX_API = `document/Ambient Temperature Max`
export const FAULT_LEVEL_API = `document/Fault Level`
export const SEC_API = `document/Sec`
export const ELECTRICAL_DESIGN_TEMP_API = `document/Electrical Design Temp`
export const SEISMIC_ZONE_API = `document/Seismic zone`

export const getProjectListUrl = `${PROJECT_API}?fields=["*"]&order_by=creation desc`
export const getUsersUrl = `${USER_API}?fields=["*"]&order_by=creation desc`

export const EMAIL_VERIFICATION_API = "/method/thermax_extended_user.trigger_email_verification_mail"

export const CREDENTIALS_EMAIL_API = "/method/thermax_extended_user.trigger_send_credentials"
