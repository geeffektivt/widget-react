export type CauseId = string
export type OrganizationId = string

export interface Cause {
  id: CauseId
  name: string
  standardShare: number
  standardOrganizationShareText: string
  standardOrganizationShareExplanation: string
  organizations: Organization[]
}

export interface Organization {
  id: OrganizationId
  name: string
  infoUrl?: string
  shortDescription?: string
}
