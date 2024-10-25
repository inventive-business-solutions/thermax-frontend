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
export const PROJECT_PANEL_API = `/document/Project Panel Data`
export const STATIC_DOCUMENT_API = `/document/Static Document List`
export const DYNAMIC_DOCUMENT_API = `/document/Dynamic Document List`

export const CLASSIFICATION_AREA_STANDARD_API = `/document/Classification Area Standard`
export const CLASSIFICATION_AREA_ZONE_API = `/document/Classification Area Zone`
export const CLASSIFICATION_AREA_GAS_GROUP_API = `/document/Classification Area Gas Group`
export const CLASSIFICATION_AREA_TEMPERATURE_CLASS_API = `/document/Classification Area Temperature Class`

export const PROJECT_MAIN_PKG_LIST_API = `/method/thermax_extended_user.get_project_main_package_list`
export const PROJECT_MAIN_PKG_API = `/document/Project Main Package`
export const BATTERY_LIMIT_API = `/document/Battery Limit`
export const DESIGN_BASIS_GENERAL_INFO_API = `/document/Design Basis General Info`

// Motor Parameters API Endpoints
export const MOTOR_PARAMETER_API = `/document/Design Basis Motor Parameters`
export const SAFE_EFFICIENCY_LEVEL = `/document/Efficiency Level Safe Area`
export const HAZARDOUS_EFFICIENCY_LEVEL = `/document/Efficiency Level Hazardous Area`
export const SAFE_INSULATION_CLASS = `/document/Insulation Class Safe Area`
export const HAZARDOUS_INSULATION_CLASS = `/document/Insulation Class Hazardous Area`
export const SAFE_TEMPERATURE_RISE = `/document/Safe Temperature Rise`
export const HAZARDOUS_TEMPERATURE_RISE = `/document/Hazardous Temperature Rise`
export const SAFE_MAXIMUM_TEMPERATURE = `/document/Maximum Deg C Safe`
export const HAZARDOUS_MAXIMUM_TEMPERATURE = `/document/Maximum Deg C Hazardous`
export const SAFE_MINIMUM_TEMPERATURE = `/document/Minimum Deg C Safe`
export const HAZARDOUS_MINIMUM_TEMPERATURE = `/document/Minimum Deg C Hazardous`
export const SAFE_ALTITUDE = `/document/Altitude Safe`
export const HAZARDOUS_ALTITUDE = `/document/Altitude Hazardous`
export const SAFE_ENCLOSURE_IP_RATING = `/document/Enclosure IP Rating Safe`
export const HAZARDOUS_ENCLOSURE_IP_RATING = `/document/Enclosure IP Rating Hazardous`
export const SAFE_TERMINAL_BOX_IP_RATING = `/document/IP rating for Terminal Box Safe`
export const HAZARDOUS_TERMINAL_BOX_IP_RATING = `/document/IP rating for Terminal Box Hazardous`
export const SAFE_THERMISTOR = `/document/Thermister Safe`
export const HAZARDOUS_THERMISTOR = `/document/Thermister Hazardous`
export const SAFE_SPACE_HEATER = `/document/Space Heater Safe`
export const HAZARDOUS_SPACE_HEATER = `/document/Space Heater Hazardous`
export const HAZARDOUS_CERTIFICATION = `/document/Hazardous Area Certification`
export const SAFE_BEARING_RTD = `/document/Bearing RTD Safe`
export const HAZARDOUS_BEARING_RTD = `/document/Bearing RTD Hazardous`
export const SAFE_WINDING_RTD = `/document/Winding RTD Safe`
export const HAZARDOUS_WINDING_RTD = `/document/Winding RTD Hazardous`
export const SAFE_DUTY = `/document/Duty Safe`
export const HAZARDOUS_DUTY = `/document/Duty Hazardous`
export const SAFE_BODY_MATERIAL = `/document/Body Material Safe`
export const HAZARDOUS_BODY_MATERIAL = `/document/Body Material Hazardous`
export const SAFE_TERMINAL_BOX_MATERIAL = `/document/Material of Terminal Box Safe`
export const HAZARDOUS_TERMINAL_BOX_MATERIAL = `/document/Material of Terminal Box Hazardous`

// Make of components Api end Points
export const MAKE_OF_COMPONENT_API = `/document/Make Of Components`
export const MAKE_MOTORS = `/document/Motors Make`
export const MAKE_CABLE = `/document/Cables Make`
export const MAKE_LV_SWITCHGEAR = `/document/LV Switchgear Make`
export const MAKE_PANEL_ENCLOSURE = `/document/Panel Enclosure Make`
export const MAKE_VFD_VSD = `/document/VFD VSD Make`
export const MAKE_SOFT_STARTER = `/document/Soft Starter Make`
export const MAKE_PLC = `/document/PLC Make`

// Common Coniguration on MCC/PCC :

export const DOL_STARTER = `/document/DOL Starter`
export const STAR_DELTA_STARTER = `/document/Star Delta Starter`
export const AMMETER = `/document/Ammeter`
export const AMMETER_CONFIGURATION = `/document/Ammeter Configuration`
export const MCC_SWITCHGEAR_TYPE = `/document/MCC Switchgear type`
export const SWITCHGEAR_COMBINATION = `/document/Switchgear Combination`

export const SUPPLY_FEEDER_POLE = `/document/Supply Feeder Pole`
export const SUPPLY_FEEDER_DM_STANDARD = `/document/Supply Feeder DM Standard`
export const SUPPLY_FEEDER_TESTING_STANDARD = `/document/Supply Feeder Testing Standard`
export const POWER_WIRING_COLOR = `/document/Power Wiring Color`
export const POWER_WIRING_LENGTH = `/document/Power Wiring Length`
export const CONTROL_WIRING_COLOR = `/document/Control Wiring Color`
export const CONTROL_WIRING_LENGTH = `/document/Control Wiring Length`
export const VDC_24_WIRING_COLOR = `/document/VDC 24 Wiring Color`
export const VDC_24_WIRING_LENGTH = `/document/VDC 24 Wiring Length`
export const ANALOG_SIGNAL_WIRING_COLOR = `/document/Analog Signal Wiring Color`
export const ANALOG_SIGNAL_WIRING_LENGTH = `/document/Analog Signal Wiring Length`
export const CT_WIRING_COLOR = `/document/CT Wiring Color`
export const CT_WIRING_LENGTH = `/document/CT Wiring Length`
export const CABLE_WIRING_PVC = `/document/Cable Insulation PVC`
export const FERRULE = `/document/Ferrule`
export const SPARE_TERMINAL = `/document/Spare Terminal`

export const TEST_RESET = `/document/Test Reset`
export const ALARM_ACKNOWLEDGE_AND_LAMP_TEST = `/document/Alarm Acknowledge and Lamp Test`
export const SPEED_DECREASE_PB = `/document/Speed Decrease PB`
export const SPEED_INCREASE_PB = `/document/Speed Increase PB`
export const PUSH_BUTTON_ESS = `/document/Push Button ESS`
export const PUSH_BUTTON_STOP = `/document/Push Button Stop`
export const PUSH_BUTTON_START = `/document/Push Button Start`

export const LR_SELECTOR_SWITCH_APPLICABLE = `/document/Applicable Selector Switch On MCC Panel Front Door`
export const LR_SELECTOR_LOCK_TYPE = `/document/Lockable Selector Switch On MCC Panel Front Door`

export const RUNNING_OPEN = `/document/Indicating Lamp Running Open`
export const STOPPED_CLOSED = `/document/Indicating Lamp Stopped Closed`
export const TRIP = `/document/Indicating Lamp Trip`

export const FIELD_MOTOR_TYPE = `/document/Field Motor Isolator General Type`
export const FIELD_MOTOR_ENCLOSURE = `/document/Field Motor Isolator General Enclosure`
export const FIELD_MOTOR_MATERIAL = `/document/Field Motor Isolator General Material`
export const FIELD_MOTOR_QTY = `/document/Field Motor Isolator General QTY`
export const FIELD_MOTOR_COLOUR_SHADE = `/document/Field Motor Isolator Color Shade`
export const FIELD_MOTOR_CABLE_ENTRY = `/document/Field Motor Isolator General Cable Entry`
export const FIELD_MOTOR_CANOPY_ON_TOP = `/document/Field Motor Isolator Canopy On Top`

export const LPBS_TYPE = `/document/Local Push Button Station Type`
export const LPBS_ENCLOSURE = `/document/Local Push Button Station Enclosure`
export const LPBS_MATERIAL = `/document/Local Push Button Station Material`
export const LPBS_QTY = `/document/Local Push Button Station Qty`
export const LPBS_COLOR_SHADE = `/documentLocal Push Button Station LPBS Color Shade/`
export const LPBS_CANOPY_ON_TOP = `/document/Field Motor Isolator Canopy On Top/`
export const LPBS_COLOR = `/document/LPBS Start Push Button Color/`
export const LPBS_INDICATOR_ON_COLOR = `/document/LPBS Start ON Indication Lamp Color/`
export const LPBS_INDICATOR_OFF_COLOR = `/document/LPBS Stop OFF Indication Lamp Color/`
export const LPBS_SPEED_INCREASE_BUTTON = `/document/LPBS Speed Increase Push Button/`
export const LPBS_SPEED_DECREASE_BUTTON = `/document/LPBS Speed Decrease Push Button/`

export const APFC_RELAY = `/document/APFC Relay`

export const PB_MAIN_BUSBAR_SELECTION = `/document/PB Main Busbar Selection`
export const PB_HEAT_PVC_SLEEVE = `/document/PB Heat Shrinkable Color PVC sleeve`
export const PB_CURRENT_DENSITY = `/document/PB Current Density`
export const CB_MAIN_BUSBAR_SELECTION = `/document/CB Main Busbar Selection`
export const CB_HEAT_PVC_SLEEVE = `/document/CB Heat Shrinkable Color PVC sleeve`
export const CB_CURRENT_DENSITY = `/document/CB Current Density`
export const EB_MAIN_BUSBAR_SELECTION = `/document/EB Main Busbar Selection`
export const EB_EARTH_BUSBAR_POSITION = `/document/EB Earth Busbar Position`
export const EB_CURRENT_DENSITY = `/document/EB Current Density`

export const METERING_FOR_FEEDER = `/document/Metering for Feeder`

// export const SUPPLY_FEEDER_DM_STANDARD = `/document/Supply Feeder DM Standard`

// Master Data
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
