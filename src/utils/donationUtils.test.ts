import { updateAllSums } from '../store/donation/donation.reducerHelpers'
import { BaseDistribution } from '../store/donation/donation.types'

import { mutableRoundRobinUpdateShareAtIndex } from './donationUtils'

const e1 = { id: 'climate', name: 'climate' }
const e2 = { id: 'health', name: 'health' }
const e3 = { id: 'animal', name: 'animal' }

describe('mutableRoundRobinUpdateShareAtIndex', () => {
  describe('when all unlocked', () => {
    describe('decreasing', () => {
      it('should update all 3', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 100, isLocked: false },
          { ...e2, share: 30, sum: 60, isLocked: false },
          { ...e3, share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 20, 0)
        expect(entries[0].share).toBe(20)
        expect(entries[1].share).toBe(45)
        expect(entries[2].share).toBe(35)
        entries = updateAllSums(entries, 200)
        expect(entries[0].sum).toBe(40)
        expect(entries[1].sum).toBe(90)
        expect(entries[2].sum).toBe(70)
      })
      it('should round to 5 for decrease', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 100, isLocked: false },
          { ...e2, share: 30, sum: 60, isLocked: false },
          { ...e3, share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 25, 0)
        expect(entries[0].share).toBe(25)
        expect(entries[1].share).toBe(43)
        expect(entries[2].share).toBe(32)
        entries = updateAllSums(entries, 200)
        expect(entries[0].sum).toBe(50)
        expect(entries[1].sum).toBe(90)
        expect(entries[2].sum).toBe(60)
      })
      it('should set correct sum', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 100, isLocked: false },
          { ...e2, share: 30, sum: 60, isLocked: false },
          { ...e3, share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 2, 0)
        expect(entries[0].share).toBe(2)
        expect(entries[1].share).toBe(54)
        expect(entries[2].share).toBe(44)
        entries = updateAllSums(entries, 200)
        expect(entries[0].sum).toBe(5)
        expect(entries[1].sum).toBe(110)
        expect(entries[2].sum).toBe(85)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(200)
      })
      it('should set correct sum for uneven total', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 7, isLocked: false },
          { ...e2, share: 30, sum: 60, isLocked: false },
          { ...e3, share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 2, 0)
        expect(entries[0].share).toBe(2)
        expect(entries[1].share).toBe(54)
        expect(entries[2].share).toBe(44)
        entries = updateAllSums(entries, 107)
        expect(entries[0].sum).toBe(5)
        expect(entries[1].sum).toBe(60)
        expect(entries[2].sum).toBe(42)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(107)
      })
      // it('should update cause set to 0', () => {
      //   let entries: BaseDistribution[] = [
      //     { ...e1, share: 0, sum: 0, isLocked: false },
      //     { ...e2, share: 60, sum: 30, isLocked: false },
      //     { ...e3, share: 40, sum: 20, isLocked: false },
      //   ]
      //   mutableRoundRobinUpdateShareAtIndex(entries, 1, 20, 0)
      //   expect(entries[0].share).toBe(20)
      //   expect(entries[1].share).toBe(20)
      //   expect(entries[2].share).toBe(60)
      //   entries = updateAllSums(entries, 200)
      //   expect(entries[0].sum).toBe(40)
      //   expect(entries[1].sum).toBe(40)
      //   expect(entries[2].sum).toBe(120)
      // })
    })
    describe('increasing', () => {
      it('should update all 3', () => {
        const entries: BaseDistribution[] = [
          { ...e1, share: 52, sum: 100, isLocked: false },
          { ...e2, share: 29, sum: 60, isLocked: false },
          { ...e3, share: 19, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 70, 0)
        expect(entries[0].share).toBe(70)
        expect(entries[1].share).toBe(20)
        expect(entries[2].share).toBe(10)
      })
      it('should update all 3 when two reach 0', () => {
        const entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 100, isLocked: false },
          { ...e2, share: 30, sum: 60, isLocked: false },
          { ...e3, share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 100, 0)
        expect(entries[0].share).toBe(100)
        expect(entries[1].share).toBe(0)
        expect(entries[2].share).toBe(0)
      })
      it('should round to 5', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 100, isLocked: false },
          { ...e2, share: 30, sum: 60, isLocked: false },
          { ...e3, share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 55, 0)
        expect(entries[0].share).toBe(55)
        expect(entries[1].share).toBe(27)
        expect(entries[2].share).toBe(18)
        entries = updateAllSums(entries, 200)
        expect(entries[0].sum).toBe(110)
        expect(entries[1].sum).toBe(55)
        expect(entries[2].sum).toBe(35)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(200)
      })
      it('should not decrease a cause that is already 0', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 0, sum: 0, isLocked: false },
          { ...e2, share: 30, sum: 60, isLocked: false },
          { ...e3, share: 70, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 1, 40, 0)
        expect(entries[0].share).toBe(0)
        expect(entries[1].share).toBe(40)
        expect(entries[2].share).toBe(60)
        entries = updateAllSums(entries, 100)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(100)
      })
    })
  })
  describe('when some locked', () => {
    describe('increasing', () => {
      it('should update index 2 when index 1 is locked', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 100, isLocked: false },
          { ...e2, share: 30, sum: 60, isLocked: true },
          { ...e3, share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 30, 0)
        expect(entries[0].share).toBe(40)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(30)
        entries = updateAllSums(entries, 200)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(200)
      })
      it('should not update anything when all causes are locked', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 100, isLocked: true },
          { ...e2, share: 30, sum: 60, isLocked: true },
          { ...e3, share: 20, sum: 40, isLocked: true },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 1, 70, 0)
        expect(entries[0].share).toBe(50)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(20)
        entries = updateAllSums(entries, 200)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(200)
      })

      it('should not update unlocked index 0 when the other 2 are locked', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 100, isLocked: false },
          { ...e2, share: 30, sum: 60, isLocked: true },
          { ...e3, share: 20, sum: 40, isLocked: true },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 80, 0)
        expect(entries[0].share).toBe(50)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(20)
        entries = updateAllSums(entries, 200)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(200)
      })
      it('should round sum up to 5', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 100, isLocked: false },
          { ...e2, share: 30, sum: 60, isLocked: false },
          { ...e3, share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 65, 0)
        expect(entries[0].share).toBe(65)
        expect(entries[1].share).toBe(22)
        expect(entries[2].share).toBe(13)
        entries = updateAllSums(entries, 200)
        expect(entries[0].sum).toBe(130)
        expect(entries[1].sum).toBe(45)
        expect(entries[2].sum).toBe(25)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(200)
      })
      it('should not update when one other value is 0 and the other is locked', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 0, sum: 0, isLocked: false },
          { ...e2, share: 60, sum: 60, isLocked: true },
          { ...e3, share: 40, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 50, 0)
        expect(entries[0].share).toBe(0)
        expect(entries[1].share).toBe(60)
        expect(entries[2].share).toBe(40)
        entries = updateAllSums(entries, 100)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(100)
      })
    })
    describe('decreasing', () => {
      it('should update correctly when just one other value is locked', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 100, isLocked: false },
          { ...e2, share: 30, sum: 60, isLocked: true },
          { ...e3, share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 10, 0)
        expect(entries[0].share).toBe(60)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(10)
        entries = updateAllSums(entries, 200)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(200)
      })
      it('should update when one value from 0 when the third one is locked', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 0, sum: 0, isLocked: false },
          { ...e2, share: 60, sum: 60, isLocked: true },
          { ...e3, share: 40, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 30, 0)
        expect(entries[0].share).toBe(10)
        expect(entries[1].share).toBe(60)
        expect(entries[2].share).toBe(30)
        entries = updateAllSums(entries, 100)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(100)
      })
      it('should round sum to 5', () => {
        let entries: BaseDistribution[] = [
          { ...e1, share: 50, sum: 50, isLocked: false },
          { ...e2, share: 30, sum: 30, isLocked: false },
          { ...e3, share: 20, sum: 20, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 43, 0)
        expect(entries[0].share).toBe(43)
        expect(entries[1].share).toBe(34)
        expect(entries[2].share).toBe(23)
        entries = updateAllSums(entries, 100)
        expect(entries[0].sum).toBe(45)
        expect(entries[1].sum).toBe(35)
        expect(entries[2].sum).toBe(20)
        expect(entries.reduce((acc, entry) => (acc += entry.sum), 0)).toBe(100)
      })
    })
  })
})
