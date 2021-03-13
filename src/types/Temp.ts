export interface Shares {
  [id: number]: number
}

export interface IServerResponse<T> {
  status: number
  content: T | string
}

export interface OrganizationShare {
  id: number
  share: number
}
