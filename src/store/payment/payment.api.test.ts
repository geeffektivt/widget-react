import { ReferralOption } from '../../@types/import/content/referrals.types'
import { ShareType } from '../../constants/enums/ShareType'
import { CauseDistribution } from '../donation/donation.types'

import { getCharitiesWithNames, getReferralName } from './payment.api'

const baseDistribution = {
  shareType: ShareType.Standard,
  id: '0',
  isLocked: false,
  organizationsDistribution: [],
  share: 50,
  lastOrganizationRoundRobinIndex: 0,
}

describe('getCharitiesWithNames', () => {
  it('works with only causes', () => {
    const charities: CauseDistribution[] = [
      {
        ...baseDistribution,
        name: 'Cause 1',
        sum: 100,
        shortDescription: 'Cause 1',
      },
      {
        ...baseDistribution,
        name: 'Cause 2',
        sum: 50,
        shortDescription: 'Cause 2',
      },
      {
        ...baseDistribution,
        name: 'Cause 3',
        sum: 25,
        shortDescription: 'Cause 3',
      },
    ]
    const result = getCharitiesWithNames(charities)
    expect(result).toEqual([
      { name: 'Cause 1', sum: 100, shortDescription: 'Cause 1' },
      { name: 'Cause 2', sum: 50, shortDescription: 'Cause 2' },
      { name: 'Cause 3', sum: 25, shortDescription: 'Cause 3' },
    ])
  })
  it('should ignore organizations for sharetype standard', () => {
    const charities: CauseDistribution[] = [
      {
        ...baseDistribution,
        name: 'Cause 1',
        sum: 100,
        organizationsDistribution: [
          { ...baseDistribution, sum: 45, name: 'Organization 1' },
          { ...baseDistribution, sum: 55, name: 'Organization 2' },
        ],
      },
      {
        ...baseDistribution,
        name: 'Cause 2',
        sum: 50,
        organizationsDistribution: [
          { ...baseDistribution, sum: 48, name: 'Organization 3' },
          { ...baseDistribution, sum: 2, name: 'Organization 4' },
        ],
      },
      {
        ...baseDistribution,
        name: 'Cause 3',
        sum: 25,
      },
    ]
    const result = getCharitiesWithNames(charities)
    expect(result).toEqual([
      { name: 'Cause 1', sum: 100 },
      { name: 'Cause 2', sum: 50 },
      { name: 'Cause 3', sum: 25 },
    ])
  })
  it('should include organizations with sharetype custom', () => {
    const charities: CauseDistribution[] = [
      {
        ...baseDistribution,
        name: 'Cause 1',
        sum: 100,
        shortDescription: 'Cause 1',
        organizationsDistribution: [
          {
            ...baseDistribution,
            sum: 48,
            name: 'Organization 3',
            imgUrl: 'logo',
            shortDescription: 'Organization 3',
            infoUrl: 'url',
          },
          {
            ...baseDistribution,
            sum: 2,
            name: 'Organization 4',
            imgUrl: 'logo',
            shortDescription: 'Organization 4',
            infoUrl: 'url',
          },
        ],
      },
      {
        ...baseDistribution,
        name: 'Cause 2',
        shareType: ShareType.Custom,
        shortDescription: 'Cause 2',
        sum: 50,
        organizationsDistribution: [
          {
            ...baseDistribution,
            sum: 48,
            name: 'Organization 3',
            imgUrl: 'logo',
            shortDescription: 'Organization 3',
            infoUrl: 'url',
          },
          {
            ...baseDistribution,
            sum: 2,
            name: 'Organization 4',
            imgUrl: 'logo',
            shortDescription: 'Organization 4',
            infoUrl: 'url',
          },
        ],
      },
      {
        ...baseDistribution,
        name: 'Cause 3',
        sum: 25,
        shortDescription: 'Cause 3',
      },
    ]
    const result = getCharitiesWithNames(charities)
    expect(result).toEqual([
      { name: 'Cause 1', sum: 100, shortDescription: 'Cause 1' },
      {
        cause: 'Cause 2',
        name: 'Organization 3',
        sum: 48,
        logo: 'logo',
        shortDescription: 'Organization 3',
        url: 'url',
      },
      {
        cause: 'Cause 2',
        name: 'Organization 4',
        sum: 2,
        logo: 'logo',
        shortDescription: 'Organization 4',
        url: 'url',
      },
      { name: 'Cause 3', sum: 25, shortDescription: 'Cause 3' },
    ])
  })
  it('should filter out those with sum 0', () => {
    const charities: CauseDistribution[] = [
      {
        ...baseDistribution,
        name: 'Cause 1',
        sum: 0,
        organizationsDistribution: [
          {
            ...baseDistribution,
            sum: 0,
            name: 'Organization 3',
            imgUrl: 'logo',
            shortDescription: 'Organization 3',
            infoUrl: 'url',
          },
          {
            ...baseDistribution,
            sum: 0,
            name: 'Organization 4',
            imgUrl: 'logo',
            shortDescription: 'Organization 4',
            infoUrl: 'url',
          },
        ],
      },
      {
        ...baseDistribution,
        name: 'Cause 2',
        shareType: ShareType.Custom,
        sum: 2,
        organizationsDistribution: [
          {
            ...baseDistribution,
            sum: 0,
            name: 'Organization 3',
            imgUrl: 'logo',
            shortDescription: 'Organization 3',
            infoUrl: 'url',
          },
          {
            ...baseDistribution,
            sum: 2,
            name: 'Organization 4',
            imgUrl: 'logo',
            shortDescription: 'Organization 4',
            infoUrl: 'url',
          },
        ],
      },
      {
        ...baseDistribution,
        name: 'Cause 3',
        sum: 25,
      },
    ]
    const result = getCharitiesWithNames(charities)
    expect(result).toEqual([
      {
        name: 'Organization 4',
        cause: 'Cause 2',
        sum: 2,
        logo: 'logo',
        shortDescription: 'Organization 4',
        url: 'url',
      },
      { name: 'Cause 3', sum: 25 },
    ])
  })
  it('should filter out provided excludeId', () => {
    const charities: CauseDistribution[] = [
      {
        ...baseDistribution,
        id: 'Id1',
        name: 'Cause 1',
        sum: 100,
      },
      {
        ...baseDistribution,
        id: 'Id2',
        name: 'Cause 2',
        sum: 50,
      },
      {
        ...baseDistribution,
        id: 'Id3',
        name: 'Cause 3',
        sum: 25,
      },
      {
        ...baseDistribution,
        id: 'tipId',
        name: 'Tip',
        sum: 400,
      },
    ]
    const result = getCharitiesWithNames(charities, 'tipId')
    expect(result).toEqual([
      { name: 'Cause 1', sum: 100 },
      { name: 'Cause 2', sum: 50 },
      { name: 'Cause 3', sum: 25 },
    ])
  })
})

describe('getReferralName', () => {
  it('should handle without referral', () => {
    expect(getReferralName(undefined, undefined)).toBe(undefined)
  })

  it('should handle without input', () => {
    const referral: ReferralOption = { id: '1', name: 'Google' }
    expect(getReferralName(referral, undefined)).toBe('Google')
    expect(getReferralName(referral, '')).toBe('Google')
    expect(getReferralName(referral, '   ')).toBe('Google')
  })

  it('should handle with input', () => {
    const referral: ReferralOption = { id: '1', name: 'Podcast' }
    const result = getReferralName(referral, 'Great podcast')
    expect(result).toBe('Podcast: Great podcast')
  })
})
