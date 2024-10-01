export const GET_PKG_URL = `/method/thermax_backend.thermax_backend.doctype.main_package.api.get_main_package_list`
export const MAIN_PKG_URL = "/document/Main Package"
export const SUB_PKG_URL = "/document/Sub Package"
export const AREA_CLASSIFICATION_URL = "/document/Area of Classification"
export const CLIENT_NAME_URL = `/document/Client?fields=["*"]`
export const CONSULTANT_NAME_URL = `/document/Consultant?fields=["*"]`

export const PROJECT_URL = `/document/Project`
export const USER_URL = `/document/User?fields=["name", "email"]`

export const getProjectListUrl = `${PROJECT_URL}?fields=["*"]&order_by=creation desc`
