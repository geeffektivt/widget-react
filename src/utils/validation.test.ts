import {
  BankPaymentRequest,
  SwishPaymentRequest,
  UpdatePaymentRequest,
} from '../@types/import/api/payment.types'
import TransferDateOptions from '../constants/TransferDateOptions'
import useAllCauses from '../hooks/content/useAllCauses'
import useAllTexts from '../hooks/content/useAllTexts'

import { validateUpdate, validateSwish, validateBank } from './validation'

describe('Validate', () => {
  describe('BankPaymentRequest', () => {
    it('should allow non anonymous valid input', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: BankPaymentRequest = {
        reoccursMonthly: true,
        isAnonymous: false,
        name: 'namn',
        email: 'fdfa.fdg@sdfd.se',
        doTaxDeduction: false,
        approvesPrivacyPolicy: true,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      const valid = validateBank(args)
      expect(valid).toBeTruthy()
    })
    it('should allow non anonymous valid input with personalNumber', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: BankPaymentRequest = {
        reoccursMonthly: false,
        isAnonymous: false,
        name: 'namn',
        email: 'fdfa.fdg@sdfd.se',
        doTaxDeduction: true,
        personalNumber: '9001011234',
        approvesPrivacyPolicy: true,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      const valid = validateBank(args)
      expect(valid).toBeTruthy()
    })
    it('should have reoccursMonthly', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const args: BankPaymentRequest = {
        isAnonymous: false,
        name: 'namn',
        email: 'fdfa.fdg@sdfd.se',
        doTaxDeduction: true,
        personalNumber: '9001011234',
        approvesPrivacyPolicy: true,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      const valid = validateBank(args)
      expect(valid).toBeFalsy()
    })
  })
  describe('SwishPaymentRequest', () => {
    it('should allow non anonymous valid input', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: SwishPaymentRequest = {
        phone: '46706662345',
        isAnonymous: false,
        name: 'namn',
        email: 'fdfa.fdg@sdfd.se',
        doTaxDeduction: false,
        approvesPrivacyPolicy: true,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      const valid = validateSwish(args)
      expect(valid).toBeTruthy()
    })
    it('should allow non anonymous valid input with personalNumber', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: SwishPaymentRequest = {
        phone: '46706662345',
        isAnonymous: false,
        name: 'namn',
        email: 'fdfa.fdg@sdfd.se',
        doTaxDeduction: true,
        personalNumber: '9001011234',
        approvesPrivacyPolicy: true,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      const valid = validateSwish(args)
      expect(valid).toBeTruthy()
    })
    it('should allow anonymous valid input', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: SwishPaymentRequest = {
        phone: '46706662345',
        isAnonymous: true,
        approvesPrivacyPolicy: true,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      const valid = validateSwish(args)
      expect(valid).toBeTruthy()
    })
    it('should have approvesPrivacyPolicy', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: SwishPaymentRequest = {
        phone: '46706662345',
        isAnonymous: false,
        name: 'namn',
        email: 'fdfa.fdg@sdfd.se',
        doTaxDeduction: true,
        personalNumber: '9001013456',
        approvesPrivacyPolicy: false,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      const valid = validateSwish(args)
      expect(valid).toBeFalsy()
    })
    it('should have name', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: SwishPaymentRequest = {
        phone: '46706662345',
        isAnonymous: false,
        email: 'fdfa.fdg@sdfd.se',
        doTaxDeduction: true,
        personalNumber: '9001013456',
        approvesPrivacyPolicy: false,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      expect(validateSwish(args)).toBeFalsy()
      expect(validateSwish({ ...args, name: '' })).toBeFalsy()
    })
    it('should have email', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: SwishPaymentRequest = {
        phone: '46706662345',
        isAnonymous: false,
        name: 'namn',
        doTaxDeduction: true,
        personalNumber: '9001013456',
        approvesPrivacyPolicy: false,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      expect(validateSwish(args)).toBeFalsy()
      expect(validateSwish({ ...args, email: '' })).toBeFalsy()
    })
    it('should have correct email', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: SwishPaymentRequest = {
        phone: '46706662345',
        isAnonymous: false,
        name: 'namn',
        email: 'not an email',
        doTaxDeduction: true,
        personalNumber: '9001013456',
        approvesPrivacyPolicy: false,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      const valid = validateSwish(args)
      expect(valid).toBeFalsy()
    })
    it('should have phone', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: SwishPaymentRequest = {
        isAnonymous: false,
        name: 'namn',
        doTaxDeduction: true,
        personalNumber: '9001013456',
        approvesPrivacyPolicy: false,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      expect(validateSwish(args)).toBeFalsy()
      expect(validateSwish({ ...args, phone: '' })).toBeFalsy()
    })
    it('should have correct phone', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: SwishPaymentRequest = {
        phone: '47706662345',
        isAnonymous: false,
        name: 'namn',
        email: 'not an email',
        doTaxDeduction: true,
        personalNumber: '9001013456',
        approvesPrivacyPolicy: false,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      const valid = validateSwish(args)
      expect(valid).toBeFalsy()
    })
    it('should have personalNumber if doTaxDeduction', () => {
      const charityNames = useAllCauses().flatMap((c) => {
        return [c.name, ...c.organizations.map((o) => o.name)]
      })
      const args: SwishPaymentRequest = {
        phone: '46706662345',
        isAnonymous: false,
        name: 'namn',
        email: 'not an email',
        doTaxDeduction: true,
        personalNumber: '',
        approvesPrivacyPolicy: false,
        doNewsletter: false,
        charities: [{ name: charityNames[0], sum: 8 }],
        referral: 'Referral',
      }
      const valid = validateSwish(args)
      expect(valid).toBeFalsy()
    })
  })
  describe('UpdatePaymentRequest', () => {
    it('should have id', () => {
      const texts = useAllTexts()
      const { altATitle } = texts.donations.payment
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const args: UpdatePaymentRequest = {
        monthlyPaymentMethod: altATitle,
      }
      const valid = validateUpdate(args)
      expect(valid).toBeFalsy()
    })
    it('should only allow whitelisted methods', () => {
      const args: UpdatePaymentRequest = {
        id: 'ID',
        monthlyPaymentMethod: 'Not a valid method',
      }
      const valid = validateUpdate(args)
      expect(valid).toBeFalsy()
    })
    it('should only allow whitelisted transfer dates', () => {
      const texts = useAllTexts()
      const { altBTitle } = texts.donations.payment
      const args: UpdatePaymentRequest = {
        id: 'ID',
        monthlyPaymentMethod: altBTitle,
        preferredTransferDate: 'Invalid',
      }
      const valid = validateUpdate(args)
      expect(valid).toBeFalsy()
    })
    it('should allow valid input', () => {
      const texts = useAllTexts()
      const { altCTitle } = texts.donations.payment
      const args: UpdatePaymentRequest = {
        id: 'ID',
        monthlyPaymentMethod: altCTitle,
      }
      TransferDateOptions.forEach((t) => {
        const valid = validateUpdate({ ...args, preferredTransferDate: t })
        expect(valid).toBeTruthy()
      })
    })
    it('should allow valid input without preferredTransferDate', () => {
      const texts = useAllTexts()
      const { altCTitle } = texts.donations.payment
      const args: UpdatePaymentRequest = {
        id: 'ID',
        monthlyPaymentMethod: altCTitle,
      }
      const valid = validateUpdate(args)
      expect(valid).toBeTruthy()
    })
  })
})
