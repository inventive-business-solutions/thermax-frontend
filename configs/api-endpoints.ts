export const GET_PKG_URL = `/method/thermax_backend.thermax_backend.doctype.main_package.api.get_main_package_list`
export const MAIN_PKG_URL = "/document/Main Package"
export const SUB_PKG_URL = "/document/Sub Package"
export const AREA_CLASSIFICATION_URL = "/document/Area of Classification"
export const CLIENT_NAME_URL = `/document/Client?fields=["*"]`
export const CONSULTANT_NAME_URL = `/document/Consultant?fields=["*"]`

export const PROJECT_URL = `/document/Project`
export const USER_API = `/document/User`
export const NEXT_AUTH_USER_API = `/document/NextAuthUser`
export const THERMAX_USER_API = `/document/Thermax Extended User`
export const DIVISION_API = `/document/Division`

export const getProjectListUrl = `${PROJECT_URL}?fields=["*"]&order_by=creation desc`
export const getUsersUrl = `${USER_API}?fields=["*"]&order_by=creation desc`

export const EMAIL_VERIFICATION_API = "/method/thermax_extended_user.trigger_email_verification_mail"

export const CREDENTIALS_EMAIL_API = "/method/thermax_extended_user.trigger_send_credentials"
