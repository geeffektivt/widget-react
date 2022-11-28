import { Organization } from '../../@types/import/content/organizations.types'
import { ShareType } from '../../constants/enums/ShareType'

import {
  resetDistributionsHelper,
  resetOrgDistribution,
} from './donation.reducerHelpers'

const organizations: Organization[] = [
  {
    id: '1',
    name: 'Name1',
    infoUrl: 'url1',
    shortDescription: 'desc1',
  },
  {
    id: '2',
    name: 'Name2',
    infoUrl: 'url2',
    shortDescription: 'desc2',
  },
  {
    id: '3',
    name: 'Name3',
    infoUrl: 'url3',
    shortDescription: 'desc3',
  },
  {
    id: '4',
    name: 'Name4',
    infoUrl: 'url4',
    shortDescription: 'desc4',
  },
]

const getOrganizations = (idPrefix: string) =>
  organizations.map((o) => ({ ...o, id: idPrefix + o.id }))

const causes = [
  {
    id: '1',
    name: 'Cause1',
    standardShare: 0,
    standardOrganizationShareText: 'text',
    standardOrganizationShareExplanation: 'text',
    organizations: getOrganizations('1'),
  },
  {
    id: '2',
    name: 'Cause2',
    standardShare: 50,
    standardOrganizationShareText: 'text',
    standardOrganizationShareExplanation: 'text',
    organizations: getOrganizations('2'),
  },
  {
    id: '3',
    name: 'Cause3',
    standardShare: 50,
    standardOrganizationShareText: 'text',
    standardOrganizationShareExplanation: 'text',
    organizations: getOrganizations('3'),
  },
]

describe('resetOrgDistribution', () => {
  it('should work with even distribution', () => {
    const result = resetOrgDistribution(organizations, 1000)
    expect(result[0].id).toBe('1')
    expect(result[0].share).toBe(25)
    expect(result[0].sum).toBe(250)
    expect(result[1].id).toBe('2')
    expect(result[1].share).toBe(25)
    expect(result[1].sum).toBe(250)
    expect(result[2].id).toBe('3')
    expect(result[2].share).toBe(25)
    expect(result[2].sum).toBe(250)
    expect(result[3].id).toBe('4')
    expect(result[3].share).toBe(25)
    expect(result[3].sum).toBe(250)
  })
  it('should work with uneven distribution', () => {
    const result = resetOrgDistribution(organizations, 1000, '2')
    expect(result[0].id).toBe('1')
    expect(result[0].share).toBe(0)
    expect(result[0].sum).toBe(0)
    expect(result[1].id).toBe('2')
    expect(result[1].share).toBe(100)
    expect(result[1].sum).toBe(1000)
    expect(result[2].id).toBe('3')
    expect(result[2].share).toBe(0)
    expect(result[2].sum).toBe(0)
    expect(result[3].id).toBe('4')
    expect(result[3].share).toBe(0)
    expect(result[3].sum).toBe(0)
  })
})

describe('resetDistributionsHelper', () => {
  it('should work without organization override', () => {
    const result = resetDistributionsHelper(causes, 1000)
    expect(result.every((c) => c.shareType === ShareType.Standard))
    expect(result[0].id).toBe('1')
    expect(result[0].share).toBe(0)
    expect(result[0].sum).toBe(0)
    expect(result[1].id).toBe('2')
    expect(result[1].share).toBe(50)
    expect(result[1].sum).toBe(500)
    expect(result[2].id).toBe('3')
    expect(result[2].share).toBe(50)
    expect(result[2].sum).toBe(500)
  })
  it('should work with organization override', () => {
    const result = resetDistributionsHelper(causes, 1000, '3', '32')
    expect(result[0].id).toBe('1')
    expect(result[0].share).toBe(0)
    expect(result[0].sum).toBe(0)
    expect(result[1].id).toBe('2')
    expect(result[1].share).toBe(0)
    expect(result[1].sum).toBe(0)
    expect(result[2].id).toBe('3')
    expect(result[2].share).toBe(100)
    expect(result[2].sum).toBe(1000)
    expect(result[2].shareType).toBe(ShareType.Custom)
    const chosenOrganization = result[2].organizationsDistribution.find(
      (o) => o.id === '32'
    )
    expect(chosenOrganization?.sum).toBe(1000)
    expect(chosenOrganization?.share).toBe(100)
    expect(
      result[2].organizationsDistribution.reduce((sum, o) => sum + o.share, 0)
    ).toBe(100)
    expect(
      result[2].organizationsDistribution.reduce((sum, o) => sum + o.sum, 0)
    ).toBe(1000)
    // Non overridden organizations within a cause should still have even distribution
    expect(
      result[0].organizationsDistribution.every((o) => o.share === 25)
    ).toBeTruthy()
  })
})
