const ROOT_NODE = document.getElementById('root')

const getDomConfig = (attribute: string) => ROOT_NODE?.getAttribute(attribute)

export const USE_DEV_DATA = process.env.REACT_APP_USE_DEV_DATA === 'true'
export const API_URL = process.env.REACT_APP_API_URL

export const CHOSEN_ORGANIZATION_ID =
  getDomConfig('data-organization-id') ?? undefined

// To support donations from companies instead of individuals
export const IS_IN_COMPANY_MODE = getDomConfig('data-company-mode') === 'true'
