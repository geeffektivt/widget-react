import { ShareType } from '../../constants/enums/ShareType'
import { CauseDistribution } from '../donation/donation.types'

import { getCharitiesWithNames } from './payment.api'

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
      },
      {
        ...baseDistribution,
        name: 'Cause 2',
        sum: 50,
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
        organizationsDistribution: [
          { ...baseDistribution, sum: 48, name: 'Organization 3' },
          { ...baseDistribution, sum: 2, name: 'Organization 4' },
        ],
      },
      {
        ...baseDistribution,
        name: 'Cause 2',
        shareType: ShareType.Custom,
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
      { name: 'Organization 3', sum: 48 },
      { name: 'Organization 4', sum: 2 },
      { name: 'Cause 3', sum: 25 },
    ])
  })
  it('should filter out those with sum 0', () => {
    const charities: CauseDistribution[] = [
      {
        ...baseDistribution,
        name: 'Cause 1',
        sum: 0,
        organizationsDistribution: [
          { ...baseDistribution, sum: 0, name: 'Organization 3' },
          { ...baseDistribution, sum: 0, name: 'Organization 4' },
        ],
      },
      {
        ...baseDistribution,
        name: 'Cause 2',
        shareType: ShareType.Custom,
        sum: 2,
        organizationsDistribution: [
          { ...baseDistribution, sum: 0, name: 'Organization 3' },
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
      { name: 'Organization 4', sum: 2 },
      { name: 'Cause 3', sum: 25 },
    ])
  })
})
